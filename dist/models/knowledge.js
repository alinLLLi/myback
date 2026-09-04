"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryOptions = void 0;
const mongoose_1 = require("mongoose");
const cloudinary_1 = __importDefault(require("../configs/cloudinary"));
exports.categoryOptions = [
    '地震防護',
    '颱風防汛',
    '火災避難',
    '國家警報',
    '核災救護',
    '社區聯防',
];
const schema = new mongoose_1.Schema({
    title: {
        type: String,
        required: [true, '標題必填'],
        trim: true,
    },
    category: {
        type: String,
        required: [true, '分類必填'],
        enum: {
            values: exports.categoryOptions,
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
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});
schema.virtual('imageUrl').get(function () {
    if (!this.image)
        return '';
    if (this.image.startsWith('http://') || this.image.startsWith('https://')) {
        return this.image;
    }
    return cloudinary_1.default.url(this.image);
});
schema.virtual('summary').get(function () {
    return this.description;
});
schema.virtual('date').get(function () {
    if (this.createdAt) {
        return new Date(this.createdAt).toISOString().split('T')[0];
    }
    return '';
});
exports.default = (0, mongoose_1.model)('knowledges', schema);
//# sourceMappingURL=knowledge.js.map