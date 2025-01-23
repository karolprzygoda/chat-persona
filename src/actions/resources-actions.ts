"use server";

import { Resource } from "@prisma/client";
import prismadb from "@/lib/prismadb";
import { generateEmbeddings } from "@/lib/ai/embedding";

export const createResource = async (input: Resource) => {
  console.log(input);

  try {
    const resource = await prismadb.resource.create({
      data: input,
    });

    const embeddings = await generateEmbeddings(input.content);

    await Promise.all(
      embeddings.map(async (embedding) => {
        return prismadb.$executeRawUnsafe(
          `
      INSERT INTO "Embeddings" ("id", "resourceId", "embedding", "content")
      VALUES (uuid_generate_v4(), $1, $2::vector, $3)
      `,
          resource.id,
          embedding.embedding,
          embedding.content,
        );
      }),
    );

    return "Resource successfully created.";
  } catch (e) {
    if (e instanceof Error)
      return e.message.length > 0 ? e.message : "Error, please try again.";
  }
};
