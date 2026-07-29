import { Schema, model, type HydratedDocument } from 'mongoose'
import cloudinary from '../configs/cloudinary'

export const categoryOptions = ['3C', '食品', '衣服']

export type TCategoryOptions = '3C' | '食品' | '衣服'

export interface IProduct {
  name: string
  price: number
  description: string
  category: TCategoryOptions
  sell: boolean
  image: string
}

export type ProuctDocument = HydratedDocument<IProduct>

const schema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: [true, '名稱必填'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, '價格必填'],
      min: [0, '價格錯誤'],
    },
    description: {
      type: String,
      required: [true, '說明必填'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, '分類必填'],
      enum: {
        values: categoryOptions,
        message: '分類錯誤',
      },
    },
    sell: {
      type: Boolean,
      required: [true, '上下架必填'],
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

// 虛擬動態欄位
// schema.virtual(欄位名稱).get(資料產生方式)
// 不能用箭頭函式，因為 this 代表目前的資料
schema.virtual('imageUrl').get(function () {
  return cloudinary.url(this.image)
})

export default model('products', schema)
