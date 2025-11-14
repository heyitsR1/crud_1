
import { Button } from '@/components/ui/button'
import Link from 'next/link'



const CreateButtonComponent = () => {
  return (
    <div>
      <Button asChild variant='outline' onClick={()=>handleLogin("user")}><Link href = "/students/create">Log In As User</Link></Button>
    </div>
  )
}

export default CreateButtonComponent
