"use client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "./datatable/data-table";
import { columns } from "./datatable/columns";
import { useConvexAuth, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function AllTabs() {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const router = useRouter();
  const goals = useQuery(api.goals.list, isAuthenticated ? {} : "skip");

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/");
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading || (!isLoading && !isAuthenticated)) {
    return null;
  }

  return (
    <Tabs defaultValue="all" className="w-">
      <TabsList>
        <TabsTrigger value="all">All</TabsTrigger>
        <TabsTrigger value="new">New</TabsTrigger>
        <TabsTrigger value="progress">In Progress</TabsTrigger>
        <TabsTrigger value="done">Done</TabsTrigger>
      </TabsList>
      <TabsContent value="all">
        <Card>
          <CardHeader>
            <CardTitle>All</CardTitle>
            <CardDescription>
              <DataTable columns={columns} data={goals ?? []} />
            </CardDescription>
          </CardHeader>
        </Card>
      </TabsContent>
      <TabsContent value="new">
        <Card>
          <CardHeader>
            <CardTitle>New</CardTitle>
            <CardDescription>
              <DataTable columns={columns} data={goals ?? []} />
            </CardDescription>
          </CardHeader>
        </Card>
      </TabsContent>
      <TabsContent value="progress">
        <Card>
          <CardHeader>
            <CardTitle>In Progress</CardTitle>
            <CardDescription>
              <DataTable columns={columns} data={goals ?? []} />
            </CardDescription>
          </CardHeader>
        </Card>
      </TabsContent>
      <TabsContent value="done">
        <Card>
          <CardHeader>
            <CardTitle>Done</CardTitle>
            <CardDescription>
              <DataTable columns={columns} data={goals ?? []} />
            </CardDescription>
          </CardHeader>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
