import { embed, embedMany } from "ai";
import { openai } from "@ai-sdk/openai";
import prismadb from "@/lib/prismadb";

const embeddingModel = openai.embedding("text-embedding-ada-002");

const generateChunks = (input: string): string[] => {
  return input
    .trim()
    .split(".")
    .filter((i) => i !== "");
};

export const generateEmbeddings = async (
  value: string,
): Promise<Array<{ embedding: number[]; content: string }>> => {
  const chunks = generateChunks(value);
  const { embeddings } = await embedMany({
    model: embeddingModel,
    values: chunks,
  });
  return embeddings.map((e, i) => ({ content: chunks[i], embedding: e }));
};

export const generateEmbedding = async (value: string): Promise<number[]> => {
  const input = value.replaceAll("\\n", " ");
  const { embedding } = await embed({
    model: embeddingModel,
    value: input,
  });
  return embedding;
};

export const findRelevantContent = async (userQuery: string) => {
  try {
    const userQueryEmbedded = await generateEmbedding(userQuery);

    const similarGuides = await prismadb.$queryRawUnsafe<
      { content: string; similarity: number }[]
    >(`
      SELECT 
        content, 
        1 - (embedding <=> ARRAY[${userQueryEmbedded}]::vector) AS similarity
      FROM "Embeddings"
      WHERE 1 - (embedding <=> ARRAY[${userQueryEmbedded}]::vector) > 0.5
      ORDER BY similarity DESC
      LIMIT 4;
    `);

    return similarGuides.length > 0 ? similarGuides[0].content : null;
  } catch (error) {
    console.log(error);
  }
};
