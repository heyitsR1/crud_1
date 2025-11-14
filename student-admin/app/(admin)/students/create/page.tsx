import CreateStudentForm from '../../../../components/students/CreateStudentForm'
export default async function CreateStudentPage() { 
  return (
  <div className='mt-50 flex flex-column justify-center bg-gray-100 p-4'> 
    <p className='mt-10 mr-10 text-7xl font-bold '> New Student</p>
    <CreateStudentForm/> 
  </div>
  )
}