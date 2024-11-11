import { z } from "zod";

export const authSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email("Email hast to be valid."),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters long." })
    .max(32, { message: "Password can be up to 32 characters long." })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter.",
    })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter.",
    })
    .regex(/\d/, { message: "Password must contain at least one digit." })
    .regex(/[^a-zA-Z0-9]/, {
      message:
        "Password must contain at least one special character (e.g., !@#$%^&*).",
    }),
});

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
export type TAuthSchema = z.infer<typeof authSchema>;
