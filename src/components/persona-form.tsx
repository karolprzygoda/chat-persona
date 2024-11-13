"use client";

import {
  MultiStepForm,
  MultiStepFormContextProvider,
  MultiStepFormFooter,
  MultiStepFormHeader,
  MultiStepFormStep,
} from "@/components/ui/multi-step-form";
import { createPersonaSchema, TCreatePersonaSchema } from "@/schemas/schema";
import Stepper from "@/components/ui/stepper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Category } from "@prisma/client";
import {
  AvatarStep,
  BasicInfoStep,
  InstructionsStep,
  SeedStep,
} from "@/components/persona-form-steps";
import { createPersonaAction } from "@/actions/actions";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

const titles = [
  "Add an avatar to your persona",
  "Provide some basic information's",
  "Provide some instructions for your Persona",
  "Provide example conversation",
];

const PersonaForm = ({ categories }: { categories: Category[] }) => {
  const form = useForm<TCreatePersonaSchema>({
    resolver: zodResolver(createPersonaSchema),
    defaultValues: {
      avatar: {
        path: "",
        file: null,
      },
      basicInfo: {
        name: "",
        description: "",
        categoryId: undefined,
      },
      instructions: "",
      seed: "",
    },
    reValidateMode: "onBlur",
    mode: "onBlur",
  });

  const isSubmitting = form.formState.isSubmitting;

  const onSubmit = async (data: TCreatePersonaSchema) => {
    const { title, message, variant } = await createPersonaAction(data);
    toast({
      title,
      description: message,
      variant,
    });
  };

  return (
    <MultiStepForm
      className={"flex flex-col justify-around p-4 md:gap-10"}
      schema={createPersonaSchema}
      form={form}
      onSubmit={onSubmit}
    >
      <MultiStepFormHeader className={"flex w-full flex-col justify-center"}>
        <MultiStepFormContextProvider>
          {({ currentStepIndex }) => (
            <>
              <h2 className={"text-xl font-bold md:h-auto md:min-h-fit"}>
                {titles[currentStepIndex]}
              </h2>
              <Stepper
                steps={["Avatar", "Basic Info", "Instructions", "Seed"]}
                className={"my-6 md:my-10"}
                currentStep={currentStepIndex}
              />
            </>
          )}
        </MultiStepFormContextProvider>
      </MultiStepFormHeader>
      <MultiStepFormStep name="avatar">
        <AvatarStep />
      </MultiStepFormStep>
      <MultiStepFormStep name="basicInfo">
        <BasicInfoStep categories={categories} />
      </MultiStepFormStep>
      <MultiStepFormStep name="instructions">
        <InstructionsStep />
      </MultiStepFormStep>
      <MultiStepFormStep name="seed">
        <SeedStep isSubmitting={isSubmitting} />
      </MultiStepFormStep>
      <MultiStepFormFooter className={"flex w-full justify-end space-x-4"}>
        <MultiStepFormContextProvider>
          {({ isFirstStep, isLastStep, isStepValid, nextStep, prevStep }) => (
            <>
              {!isFirstStep && (
                <Button type={"button"} variant={"outline"} onClick={prevStep}>
                  Previous
                </Button>
              )}
              {isLastStep ? (
                <Button
                  disabled={!isStepValid() || isSubmitting}
                  type={"submit"}
                >
                  Create!
                </Button>
              ) : (
                <Button
                  className={isFirstStep ? "w-full md:w-auto" : ""}
                  disabled={!isStepValid()}
                  onClick={nextStep}
                >
                  Next
                </Button>
              )}
            </>
          )}
        </MultiStepFormContextProvider>
      </MultiStepFormFooter>
    </MultiStepForm>
  );
};

export default PersonaForm;
