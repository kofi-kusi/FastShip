import { useQuery } from "@tanstack/react-query"
import { useContext } from "react"
import { Navigate } from "react-router"
import { toast } from "sonner"
import { AppSidebar } from "~/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb"
import { Separator } from "~/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "~/components/ui/sidebar"
import { AuthContext } from "~/contexts/AuthContext"
import api from "~/lib/api"

export default function DashboardPage() {
  const { token } = useContext(AuthContext)

  if (!token) {
    return <Navigate to="/login" />
  }

  const {isLoading, isError, data} = useQuery({
    queryKey: ["shipments"],
    queryFn: async () => {
      const data = await api.seller.getShipments()
      return data
    }
  })

  if (isError) {
    toast.error("Failed getting shipments")
  }



  return (
    <SidebarProvider>
      <AppSidebar currentRoute="Dashboard" />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b">
          <div className="flex items-center gap-2 px-3">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-2 h-4" />
            
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          {
              isLoading || !data ? <h1>Loading ...</h1> : (
                <div className="flex flex-1 flex-col gap-4 p-4">
                  <div className="grid auto-rows-min gap-4 md:grid-cols-4">
                    <NumberLabel value={data.data.length} label="Total Shipments" />
                    <NumberLabel value={100} label="Placed" />
                    <NumberLabel value={100} label="In transit" />
                    <NumberLabel value={100} label="Delivered" />
                  </div>
                  <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
                </div>
              )
            }
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

function NumberLabel({ value, label} : { value: number, label: string}) {
  return (
    <div className="flex flex-col gap-2 rounded-xl border border-gray-200 p-4">
      <h1 className="text-4xl font-bold">{value}</h1>
      <p className="text-gray-500">{label}</p>
    </div>
  )
}
