import { Request, Response, Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import { ContentSchema } from "../types/Schemas";
import { ContentModel, TagsModel } from "../db/db";
import { ProcessTags } from "../utils/ProcessTag";

import { QdrantDelete, QdrantSearch, QdrantUpsertPoints } from "../utils/QdrantProcessing";
import { getEmbeddings } from "../utils/TextEmbeddings";

export const ContentRouter = Router();

// Add New Content
ContentRouter.post('/', authMiddleware, async (req: Request, res: Response) => {
    try {
        const { success, data, error } = ContentSchema.safeParse(req.body);
        if (!success) {
            res.status(411).json({
                message: "Error in inputs",
                errors: error.errors,
            });
            return;
        }
        await ProcessTags(data.tags);
        
        // Putting this over inserting in mongo because its less reliable
        await QdrantUpsertPoints(data)
        
        await ContentModel.create({
            contentId: data.contentId,
            link: data.link,
            type: data.type,
            title: data.title,
            tags: data.tags,
            createdAt: data.createdAt,
            // @ts-ignore
            userId: req.userId, 
        });
        res.status(200).json({
            content: {
                link: data.link,
                type: data.type,
                title: data.title,
                tags: data.tags,
                contentId: data.contentId,
                createdAt: data.createdAt
            },
        });

    } catch (e) {
        res.status(500).json({
            message: "Internal Server Error",
            error: e,
        });
    }
});

// Get All Content
ContentRouter.get('/', authMiddleware, async (req: Request, res: Response) => {
    try {
        
        const allContent = await ContentModel.find({
             // @ts-ignore
            userId: req.userId, 
        })
            .populate("userId", "username")
            .populate("tags", "title");

        res.status(200).json({
            allContent,
        });
    } catch (e) {
        res.status(500).json({
            message: "Internal Server Error",
            error: e,
        });
    }
});

// Delete a document
ContentRouter.delete('/', authMiddleware, async (req: Request, res: Response) => {
    try {
        const contentId = req.body.contentId;

        if (!contentId) {
            res.status(400).json({
                message: "Content ID is required for deletion",
            });
            return;
        }

        await ContentModel.deleteOne({
            contentId: contentId,
             // @ts-ignore
            userId: req.userId, 
        });
        await QdrantDelete(contentId)
        res.status(200).json({
            message: "Deleted",
        });
    } catch (e) {
        res.status(500).json({
            message: "Internal Server Error",
            error: e,
        });
    }
});

// Update a document
ContentRouter.put('/', authMiddleware, async (req: Request, res: Response) => {
    try {
        const { success, data, error } = ContentSchema.safeParse(req.body);

        if (!success) {
            res.status(411).json({
                message: "Error in inputs",
                errors: error.errors,
            });
            return;
        }

        const contentId = req.body.contentId;

        if (!contentId) {
            res.status(400).json({
                message: "Content ID is required for updates",
            });
            return;
        }
        const updatedContent = await ContentModel.findOneAndUpdate(
            {
                contentId: contentId,
                 // @ts-ignore
                userId: req.userId,
            },
            {
                link: data.link,
                type: data.type,
                title: data.title,
                tags: data.tags,
            },
            { new: true }
        );

        if (!updatedContent) {
            res.status(404).json({
                message: "Content not found or you're not authorized to update it",
            });
            return;
        }

        await QdrantUpsertPoints(data)
        res.status(200).json({
            message: "Content updated successfully",
            updatedContent,
        });
    } catch (e) {
        console.error("Error updating content:", e);
        res.status(500).json({
            message: "Internal Server Error",
            error: e,
        });
    }
});

ContentRouter.post('/search', authMiddleware, async(req,res) => {
    const searchQuery = req.body.search
    const queryEmbeddings = await getEmbeddings(searchQuery)
    const response = await QdrantSearch(queryEmbeddings)
    res.status(200).json({
        search: response
    })
})
