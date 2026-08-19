import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CreateGoalForm } from "./form";

export default function CreateGoal() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-1">
        <div className="flex">
          <h1 className="text-3xl font-bold">Create Goal</h1>
        </div>
        <div className="flex">
          <Button className="bg-cyan-600 hover:bg-cyan-700 active:bg-cyan-800 text-white">
            <Link href="/goals">All Goals</Link>
          </Button>
        </div>
      </div>
      <CreateGoalForm />
    </div>
  );
}
