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
        throw new Error("Error in Qdrant upsert points: " + error); 
        }
}

export const QdrantSearch = async (embeddings : number[]) => {
    try{
        const response = await client.search("bigBrain", {
            vector: embeddings,
            limit: 5
        })
        return response.map(response => response.id)
    } catch(error){
        console.error("Error searching for points:", error);
        throw new Error("Error in Qdrant search: " + error); 
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
        throw new Error("Error in QdrantDelete: " + error); 
    }
}