"use server";

import {
  authSchema,
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
  description: string;
  variant: "default" | "destructive";
};

export async function createPersonaAction(formData: TCreatePersonaSchema) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (!user || authError) {
      return {
        title: "Error",
        description: "Unauthorized",
        variant: "destructive",
      } as StateType;
    }

    const validatedPersona = createPersonaSchema.safeParse(formData);

    if (!validatedPersona.success) {
      return {
        title: "Error",
        description: "Invalid form data",
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
        description: "Something went wrong",
        variant: "destructive",
      } as StateType;
    }

    const { data: publicUrlData } = supabase.storage
      .from("personas-avatars")
      .getPublicUrl(`${data.path}`);

    if (!publicUrlData) {
      return {
        title: "Error",
        description: "Something went wrong",
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
      description: "Correctly added new Persona",
      variant: "default",
    } as StateType;
  } catch (error) {
    console.log(error);
    return {
      title: "Error",
      description: "Something went wrong",
      variant: "destructive",
    } as StateType;
  }
}

export async function signIn(formData: TAuthSchema) {
  const supabase = await createClient();

  const data = {
    email: formData.email,
    password: formData.password,
  };

  const validatedAuthData = authSchema.safeParse(data);

  if (!validatedAuthData.success) {
    return validatedAuthData.error.errors[0];
  }

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    return error;
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signUp(formData: TAuthSchema) {
  const supabase = await createClient();

  const data = {
    email: formData.email,
    password: formData.password,
  };

  const validatedAuthData = authSchema.safeParse(data);

  if (!validatedAuthData.success) {
    return validatedAuthData.error.errors[0];
  }

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    return error;
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signInWithGithub() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: "http://localhost:3000/auth/callback",
    },
  });

  if (error) {
    return error;
  }

  if (data.url) {
    redirect(data.url);
  }
}

export async function signInWithGoogle() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: "http://localhost:3000/auth/callback",
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
    },
  });

  if (error) {
    return error;
  }
  if (data.url) {
    redirect(data.url);
  }
}

export async function deletePersonaAction(id: string) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (!user || authError) {
      return {
        title: "Error",
        description: "Unauthorized",
        variant: "destructive",
      } as StateType;
    }

    const persona = await prismadb.persona.delete({
      where: {
        userId: user.id,
        id,
      },
    });

    revalidatePath("/");

    return {
      title: "Success",
      description: `Correctly deleted Persona: ${persona.name}`,
    } as StateType;
  } catch (error) {
    console.log(error);
    return {
      title: "Error",
      description: "Something went wrong.",
      variant: "destructive",
    } as StateType;
  }
}
