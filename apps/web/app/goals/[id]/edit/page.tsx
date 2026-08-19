"use client";

import { Button } from "@/components/ui/button";
import { EditGoalForm } from "./form";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { redirect, useParams } from "next/navigation";

export default function EditGoal() {
  const { id } = useParams<{ id: Id<"goals"> }>();
  const removeGoal = useMutation(api.goals.remove);

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this goal?")) {
      await removeGoal({ id });
      // window.location.href = "/goals";
      redirect("/goals");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-1">
        <div className="flex">
          <h1 className="text-3xl font-bold">Edit Goal</h1>
        </div>
        <div className="flex">
          <Button
            className="bg-red-600 hover:bg-red-700 active:bg-red-800 rounded-sm text-white"
            onClick={handleDelete}
          >
            Delete Goal
          </Button>
        </div>
      </div>
      <EditGoalForm />
    </div>
  );
}
