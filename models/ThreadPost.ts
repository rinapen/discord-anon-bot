import { getDB } from "../lib/MongoDB";

export interface IThreadPost {
    channelId: string;
    postCount: number;
    uniqueID: string;
    author: string;
    authorName?: string;
    content?: string;
    url?: Map<string, string> | Record<string, string>;
    imageURL?: string;
    timestamp?: Date;
}

export const ThreadPost = {
    collection: () => getDB().collection<IThreadPost>("discord-anon-threadposts"),
    findByPostCount: (postCount: number) => ThreadPost.collection().findOne({ postCount }),
    create: (data: IThreadPost) => ThreadPost.collection().insertOne({ ...data, timestamp: new Date() }),
    update: (filter: Partial<IThreadPost>, update: Partial<IThreadPost>) => ThreadPost.collection().updateOne(filter, { $set: update }),
    upsert: async (filter: Partial<IThreadPost>, data: IThreadPost) => {
        const existing = await ThreadPost.collection().findOne(filter);
        if (existing) {
            await ThreadPost.collection().updateOne(filter, { $set: data });
            return existing;
        } else {
            await ThreadPost.collection().insertOne({ ...data, timestamp: new Date() });
            return data;
        }
    }
}

