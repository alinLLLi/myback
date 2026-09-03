import type { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
import * as yup from 'yup'
import { Error as MongooseError } from 'mongoose'
import { MongoServerError } from 'mongodb'
import cloudinary from '../configs/cloudinary'

export default async (error: unknown, req: Request, res: Response, _next: NextFunction) => {
  // 僅對非預期的系統錯誤印出完整 log（過濾 yup 驗證錯誤與預期的 LOGIN, TOKEN, RT 驗證錯誤）
  const isExpectedError =
    error instanceof yup.ValidationError ||
    (error instanceof Error && ['RT', 'LOGIN', 'TOKEN'].includes(error.message))

  if (!isExpectedError) {
    console.error(error)
  }

  // 如果有錯誤，刪除已上傳的圖片
  if (req.file) {
    await cloudinary.uploader.destroy(req.file.filename)
  }

  // express.json() 格式錯誤
  if (error instanceof SyntaxError && error.message.includes('JSON')) {
    res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: '格式錯誤',
    })
  }
  // yup 驗證錯誤
  else if (error instanceof yup.ValidationError) {
    console.error(`\n❌ [Yup 驗證失敗]`)
    console.error(`  - 請求路徑: ${req.method} ${req.originalUrl}`)
    console.error(`  - 失敗欄位: ${error.path || '(未指定欄位)'}`)
    console.error(`  - 錯誤訊息: ${error.message}`)
    console.error(`  - 傳入 Params:`, req.params)
    console.error(`  - 傳入 Body:`, req.body)
    console.error(`  - 傳入 Query:`, req.query)
    console.error('')

    res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: error.message,
    })
  }
  // mongoose 驗證錯誤
  else if (error instanceof MongooseError.ValidationError) {
    res.status(StatusCodes.BAD_REQUEST).json({
      message: Object.values(error.errors)[0]!.message,
    })
  }
  // 重複錯誤
  else if (error instanceof MongoServerError && error.code === 11000) {
    res.status(StatusCodes.CONFLICT).json({
      message: '帳號重複',
    })
  }
  // 自訂錯誤
  else if (error instanceof Error) {
    switch (error.message) {
      case 'LOGIN':
        res.status(StatusCodes.UNAUTHORIZED).json({
          success: false,
          message: '帳號或密碼錯誤',
        })
        break
      case 'TOKEN':
      case 'RT':
        res.status(StatusCodes.UNAUTHORIZED).json({
          success: false,
          message: '認證錯誤',
        })
        break
      case 'ADMIN':
        res.status(StatusCodes.FORBIDDEN).json({
          success: false,
          message: '權限不足',
        })
        break
      case 'CORS':
        res.status(StatusCodes.BAD_REQUEST).json({
          success: false,
          message: 'CORS',
        })
        break
      case 'UPLOAD_FAILED':
        res.status(StatusCodes.BAD_REQUEST).json({
          success: false,
          message: '上傳錯誤',
        })
        break
      case 'PRODUCT NOT FOUND':
        res.status(StatusCodes.NOT_FOUND).json({
          success: false,
          message: '找不到商品',
        })
        break
      case 'KNOWLEDGE NOT FOUND':
        res.status(StatusCodes.NOT_FOUND).json({
          success: false,
          message: '找不到災防知識',
        })
        break
      case 'CART EMPTY':
        res.status(StatusCodes.NOT_FOUND).json({
          success: false,
          message: '購物車是空的',
        })
        break
      case 'CART SELL':
        res.status(StatusCodes.NOT_FOUND).json({
          success: false,
          message: '購物車包含下架商品',
        })
        break
      default:
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          message: '伺服器錯誤',
        })
        break
    }
  }
  // 其他錯誤
  else {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: '伺服器錯誤',
    })
  }
}
