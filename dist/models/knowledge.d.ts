import { Schema, type HydratedDocument } from 'mongoose';
export declare const categoryOptions: readonly ["地震防護", "颱風防汛", "火災避難", "國家警報", "核災救護", "社區聯防"];
export type TCategoryOptions = (typeof categoryOptions)[number];
export interface IKnowledge {
    title: string;
    category: TCategoryOptions;
    description: string;
    image: string;
    published: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
export type KnowledgeDocument = HydratedDocument<IKnowledge>;
declare const _default: import("mongoose").Model<IKnowledge, {}, {}, {
    id: string;
}, import("mongoose").Document<unknown, {}, IKnowledge, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<IKnowledge & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, Schema<IKnowledge, import("mongoose").Model<IKnowledge, any, any, any, any, any, IKnowledge>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, IKnowledge, import("mongoose").Document<unknown, {}, IKnowledge, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<IKnowledge & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, {
    title?: import("mongoose").SchemaDefinitionProperty<string, IKnowledge, import("mongoose").Document<unknown, {}, IKnowledge, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<IKnowledge & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>>;
    category?: import("mongoose").SchemaDefinitionProperty<"地震防護" | "颱風防汛" | "火災避難" | "國家警報" | "核災救護" | "社區聯防", IKnowledge, import("mongoose").Document<unknown, {}, IKnowledge, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<IKnowledge & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>>;
    description?: import("mongoose").SchemaDefinitionProperty<string, IKnowledge, import("mongoose").Document<unknown, {}, IKnowledge, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<IKnowledge & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>>;
    image?: import("mongoose").SchemaDefinitionProperty<string, IKnowledge, import("mongoose").Document<unknown, {}, IKnowledge, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<IKnowledge & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>>;
    published?: import("mongoose").SchemaDefinitionProperty<boolean, IKnowledge, import("mongoose").Document<unknown, {}, IKnowledge, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<IKnowledge & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>>;
    createdAt?: import("mongoose").SchemaDefinitionProperty<Date | undefined, IKnowledge, import("mongoose").Document<unknown, {}, IKnowledge, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<IKnowledge & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>>;
    updatedAt?: import("mongoose").SchemaDefinitionProperty<Date | undefined, IKnowledge, import("mongoose").Document<unknown, {}, IKnowledge, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<IKnowledge & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>>;
}, IKnowledge>, IKnowledge>;
export default _default;
//# sourceMappingURL=knowledge.d.ts.map