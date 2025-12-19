import { getDB } from "../lib/MongoDB";

export interface IThread {
    userId: string;
    channelIds: {
        main: string;
        sub?: string;
    };
    threadName: string;
    postCounter: number;
    timestamp?: Date;
}

export const Thread = {
    collection: () => getDB().collection<IThread>("discord-anon-threads"),
    findByUserId: (userId: string) => Thread.collection().findOne({ userId }),
    findByChannelId: (channelId: string) => Thread.collection().findOne({ "channelIds.main": channelId }),
    create: (data: IThread) => Thread.collection().insertOne({ ...data, timestamp: new Date() }),
    update: (filter: Partial<IThread>, update: Partial<IThread>) => Thread.collection().updateOne(filter, { $set: update }),
    deleteByUserId: (userId: string) => Thread.collection().deleteMany({ userId }),
}

