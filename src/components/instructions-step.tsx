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

const InstructionsStep = () => {
  const { form, nextStep, prevStep, isStepValid } = useMultiStepFormContext();

  return (
    <Form {...form}>
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
                placeholder={"instructions for your AI"}
                {...field}
              />
            </FormControl>
            <FormDescription>
              Describe in detail your persona backstory and relevant details.
            </FormDescription>
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

export default InstructionsStep;
