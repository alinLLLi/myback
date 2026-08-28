import type { Request, Response } from 'express'
import Knowledge, { IKnowledge } from '../models/knowledge'
import * as yup from 'yup'
import validator from 'validator'
import { StatusCodes } from 'http-status-codes'
import cloudinary from '../configs/cloudinary'

export const create = async (req: Request, res: Response) => {
  const schema = yup.object<IKnowledge>({
    title: yup.string().typeError('資料格式錯誤').required('標題必填'),
    description: yup.string().typeError('資料格式錯誤').required('說明必填'),
    image: yup.string().typeError('資料格式錯誤').required('圖片必填'),
  })

  const parsedBody = await schema.validate(
    { ...req.body, image: req.file?.filename },
    { stripUnknown: true },
  )

  const result = await Knowledge.create(parsedBody)

  res.status(StatusCodes.CREATED).json({
    success: true,
    message: '',
    result,
  })
}

export const update = async (req: Request, res: Response) => {
  const paramsSchema = yup.object({
    id: yup
      .string()
      .typeError('資料格式錯誤')
      .required('ID 必填')
      .trim()
      .test('isMongoId', '資料格式錯誤', (value) => validator.isMongoId(value)),
  })
  const parsedParams = await paramsSchema.validate(req.params, { stripUnknown: true })

  const bodySchema = yup.object<IKnowledge>({
    title: yup.string().typeError('資料格式錯誤').required('標題必填'),
    description: yup.string().typeError('資料格式錯誤').required('說明必填'),
  })
  const parsedBody = await bodySchema.validate(req.body, { stripUnknown: true })

  const result = await Knowledge.findByIdAndUpdate(parsedParams.id, parsedBody, {
    returnDocument: 'after',
    runValidators: true,
  }).orFail(new Error('KNOWLEDGE NOT FOUND'))

  if (req.file) {
    await cloudinary.uploader.destroy(result.image)
    result.image = req.file.filename
    await result.save()
  }

  res.status(StatusCodes.OK).json({
    success: true,
    message: '',
    result,
  })
}

export const remove = async (req: Request, res: Response) => {
  const paramsSchema = yup.object({
    id: yup
      .string()
      .typeError('資料格式錯誤')
      .required('ID 必填')
      .trim()
      .test('isMongoId', '資料格式錯誤', (value) => validator.isMongoId(value)),
  })
  const parsedParams = await paramsSchema.validate(req.params, { stripUnknown: true })

  const result = await Knowledge.findByIdAndDelete(parsedParams.id).orFail(
    new Error('KNOWLEDGE NOT FOUND'),
  )

  if (result.image) {
    await cloudinary.uploader.destroy(result.image)
  }

  res.status(StatusCodes.OK).json({
    success: true,
    message: '',
    result: {},
  })
}

export const getAll = async (req: Request, res: Response) => {
  const result = await Knowledge.find()
  res.status(StatusCodes.OK).json({
    success: true,
    message: '',
    result,
  })
}

export const get = async (req: Request, res: Response) => {
  const result = await Knowledge.find()
  res.status(StatusCodes.OK).json({
    success: true,
    message: '',
    result,
  })
}

export const getId = async (req: Request, res: Response) => {
  const paramsSchema = yup.object({
    id: yup
      .string()
      .typeError('資料格式錯誤')
      .required('ID 必填')
      .trim()
      .test('isMongoId', '資料格式錯誤', (value) => validator.isMongoId(value)),
  })
  const parsedParams = await paramsSchema.validate(req.params, { stripUnknown: true })

  const result = await Knowledge.findById(parsedParams.id).orFail(new Error('KNOWLEDGE NOT FOUND'))

  res.status(StatusCodes.OK).json({
    success: true,
    message: '',
    result,
  })
}
