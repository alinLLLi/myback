"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getId = exports.get = exports.getAll = exports.remove = exports.update = exports.create = void 0;
const knowledge_1 = __importStar(require("../models/knowledge"));
const yup = __importStar(require("yup"));
const validator_1 = __importDefault(require("validator"));
const http_status_codes_1 = require("http-status-codes");
const cloudinary_1 = __importDefault(require("../configs/cloudinary"));
const create = async (req, res) => {
    const schema = yup.object({
        title: yup.string().typeError('資料格式錯誤').required('標題必填'),
        category: yup
            .string()
            .typeError('資料格式錯誤')
            .required('分類必填')
            .oneOf([...knowledge_1.categoryOptions], '分類錯誤'),
        description: yup.string().typeError('資料格式錯誤').required('說明必填'),
        published: yup.boolean().typeError('資料格式錯誤').required('發布狀態必填'),
        image: yup.string().typeError('資料格式錯誤').required('圖片必填'),
    });
    const bodyData = {
        ...req.body,
        category: req.body.category || '地震防護',
        description: req.body.description || req.body.summary,
        published: req.body.published !== undefined ? req.body.published : true,
        image: req.file?.filename,
    };
    const parsedBody = await schema.validate(bodyData, { stripUnknown: true });
    const result = await knowledge_1.default.create(parsedBody);
    res.status(http_status_codes_1.StatusCodes.CREATED).json({
        success: true,
        message: '',
        result,
    });
};
exports.create = create;
const update = async (req, res) => {
    const paramsSchema = yup.object({
        id: yup
            .string()
            .typeError('資料格式錯誤')
            .required('ID 必填')
            .trim()
            .test('isMongoId', '資料格式錯誤', (value) => validator_1.default.isMongoId(value)),
    });
    const parsedParams = await paramsSchema.validate(req.params, { stripUnknown: true });
    const bodySchema = yup.object({
        title: yup.string().typeError('資料格式錯誤').required('標題必填'),
        category: yup
            .string()
            .typeError('資料格式錯誤')
            .required('分類必填')
            .oneOf([...knowledge_1.categoryOptions], '分類錯誤'),
        description: yup.string().typeError('資料格式錯誤').required('說明必填'),
        published: yup.boolean().typeError('資料格式錯誤').required('發布狀態必填'),
    });
    const bodyData = {
        ...req.body,
        category: req.body.category || '地震防護',
        description: req.body.description || req.body.summary,
        published: req.body.published !== undefined ? req.body.published : true,
    };
    const parsedBody = await bodySchema.validate(bodyData, { stripUnknown: true });
    const result = await knowledge_1.default.findByIdAndUpdate(parsedParams.id, parsedBody, {
        returnDocument: 'after',
        runValidators: true,
    }).orFail(new Error('KNOWLEDGE NOT FOUND'));
    if (req.file) {
        if (result.image && !result.image.startsWith('http')) {
            await cloudinary_1.default.uploader.destroy(result.image);
        }
        result.image = req.file.filename;
        await result.save();
    }
    res.status(http_status_codes_1.StatusCodes.OK).json({
        success: true,
        message: '',
        result,
    });
};
exports.update = update;
const remove = async (req, res) => {
    const paramsSchema = yup.object({
        id: yup
            .string()
            .typeError('資料格式錯誤')
            .required('ID 必填')
            .trim()
            .test('isMongoId', '資料格式錯誤', (value) => validator_1.default.isMongoId(value)),
    });
    const parsedParams = await paramsSchema.validate(req.params, { stripUnknown: true });
    const result = await knowledge_1.default.findByIdAndDelete(parsedParams.id).orFail(new Error('KNOWLEDGE NOT FOUND'));
    if (result.image && !result.image.startsWith('http')) {
        await cloudinary_1.default.uploader.destroy(result.image);
    }
    res.status(http_status_codes_1.StatusCodes.OK).json({
        success: true,
        message: '',
        result: {},
    });
};
exports.remove = remove;
const getAll = async (req, res) => {
    const result = await knowledge_1.default.find().sort({ createdAt: -1 });
    res.status(http_status_codes_1.StatusCodes.OK).json({
        success: true,
        message: '',
        result,
    });
};
exports.getAll = getAll;
// 改為以 updatedAt 或 createdAt 排序
const get = async (req, res) => {
    const result = await knowledge_1.default.find({ published: true }).sort({ updatedAt: -1 });
    res.status(http_status_codes_1.StatusCodes.OK).json({
        success: true,
        message: '',
        result,
    });
};
exports.get = get;
const getId = async (req, res) => {
    const paramsSchema = yup.object({
        id: yup
            .string()
            .typeError('資料格式錯誤')
            .required('ID 必填')
            .trim()
            .test('isMongoId', '資料格式錯誤', (value) => validator_1.default.isMongoId(value)),
    });
    const parsedParams = await paramsSchema.validate(req.params, { stripUnknown: true });
    const result = await knowledge_1.default.findById(parsedParams.id).orFail(new Error('KNOWLEDGE NOT FOUND'));
    res.status(http_status_codes_1.StatusCodes.OK).json({
        success: true,
        message: '',
        result,
    });
};
exports.getId = getId;
//# sourceMappingURL=knowledge.js.map