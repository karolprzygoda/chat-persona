"use server";

import {
  createPersonaSchema,
  TAuthSchema,
  TCreatePersonaSchema,
} from "@/schemas/schema";
import { createClient } from "@/lib/supabase/supabaseServer";
import prismadb from "@/lib/prismadb";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export type StateType = {
  title: string;
  message: string;
  variant: "default" | "destructive";
};

export const createPersonaAction = async (formData: TCreatePersonaSchema) => {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (!user || authError) {
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

    const {
      basicInfo: { categoryId, name, description },
      avatar,
      instructions,
      seed,
    } = validatedPersona.data;

    const fileName = `${Date.now()}_${user.id}_${avatar.file?.[0].name}`;

    const { data, error: uploadError } = await supabase.storage
      .from("personas-avatars")
      .upload(fileName, avatar.file?.[0]);

    if (uploadError || !data) {
      return {
        title: "Error",
        message: "Something went wrong",
        variant: "destructive",
      } as StateType;
    }

    const { data: publicUrlData } = supabase.storage
      .from("personas-avatars")
      .getPublicUrl(`${data.path}`);

    if (!publicUrlData) {
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
        userName: user.user_metadata.name,
        src: publicUrlData.publicUrl,
        name,
        description,
        instructions,
        seed,
      },
    });

    revalidatePath("/");

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

export async function login(formData: TAuthSchema) {
  const supabase = await createClient();

  const data = {
    email: formData.email,
    password: formData.password,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    return {
      title: "Error",
      message: error.message,
      variant: "destructive",
    } as StateType;
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signup(formData: TAuthSchema) {
  const supabase = await createClient();

  const data = {
    email: formData.email,
    password: formData.password,
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    return {
      title: "Error",
      message: error.message,
      variant: "destructive",
    } as StateType;
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function loginWithGitHub() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: "http://localhost:3000",
    },
  });

  console.log(data, error);

  if (error) {
    return {
      title: "Error",
      message: error.message,
      variant: "destructive",
    } as StateType;
  } else {
    return redirect(data.url);
  }
}

export async function loginWithGoogle() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: "http://localhost:3000",
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
    },
  });

  console.log(data, error);

  if (error) {
    return {
      title: "Error",
      message: error.message,
      variant: "destructive",
    } as StateType;
  } else {
    return redirect(data.url);
  }
}
