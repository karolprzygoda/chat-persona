"use client";

import { Category, Persona } from "@prisma/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import ImageUpload from "@/components/image-upload";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Wand2 } from "lucide-react";
import { useRef } from "react";
import { createPersonaAction } from "@/actions/actions";
import { toast } from "@/hooks/use-toast";
import { createPersonaSchema, TCreatePersonaSchema } from "@/schemas/schema";

type PersonaFormProps = {
  initialData: Persona | null;
  categories: Category[];
};

const PersonaForm = ({ initialData, categories }: PersonaFormProps) => {
  const formRef = useRef<HTMLFormElement>(null);
  const form = useForm<TCreatePersonaSchema>({
    resolver: zodResolver(createPersonaSchema),
    defaultValues: initialData || {
      avatar: undefined,
      name: "",
      description: "",
      categoryId: undefined,
      instructions: "",
      seed: "",
    },
  });

  const isLoading = form.formState.isLoading;

  const onSubmit = async (data: TCreatePersonaSchema) => {
    const { title, message, variant } = await createPersonaAction(data);
    toast({
      title,
      description: message,
      variant,
    });
  };

  return (
    <div className={"mx-auto h-full max-w-3xl space-y-2 p-4"}>
      <Form {...form}>
        <form
          ref={formRef}
          className={"space-y-8"}
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className={"w-full space-y-2"}>
            <div>
              <h3 className={"text-lg font-medium"}>General Information</h3>
              <p className={"text-sm text-muted-foreground"}>
                General information about your Persona
              </p>
            </div>
            <Separator className={"bg-primary/10"} />
          </div>
          <FormField
            name={"avatar"}
            render={({ field }) => (
              <FormItem
                className={
                  "flex flex-col items-center justify-center space-y-4"
                }
              >
                <FormControl>
                  <ImageUpload
                    value={field.value}
                    onChange={field.onChange}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className={"grid grid-cols-1 gap-4 md:grid-cols-2"}>
            <FormField
              name={"name"}
              control={form.control}
              render={({ field }) => (
                <FormItem className={"col-span-2 md:col-span-1"}>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder={"Elon Musk"}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This is how your AI Persona will be named.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name={"description"}
              control={form.control}
              render={({ field }) => (
                <FormItem className={"col-span-2 md:col-span-1"}>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder={"CEO & Founder of Tesla"}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Short description for your AI Persona.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name={"categoryId"}
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className={"bg-background"}>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder={"Select a Category"}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Select a category of your AI
                  </FormDescription>
                </FormItem>
              )}
            />
          </div>
          <div className={"w-full space-y-2"}>
            <div>
              <h3 className={"text-lg font-medium"}>Configuration</h3>
              <p>Detailed instructions for AI behaviour</p>
            </div>
            <Separator className={"bg-primary/10"} />
          </div>
          <FormField
            name={"instructions"}
            control={form.control}
            render={({ field }) => (
              <FormItem className={"col-span-2 md:col-span-1"}>
                <FormLabel>Instructions</FormLabel>
                <FormControl>
                  <Textarea
                    className={"resize-none bg-background"}
                    rows={7}
                    disabled={isLoading}
                    placeholder={"instructions for your AI"}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Describe in detail your persona backstory and relevant
                  details.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name={"seed"}
            control={form.control}
            render={({ field }) => (
              <FormItem className={"col-span-2 md:col-span-1"}>
                <FormLabel>Example Conversation</FormLabel>
                <FormControl>
                  <Textarea
                    className={"resize-none bg-background"}
                    rows={7}
                    disabled={isLoading}
                    placeholder={"example of your conversation"}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Describe example conversation.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className={"flex w-full justify-center"}>
            <Button size={"lg"} disabled={isLoading}>
              {initialData ? "Edit your persona" : "Create your persona"}
              <Wand2 className={"ml-2 h-4 w-4"} />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default PersonaForm;
