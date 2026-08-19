import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Cards } from "./cards";
import { AllTabs } from "./tabs";

export default function Goals() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-1">
        <div className="flex">
          <h1 className="text-3xl font-bold">Goals</h1>
        </div>
        <div className="flex">
          <Button className="bg-cyan-600 hover:bg-cyan-700 active:bg-cyan-800 text-white">
            <Link href="/goals/create">New Goal</Link>
          </Button>
        </div>
      </div>
      <Cards />
      <AllTabs />
    </div>
  );
}
