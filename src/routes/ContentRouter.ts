import { Request, Response, Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import { ContentSchema } from "../types/Schemas";
import { ContentModel } from "../db/db";
import { ProcessTags } from "../utils/ProcessTag";

// Set up the router
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

        const tagIds = await ProcessTags(data.tags);

        await ContentModel.create({
            link: data.link,
            type: data.type,
            title: data.title,
            tags: tagIds,
            // @ts-ignore
            userId: req.userId, 
        });

        res.status(200).json({
            // @ts-ignore
            message: `Content created for ${req.userId}`,
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
            _id: contentId,
             // @ts-ignore
            userId: req.userId, 
        });

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

        const { contentId } = req.body;

        if (!contentId) {
            res.status(400).json({
                message: "Content ID is required for updates",
            });
            return;
        }

        const tagIds = await ProcessTags(data.tags);

        const updatedContent = await ContentModel.findOneAndUpdate(
            {
                _id: contentId,
                 // @ts-ignore
                userId: req.userId,
            },
            {
                link: data.link,
                type: data.type,
                title: data.title,
                tags: tagIds,
            },
            { new: true }
        );

        if (!updatedContent) {
            res.status(404).json({
                message: "Content not found or you're not authorized to update it",
            });
            return;
        }

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
