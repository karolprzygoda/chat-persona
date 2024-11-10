import { z } from "zod";

const ACCEPTED_FILE_TYPES = ["png", "jpg"];

export const createPersonaSchema = z.object({
  avatar: (typeof window === "undefined" ? z.any() : z.instanceof(FileList))
    .refine((file) => file.length > 0, "Avatar is required")
    .refine((file) => {
      const fileExtension = file[0].name.split(".").pop();
      return fileExtension && ACCEPTED_FILE_TYPES.includes(fileExtension);
    }, "Only .jpg and .png formats are supported"),
  name: z.string().min(1, {
    message: "Name is required",
  }),
  description: z.string().min(1, {
    message: "Description is required.",
  }),
  categoryId: z.string().min(1, {
    message: "Category is required",
  }),
  instructions: z.string().min(200, {
    message: "Instructions require at least 200 characters.",
  }),
  seed: z.string().min(200, {
    message: "Seed require at least 200 characters.",
  }),
});

export type TCreatePersonaSchema = z.infer<typeof createPersonaSchema>;
