
import { Button } from '@/components/ui/button'
import Link from 'next/link'
const CreateButtonComponent = () => {
  return (
    <div>
      <Button asChild variant='default'><Link href = "/students/create">Create Record</Link></Button>
    </div>
  )
}

export default CreateButtonComponent
