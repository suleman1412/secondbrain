import { CleanedPayload } from "./cleanPayload";

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
        const response = await fetch(`${process.env.E5LARGEMODEL}`, {
            headers: {
                Authorization: `Bearer ${process.env.HUGGINGFACE_API}`,
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({ inputs: stagedData }),
        });
        console.log("Embeddings generated for data: ", data)
        if (!response.ok) {
            throw new Error(`Failed to fetch embeddings: ${response.status} ${response.statusText}`);
        }
        const vector: Promise<number[]> = await response.json();
        return vector;

    } catch (error) {
        console.error("Error generating embeddings:", error);
        throw new Error(`Error in getEmbeddings: ${error}`);
    }
};
