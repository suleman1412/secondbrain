import { TagsModel } from "../db/db"
import { TagType } from "../types/Schemas";

export const ProcessTags = async (tags: TagType[]) => {
    try {
        await TagsModel.insertMany(tags, { ordered: false });
    } catch (e) {
        // @ts-ignore
        if (e.code === 11000) {
            console.warn("Duplicate tags were skipped.");
        } else {
            console.error("Unexpected error during tag insertion:", e);
        }
    }
};