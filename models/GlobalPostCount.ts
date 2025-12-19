import { getDB } from "../lib/MongoDB";

export interface IGlobalPostCount {
    postCount: number;
    _id?: string;
}

export const GlobalPostCount = {
    collection: () => getDB().collection<IGlobalPostCount>("discord-anon-globalpostcount"),
    findOne: async () => {
        const result = await GlobalPostCount.collection().findOne({});
        if (!result) {
            await GlobalPostCount.collection().insertOne({ postCount: 0 });
            return { postCount: 0 };
        }
        return result;
    },
    increment: async () => {
        const result = await GlobalPostCount.collection().findOneAndUpdate(
            {},
            { $inc: { postCount: 1 } },
            { returnDocument: "after", upsert: true }
        );
        return result?.postCount || 0;
    }
}

