import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { DataTable } from "./datatable/data-table"
import { columns, Payment } from "./datatable/columns"

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "938ed52f",
      amount: 200,
      status: "failed",
      email: "m@example.com",
    },
    {
      id: "836ed52f",
      amount: 300,
      status: "success",
      email: "m@example.com",
    },
  ]
}

export async function AllTabs() {
  const data = await getData()

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
              <DataTable columns={columns} data={data} />
            </CardDescription>
          </CardHeader>
        </Card>
      </TabsContent>
      <TabsContent value="new">
        <Card>
          <CardHeader>
            <CardTitle>New</CardTitle>
            <CardDescription>
              <DataTable columns={columns} data={data} />
            </CardDescription>
          </CardHeader>
        </Card>
      </TabsContent>
      <TabsContent value="progress">
        <Card>
          <CardHeader>
            <CardTitle>In Progress</CardTitle>
            <CardDescription>
              <DataTable columns={columns} data={data} />
            </CardDescription>
          </CardHeader>
        </Card>
      </TabsContent>
      <TabsContent value="done">
        <Card>
          <CardHeader>
            <CardTitle>Done</CardTitle>
            <CardDescription>
              <DataTable columns={columns} data={data} />
            </CardDescription>
          </CardHeader>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
