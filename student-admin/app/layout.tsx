
import "./globals.css";
import {StudentSidebar} from "@/components/layout/StudentSidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body className="bg-gray-100">
        {/* <SidebarProvider>
          <StudentSidebar /> */}
          <main className="flex-1 w-full">
            {/* <SidebarTrigger /> */}
            {children}
          </main>
        {/*</SidebarProvider> */}
      </body>
    </html>
  )
}