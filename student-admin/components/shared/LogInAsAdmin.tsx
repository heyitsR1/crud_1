
import { Button } from '@/components/ui/button'
import Link from 'next/link'


const handleLogin = (role: string) => {
    localStorage.setItem("role", role);
    window.location.href = "/students";
  };
  
const CreateButtonComponent = () => {
  return (
    <div>
      <Button asChild variant='default' onClick={()=>handleLogin("admin")}><Link href = "/students/create">Log In As Admin</Link></Button>
    </div>
  )
}

export default CreateButtonComponent
