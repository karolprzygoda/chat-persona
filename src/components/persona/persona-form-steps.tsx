import { useMultiStepFormContext } from "@/components/ui/multi-step-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import ImageUpload from "@/components/image-upload";

import { Category } from "@prisma/client";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";
import { Textarea } from "@/components/ui/textarea";

export const AvatarStep = () => {
  const { form } = useMultiStepFormContext();

  return (
    <Form {...form}>
      <FormField
        name={"avatar"}
        render={({ field }) => (
          <FormItem className={"flex flex-col items-center"}>
            <FormControl>
              <ImageUpload value={field.value} onChange={field.onChange} />
            </FormControl>
            <p className={"ml-5 mt-2 self-start text-xs text-muted-foreground"}>
              This image will be displayed in Persona Card
            </p>
            <FormMessage />
          </FormItem>
        )}
      />
    </Form>
  );
};

export const BasicInfoStep = ({ categories }: { categories: Category[] }) => {
  const { form } = useMultiStepFormContext();

  return (
    <Form {...form}>
      <div className={"flex flex-col gap-8 md:h-[424px]"}>
        <FormField
          name={"basicInfo.name"}
          control={form.control}
          render={({ field }) => (
            <FormItem className={"col-span-2 md:col-span-1"}>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder={"Elon Musk"} {...field} />
              </FormControl>
              <FormDescription>
                This is how your AI Persona will be named.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name={"basicInfo.description"}
          control={form.control}
          render={({ field }) => (
            <FormItem className={"col-span-2 md:col-span-1"}>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder={"CEO & Founder of Tesla"} {...field} />
              </FormControl>
              <FormDescription>
                Short description for your AI Persona.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name={"basicInfo.categoryId"}
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select
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
              <FormDescription>Select a category of your AI</FormDescription>
            </FormItem>
          )}
        />
      </div>
    </Form>
  );
};

export const InstructionsStep = () => {
  const { form } = useMultiStepFormContext();

  return (
    <Form {...form}>
      <FormField
        name={"instructions"}
        control={form.control}
        render={({ field }) => (
          <FormItem
            className={
              "col-span-2 flex h-96 flex-col md:col-span-1 md:h-[424px]"
            }
          >
            <FormLabel>Example Instructions</FormLabel>
            <FormControl>
              <Textarea
                className={"flex-1 resize-none bg-background"}
                placeholder={"Basic knowledge of your chatbot"}
                {...field}
              />
            </FormControl>
            <FormDescription>
              Describe basic knowledge of your chatbot.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </Form>
  );
};

export const SeedStep = ({ isSubmitting }: { isSubmitting: boolean }) => {
  const { form } = useMultiStepFormContext();

  return (
    <Form {...form}>
      <FormField
        name={"seed"}
        control={form.control}
        render={({ field }) => (
          <FormItem
            className={
              "col-span-2 flex h-96 flex-col md:col-span-1 md:h-[424px]"
            }
          >
            <FormLabel>Example Conversation</FormLabel>
            <FormControl>
              <Textarea
                disabled={isSubmitting}
                className={"flex-1 resize-none bg-background"}
                placeholder={"example of your conversation"}
                {...field}
              />
            </FormControl>
            <FormDescription>Describe example conversation.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </Form>
  );
};
