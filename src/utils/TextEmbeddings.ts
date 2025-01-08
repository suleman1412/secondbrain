import { CleanedPayload } from "./cleanPayload";
import { CohereClient } from 'cohere-ai';

const cohere = new CohereClient({
    token: process.env.COHERE_API_KEY
})

export const getEmbeddings = async (data: CleanedPayload | string): Promise<number[]> => {
    let stagedData: string;
    
    if (typeof data === "string") {
        stagedData = data.trim();
    } else {
        stagedData = (data.title + " " + data.tagTitles.join(" ")).trim();
    }

    if (!stagedData) {
        throw new Error("Staged data is empty, cannot generate embeddings.");
    }
    try {
        const embed = await cohere.v2.embed({
            model: 'embed-english-v3.0',
            inputType: 'search_document',
            embeddingTypes: ['float'],
            texts: [stagedData],
        });
        const vector = embed.embeddings.float![0]
        return vector;

    } catch (error) {
        console.error("Error generating embeddings:", error);
        throw new Error(`Error in getEmbeddings: ${error}`);
    }
};
