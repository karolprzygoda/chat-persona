"use server";

import { createPersonaSchema, TCreatePersonaSchema } from "@/schemas/schema";
import { currentUser } from "@clerk/nextjs/server";
import { supabase } from "@/lib/supabaseClient";
import prismadb from "@/lib/prismadb";

export type StateType = {
  title: string;
  message: string;
  variant: "default" | "destructive";
};

export const createPersonaAction = async (formData: TCreatePersonaSchema) => {
  try {
    const user = await currentUser();

    if (!user || !user.id || !user.firstName) {
      return {
        title: "Error",
        message: "Unauthorized",
        variant: "destructive",
      } as StateType;
    }

    const validatedPersona = createPersonaSchema.safeParse(formData);

    if (!validatedPersona.success) {
      return {
        title: "Error",
        message: "Invalid form data",
        variant: "destructive",
      } as StateType;
    }

    const { categoryId, avatar, name, description, instructions, seed } =
      validatedPersona.data;

    const fileName = `${Date.now()}_${avatar?.[0].name}`;

    const { data, error } = await supabase.storage
      .from("personas-avatars")
      .upload(fileName, avatar!);

    if (error || !data) {
      return {
        title: "Error",
        message: "Something went wrong",
        variant: "destructive",
      } as StateType;
    }

    await prismadb.persona.create({
      data: {
        categoryId,
        userId: user.id,
        userName: user.firstName,
        src: data.fullPath,
        name,
        description,
        instructions,
        seed,
      },
    });

    return {
      title: "Success",
      message: "Correctly added new Persona",
      variant: "default",
    } as StateType;
  } catch (error) {
    console.log(error);
    return {
      title: "Error",
      message: "Something went wrong",
      variant: "destructive",
    } as StateType;
  }
};
