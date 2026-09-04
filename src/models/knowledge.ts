import { Schema, model, type HydratedDocument } from 'mongoose'
import cloudinary from '../configs/cloudinary'

export const categoryOptions = [
  '地震防護',
  '颱風防汛',
  '火災避難',
  '國家警報',
  '核災救護',
  '社區聯防',
] as const

export type TCategoryOptions = (typeof categoryOptions)[number]

export interface IKnowledge {
  title: string
  category: TCategoryOptions
  description: string
  image: string
  published: boolean
  createdAt?: Date
  updatedAt?: Date
}

export type KnowledgeDocument = HydratedDocument<IKnowledge>

const schema = new Schema<IKnowledge>(
  {
    title: {
      type: String,
      required: [true, '標題必填'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, '分類必填'],
      enum: {
        values: categoryOptions,
        message: '分類錯誤',
      },
      default: '地震防護',
    },
    description: {
      type: String,
      required: [true, '說明必填'],
      trim: true,
    },
    image: {
      type: String,
      required: [true, '圖片必填'],
    },
    published: {
      type: Boolean,
      required: [true, '發布狀態必填'],
      default: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
)

schema.virtual('imageUrl').get(function () {
  if (!this.image) return ''
  if (this.image.startsWith('http://') || this.image.startsWith('https://')) {
    return this.image
  }
  return cloudinary.url(this.image)
})

schema.virtual('summary').get(function () {
  return this.description
})

schema.virtual('date').get(function () {
  if (this.createdAt) {
    return new Date(this.createdAt).toISOString().split('T')[0]
  }
  return ''
})

export default model('knowledges', schema)
