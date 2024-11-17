import { Request, Response, Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import { ContentSchema } from "../types/Schemas";
import { ContentModel } from "../db/db";
import { ProcessTags } from "../utils/ProcessTag";

export const ContentRouter = Router()


// Add New Content
ContentRouter.post('/add', authMiddleware, async(req: Request, res: Response) => {
    try{
        const { success, data, error} = ContentSchema.safeParse(req.body)
        if(!success){
            res.status(411).json({
                message: "Error in inputs",
                errors: error.errors
            });
        } else{
            
            // Making DB call to TagSchema here to create if not exist Tags and extract the tagIds
            const tagIds = await ProcessTags(data.tags)

            await ContentModel.create({
                link: data.link,
                type: data.type,
                title: data.title,
                tags: tagIds,
                // @ts-ignore
                userId: req.userId
            })
            res.status(200).json({
                // @ts-ignore
                message: `Content created for ${req.userId}`
            })       
        }
    } catch(e){
        res.status(500).json({
            message: "Internal Server Error",
            error: e
        })
    }
})

// Get all Content
ContentRouter.get('/', authMiddleware, async(req: Request, res: Response) => {
    try{
        const allContent = await ContentModel.find({ 
            // @ts-ignore
            userId: req.userId
        }).populate("userId", "username")
        res.status(200).json({
            // @ts-ignore
            message: `All Content for ${req.userId}`,
            allContent
        })
    } catch (e){
        res.status(500).json({
            message: "Internal Server Error",
            error: e
        })
    }
        
})

// Delete a document
ContentRouter.delete('/', authMiddleware, async(req: Request, res: Response) => {
    const contentId = req.body.contentId;
    await ContentModel.deleteMany({
        _id: contentId,
        // @ts-ignore
        userId: req.userId
    })

    res.json({
        message: "Deleted"
    })
})
