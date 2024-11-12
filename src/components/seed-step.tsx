import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import React from "react";
import { useMultiStepFormContext } from "@/components/ui/multi-step-form";

const SeedStep = () => {
  const { form, nextStep, prevStep, isStepValid } = useMultiStepFormContext();

  return (
    <Form {...form}>
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
                placeholder={"example of your conversation"}
                {...field}
              />
            </FormControl>
            <FormDescription>Describe example conversation.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="flex justify-end space-x-2">
        <Button type={"button"} variant={"outline"} onClick={prevStep}>
          Previous
        </Button>
        <Button disabled={!isStepValid()} onClick={nextStep}>
          Next
        </Button>
      </div>
    </Form>
  );
};

export default SeedStep;
