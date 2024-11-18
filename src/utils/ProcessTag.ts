import { TagsModel } from "../db/db"

export const ProcessTags = async (tagTitles: string[]) => {
    const tagIds = await Promise.all(
        tagTitles.map(async (title) => {
            const tag = await TagsModel.findOneAndUpdate(
                { title: title }, 
                { title: title }, 
                { 
                    upsert: true,      
                    new: true          
                }
            );
            return tag._id;
        })
    );
    return tagIds;
}