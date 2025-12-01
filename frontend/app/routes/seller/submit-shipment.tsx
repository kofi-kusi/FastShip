import { useQuery } from "@tanstack/react-query"
import { ShipmentStatus } from "Api"
import { useContext } from "react"
import { Navigate, useNavigate } from "react-router"
import { toast } from "sonner"
import { AppSidebar } from "~/components/app-sidebar"
import ShipmentCard from "~/components/shipment-card"
import { SubmitShipmentForm } from "~/components/submit-shipment-form"
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

export default function SubmitShipmentPage() {
  const { token, user, logout } = useContext(AuthContext)
  console.log(token)
  console.log(user)

  // if (token === undefined) {
  //   return <Navigate to="/" />
  // }
  // if (user !== "seller") {
  //   return <Navigate to="/dashboard" />
  // }



  return (
    <SidebarProvider>
      <AppSidebar currentRoute="Submit Shipment" />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b">
          <div className="flex items-center gap-2 px-3">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <h2>Submit Shipment</h2>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <SubmitShipmentForm />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
 
