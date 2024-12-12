import { ContentType } from "../types/Schemas";

export const getEmbeddings = async(data: ContentType | string)=> {
    let stagedData: string;
    console.log('in embeddings', data)

    if(typeof data === "string"){
        stagedData = data
    } else{
        stagedData = data.title + ' '.concat(data.tags.map(tag => tag.title).join(' '))
    }
    console.log('generating embeddings for ', stagedData)
    const response = await fetch(
        `${process.env.E5LARGEMODEL}`,
        {
            headers: {
                Authorization: `Bearer ${process.env.HUGGINGFACE_API}`,
                "Content-Type": "application/json",
            },
            method: "POST",
            body: stagedData,
        }
    );
    const vector: Promise<number[]> = await response.json()
    return vector
}

