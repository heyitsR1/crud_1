import { useEffect, useState } from "react"
import fetchUserProfile from "@/lib/fetchUserProfile"
import { Button } from "../ui/button"
import {User} from 'lucide-react'
import  LogOut  from "@/lib/logOut"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const UserButton = () => {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      setLoading(true);
      const data = await fetchUserProfile()
      setUser(data)
      setLoading(false);
    }
    load()
    
    // Listen for storage changes (when logout clears token)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'auth_token' && !e.newValue) {
        setUser(null);
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Also check periodically if user is still authenticated
    const interval = setInterval(() => {
      const token = localStorage.getItem('auth_token');
      if (!token) {
        setUser(null);
      }
    }, 1000);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []) // Empty dependency array - only run on mount
  
  const logOutHandler = async () => {
    // Clear user state immediately
    setUser(null);
    // Call logout
    await LogOut();
  }
  
  if (loading) {
    return <div className="flex gap-4"><User></User>Loading...</div>;
  }
  
  if (!user) {
    return null; // Don't show user button if not logged in
  }
  
  return (
    <div>
      {/* <Button variant='outline'> */}
    <DropdownMenu>
    <DropdownMenuTrigger className="flex gap-4"><User></User>{user ? `${user.username} [${user.roles?.[0] || 'user'}]` : "Guest"}</DropdownMenuTrigger>
    <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem onClick={logOutHandler}>Logout</DropdownMenuItem>
    </DropdownMenuContent>
    </DropdownMenu>
      {/* </Button> */}
    </div>
  )
}

export default UserButton
