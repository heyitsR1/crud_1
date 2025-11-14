"use client"

import Link from "next/link"

import React from 'react'
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "../ui/navigation-menu"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import fetchUserProfile from '@/lib/fetchUserProfile'
import { Button } from "../ui/button"
import UserButton from "./UserButton"

const Topbar = () => {

  return (
    <div className="flex justify-end mr-10 mt-5">
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink>
            <UserButton></UserButton>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
    </div>
  )
}

export default Topbar
