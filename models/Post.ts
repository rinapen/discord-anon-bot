import { getDB } from "../lib/MongoDB";

export interface IPost {
    postCount: number;
    uniqueID: string;
    author: string;
    authorName?: string;
    content?: string;
    url?: Map<string, string> | Record<string, string>;
    imageURL?: string;
    timestamp?: Date;
    isQuoted?: boolean;
}

export const Post = {
    collection: () => getDB().collection<IPost>("discord-anon-posts"),
    findByPostCount: (postCount: number) => Post.collection().findOne({ postCount }),
    create: (data: IPost) => Post.collection().insertOne({ ...data, timestamp: new Date() }),
    update: (filter: Partial<IPost>, update: Partial<IPost>) => Post.collection().updateOne(filter, { $set: update }),
    upsert: async (filter: Partial<IPost>, data: IPost) => {
        const existing = await Post.collection().findOne(filter);
        if (existing) {
            await Post.collection().updateOne(filter, { $set: data });
            return existing;
        } else {
            await Post.collection().insertOne({ ...data, timestamp: new Date() });
            return data;
        }
    }
}