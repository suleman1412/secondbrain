import { Request, Response, Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import { ContentModel, LinksModel } from "../db/db";
import crypto from 'crypto'

export const BrainRouter = Router()

BrainRouter.post("/share", authMiddleware, async (req: Request, res: Response) => {
    try {
        const shareLink: boolean = req.body.share;
        // @ts-ignore
        const userId = req.userId;

        const content = await ContentModel.findOne({ userId });

        if (!content) {
            res.status(200).json({
                message: "User has no content in SecondBrain",
            });
            return;
        }

        if (shareLink) {
            const hash = crypto.createHash("sha256").update(userId + Date.now()).digest("hex");

            const linkCreated = await LinksModel.findOneAndUpdate(
                { userId },
                { hash, userId },
                { upsert: true, new: true }
            );

            res.status(200).json({
                message: `Share link enabled for ${linkCreated.userId}`,
                link: linkCreated.hash,
            });
            return;
        } else {
            await LinksModel.deleteOne({ userId });

            res.status(200).json({
                message: "Share link has been disabled.",
            });
            return;
        } 
        
    } catch (e) {
        console.error("Error in /share:", e);
        res.status(500).json({
            message: "Internal Server Error in /share",
        });
    }
});

BrainRouter.get("/:shareLink", async(req:Request, res:Response)  => {
    const shareLink = req.params.shareLink;
    try{
        const collectionLink = await LinksModel.findOne({ hash: shareLink })
        if(!collectionLink){
            res.status(404).json({
                message: "Could not find the collection"
            })
            return ;
        } else{
            const content = await ContentModel.find({
                userId: collectionLink.userId.toString()
            })
            .populate('tags', 'title')
            .populate('userId', 'username')

            res.status(200).json({
                content, 
                shareLink
            })
            return; 
        }
    } catch(e){
        res.status(500).json({
            message: "Internal Server Errror in /:shareLink"
        })
        return ;
    }
})