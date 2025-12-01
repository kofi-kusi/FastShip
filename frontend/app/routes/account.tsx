import { useQuery } from "@tanstack/react-query"
import { ShipmentStatus } from "Api"
import { useContext } from "react"
import { Navigate, useNavigate } from "react-router"
import { toast } from "sonner"
import { AppSidebar } from "~/components/app-sidebar"
import ShipmentCard from "~/components/shipment-card"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { Separator } from "~/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "~/components/ui/sidebar"
import { AuthContext } from "~/contexts/AuthContext"
import api from "~/lib/api"
import { getShipmentsCountForStatus } from "~/lib/utils"

export default function AccountPage() {
  const { token, user, logout } = useContext(AuthContext)

  if (!token) {
    return <Navigate to="/" />
  }

  const {isLoading, isError, data} = useQuery({
    queryKey: ["account"],
    queryFn: async () => {
      const getUserProfile = user === "seller" ? api.seller : api.partner
      const { data } = await getUserProfile.me()
      return data
    }
  })

  if (isError) {
    toast.error("Error loading account details")
    return
  }



  return (
    <SidebarProvider>
      <AppSidebar currentRoute="Account" />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b">
          <div className="flex items-center gap-2 px-3">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <h2>Account</h2>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          {
              isLoading ? <h1>Loading ...</h1> : (
                <div className="flex flex-col gap-2 max-w-[400px]">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" value={data?.name} readOnly/>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" value={data?.email} readOnly/>
                  <Button onClick={logout}>Log out</Button>
                </div>
              )
            }
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
 
