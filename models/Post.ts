import { getDB } from "../lib/MongoDB";

export interface IPost {
    count: number;
    uniqueId: string;
    author: string;
    authorName?: string;
    content?: string;
    url?: string;
    imageUrl?: string;
    timestamp?: Date;
    isQuoted?: boolean;
}

export const Post = {
    collection: () => getDB().collection<IPost>("posts"),
    findByUniqueId: (uid: string) => Post.collection().findOne({ uniqueId: uid }),
    create: (data: IPost) => Post.collection().insertOne({ ...data, timestamp: new Date() }),
}