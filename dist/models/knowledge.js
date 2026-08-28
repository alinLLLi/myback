"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const cloudinary_1 = __importDefault(require("../configs/cloudinary"));
const schema = new mongoose_1.Schema({
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
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    id: false,
});
schema.virtual('imageUrl').get(function () {
    return cloudinary_1.default.url(this.image);
});
exports.default = (0, mongoose_1.model)('knowledges', schema);
//# sourceMappingURL=knowledge.js.map