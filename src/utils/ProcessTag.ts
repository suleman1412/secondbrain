import { TagsModel } from "../db/db"

export const ProcessTags = async (tagTitles: string[]) => {
    const tagIds = await Promise.all(
        tagTitles.map(async (title) => {
            const sensitisedTitle = title.toLowerCase().trim()
            const tag = await TagsModel.findOneAndUpdate(
                { title: sensitisedTitle }, 
                { title: sensitisedTitle }, 
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