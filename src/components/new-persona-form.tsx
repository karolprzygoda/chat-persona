"use client";

import {
  MultiStepForm,
  MultiStepFormContextProvider,
  MultiStepFormHeader,
  MultiStepFormStep,
} from "@/components/ui/multi-step-form";
import { createPersonaSchema, TCreatePersonaSchema } from "@/schemas/schema";
import Stepper from "@/components/ui/stepper";
import BasicInfoStep from "@/components/basic-info-step";
import InstructionsStep from "@/components/instructions-step";
import SeedStep from "@/components/seed-step";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Category } from "@prisma/client";

const NewPersonaForm = ({ categories }: { categories: Category[] }) => {
  const onSubmit = () => {
    console.log("XD");
  };

  const form = useForm<TCreatePersonaSchema>({
    resolver: zodResolver(createPersonaSchema),
    defaultValues: {
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

  return (
    <MultiStepForm
      className={"space-y-8 p-4"}
      schema={createPersonaSchema}
      form={form}
      onSubmit={onSubmit}
    >
      <MultiStepFormHeader
        className={"flex w-full flex-col justify-center space-y-6"}
      >
        <h2 className={"text-xl font-bold"}>Create your Persona!</h2>
        <MultiStepFormContextProvider>
          {({ currentStepIndex }) => (
            <Stepper
              steps={["Account", "Profile", "Review"]}
              currentStep={currentStepIndex}
            />
          )}
        </MultiStepFormContextProvider>
      </MultiStepFormHeader>
      <MultiStepFormStep name="basicInfo">
        <BasicInfoStep categories={categories} />
      </MultiStepFormStep>
      <MultiStepFormStep name="instructions">
        <InstructionsStep />
      </MultiStepFormStep>
      <MultiStepFormStep name="seed">
        <SeedStep />
      </MultiStepFormStep>
    </MultiStepForm>
  );
};

export default NewPersonaForm;
