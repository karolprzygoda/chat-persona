import { Category } from "@prisma/client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import React from "react";
import { useMultiStepFormContext } from "@/components/ui/multi-step-form";

const BasicInfoStep = ({ categories }: { categories: Category[] }) => {
  const { form, nextStep, isStepValid } = useMultiStepFormContext();

  return (
    <Form {...form}>
      <div className={"flex flex-col gap-4"}>
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
        <div className="flex justify-end space-x-2">
          <Button onClick={nextStep} disabled={!isStepValid()}>
            Next
          </Button>
        </div>
      </div>
    </Form>
  );
};

export default BasicInfoStep;
