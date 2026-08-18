import { Button } from "@/components/ui/button";
import { EditGoalForm } from "./form";

export default function EditGoal() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-1">
        <div className="flex">
          <h1 className="text-3xl font-bold">Edit Goal</h1>
        </div>
        <div className="flex">
          <Button className="bg-red-600 hover:bg-red-700 active:bg-red-800 rounded-sm text-white">
            Delete Goal
          </Button>
        </div>
      </div>
      <EditGoalForm />
    </div>
  );
}
