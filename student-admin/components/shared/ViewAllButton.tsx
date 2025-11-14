import { Button } from '@/components/ui/button'
import Link from 'next/link'

const ViewAllButtonComponent = () => {
  return (
    <div>
      <Button asChild variant="outline"><Link href = "/students">View Records</Link></Button>
    </div>
  )
}

export default ViewAllButtonComponent
