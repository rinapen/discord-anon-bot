import { getDB } from "../lib/MongoDB";
import { generateUniqueID } from "../utils/utils";

export interface IUniqueID {
    userId: string;
    uniqueID: string;
    updatedAt?: Date;
}

export const UniqueID = {
    collection: () => getDB().collection<IUniqueID>("discord-anon-uniqueids"),
    findByUserId: (userId: string) => UniqueID.collection().findOne({ userId }),
    getOrCreate: async (userId: string): Promise<string> => {
        const existing = await UniqueID.collection().findOne({ userId });
        if (existing) {
            return existing.uniqueID;
        }
        const newUniqueID = await generateUniqueID();
        await UniqueID.collection().insertOne({
            userId,
            uniqueID: newUniqueID,
            updatedAt: new Date()
        });
        return newUniqueID;
    },
    updateAll: async () => {
        const users = await UniqueID.collection().find({}).toArray();
        const updates = await Promise.all(
            users.map(async (user) => ({
                updateOne: {
                    filter: { _id: user._id },
                    update: {
                        $set: {
                            uniqueID: await generateUniqueID(),
                            updatedAt: new Date()
                        }
                    }
                }
            }))
        );
        if (updates.length > 0) {
            await UniqueID.collection().bulkWrite(updates);
        }
    }
}

