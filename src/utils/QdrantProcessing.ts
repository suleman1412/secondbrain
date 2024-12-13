import { QdrantClient } from "@qdrant/js-client-rest";
import { ContentType } from "../types/Schemas";
import { v4 as uuidv4 } from 'uuid';

const client = new QdrantClient({ 
    host: process.env.QDRANT_HOST, 
    port: 6333 ,
    apiKey: process.env.QDRANT_API
})

export const QdrantUpsertPoints = async(embeddings: number[], data: ContentType ) => {
    console.log('in Qdrant upsert Points')
    try {
        const response = await client.upsert("bigBrain", {
            points: [{
                id: uuidv4(),  
                // payload: data,   
                vector: embeddings,  
              }]
        });
        console.log(response.status);
      } catch (error) {
        console.error("Error upserting points:", error);
      }
}

export const QdrantSearch = async (embeddings : number[]) => {
    try{
        const response = await client.search("bigBrain", {
            vector: embeddings,
            limit: 5
        })
        return response
    } catch(e){
        console.log(e)
    }
    
}