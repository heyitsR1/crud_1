import "../../app/globals.css";
import {StudentSidebar} from "@/components/layout/StudentSidebar"
import Topbar from "@/components/layout/Topbar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <div className="bg-gray-100">
        <Topbar></Topbar>
        <SidebarProvider>
          <StudentSidebar />
          <main className="flex-1 w-full">
            <SidebarTrigger />
            {children}
          </main>
        </SidebarProvider>
      </div>
  )
}