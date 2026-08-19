/* eslint-disable react/no-children-prop */
"use client";

import * as React from "react";
import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import { useParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import BackButton from "@/components/back-button";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { get } from "http";

const formSchema = z.object({
  name: z
    .string()
    .min(5, "Goal name must be at least 5 characters.")
    .max(32, "Goal name must be at most 32 characters."),
  parent: z
    .string()
    .max(48, "Parent must be at most 48 characters.")
    .or(z.literal("")),
  position: z.number(),
});

export function EditGoalForm() {
  const { id } = useParams<{ id: Id<"goals"> }>();
  const getGoal = useQuery(api.goals.get, { id });
  const updateGoal = useMutation(api.goals.update);

  const form = useForm({
    defaultValues: {
      name: getGoal?.name ?? "",
      parent: getGoal?.parentId ?? "",
      position: getGoal?.position ?? 0,
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      if (!id || !value.name.trim() || !value.position) return;
      await updateGoal({
        id,
        name: value.name.trim(),
        position: value.position,
      });
      form.reset();
    },
  });

  if (getGoal === undefined) {
    return (
      <div className="text-center p-6 text-sm text-muted-foreground">
        Loading goal data...
      </div>
    );
  }
  if (getGoal === null) {
    return (
      <div className="text-center p-6 text-sm text-destructive">
        Goal not found.
      </div>
    );
  }

  return (
    <Card className="w-full" key={getGoal._id}>
      <CardContent>
        <form
          id="edit-goal-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <form.Field
                name="name"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>
                        Name <span className="text-red-500">*</span>
                      </FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        placeholder=""
                        autoComplete="off"
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />
              <form.Field
                name="parent"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Parent</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        placeholder=""
                        autoComplete="off"
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />
              {/* <form.Field
                name="color"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Color</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        placeholder=""
                        autoComplete="off"
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              /> */}
              <form.Field
                name="position"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>
                        Display Order
                      </FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        type="number"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) =>
                          field.handleChange(
                            e.target.value === "" ? 0 : Number(e.target.value),
                          )
                        }
                        aria-invalid={isInvalid}
                        placeholder=""
                        autoComplete="off"
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />
              {/* <form.Field
                name="description"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Description</FieldLabel>
                      <InputGroup>
                        <InputGroupTextarea
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          placeholder=""
                          rows={2}
                          className="min-h-24 resize-none"
                          aria-invalid={isInvalid}
                        />
                        <InputGroupAddon align="block-end">
                          <InputGroupText className="tabular-nums">
                            {field.state.value.length}/100 characters
                          </InputGroupText>
                        </InputGroupAddon>
                      </InputGroup>
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              /> */}
            </div>
          </FieldGroup>
        </form>
      </CardContent>
      <Field orientation="horizontal" className="justify-end pr-4 pt-4">
        <Button
          type="submit"
          form="edit-goal-form"
          className="bg-cyan-600 hover:bg-cyan-700 active:bg-cyan-800 text-white"
        >
          Edit
        </Button>
        <BackButton />
      </Field>
    </Card>
  );
}
