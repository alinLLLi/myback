import { Schema, type HydratedDocument } from 'mongoose';
export interface IKnowledge {
    title: string;
    description: string;
    image: string;
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
}, IKnowledge>, IKnowledge>;
export default _default;
//# sourceMappingURL=knowledge.d.ts.map