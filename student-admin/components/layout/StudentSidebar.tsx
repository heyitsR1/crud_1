import React from 'react'

import { Logs, Home, Inbox, Search, Settings, FileText, School, Files} from "lucide-react"
import Image from 'next/image';


import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const items = [
  {
    title: "Home",
    url: "/students",
    icon: Home,
  },
  {
    title: "Records",
    url: "/students",
    icon: FileText,
  },
  {
    title: "Logs",
    url: "#",
    icon: Logs,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
]

export function StudentSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
          <SidebarGroup>
          <SidebarGroupLabel> <Image className="mt-20" src='/images/str.png' alt="Student Record PNG"       width={50} height={50}></Image> </SidebarGroupLabel>
          <SidebarGroupContent></SidebarGroupContent>
          </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel> <div className='m-20 font-bold'> Student Management Portal</div></SidebarGroupLabel>
          <SidebarGroupContent className='mt-10'>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

