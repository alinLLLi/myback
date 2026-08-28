import { Schema, model, type HydratedDocument } from 'mongoose'
import cloudinary from '../configs/cloudinary'

export interface IKnowledge {
  title: string
  description: string
  image: string
}

export type KnowledgeDocument = HydratedDocument<IKnowledge>

const schema = new Schema<IKnowledge>(
  {
    title: {
      type: String,
      required: [true, '標題必填'],
      trim: true,
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
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    id: false,
  },
)

schema.virtual('imageUrl').get(function () {
  return cloudinary.url(this.image)
})

export default model('knowledges', schema)
