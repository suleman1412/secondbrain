import { QdrantClient, QdrantClientUnexpectedResponseError } from "@qdrant/js-client-rest";
import { ContentType } from "../types/Schemas";
import { cleanPayload } from "./cleanPayload";
import { getEmbeddings } from "./TextEmbeddings";

const client = new QdrantClient({ 
    host: process.env.QDRANT_HOST, 
    port: 6333 ,
    apiKey: process.env.QDRANT_API
})

export const QdrantUpsertPoints = async(data: ContentType ) => {
    const payload = cleanPayload(data)
    const embeddings = await getEmbeddings(payload)
    try {
        
        await client.upsert("bigBrain", {
            points: [{
                id: data.contentId,  
                payload: payload,
                vector: embeddings,  
            }]
        });
        console.log("Qdrant Created id: ", data.contentId)
        return;
      } catch (error) {
        console.error("Error upserting points:", error);
        }
}

export const QdrantSearch = async (embeddings : number[]) => {
    try{
        const response = await client.search("bigBrain", {
            vector: embeddings,
            limit: 3
        })
        return response.map(response => response.id)
    } catch(error){
        console.error("Error searching for points:", error);
    }
}

export const QdrantDelete = async(contentId: string) => {
    try{
        await client.delete("bigBrain", {
            points: [contentId]
        })
        console.log("Qdrant Deleting id: ", contentId)
        return;
    } catch (error){
        console.error("Error deleting points:", error);
    }
}