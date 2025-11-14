// app/students/[id]/page.tsx
import ViewStudentInfo from "@/components/students/ViewStudentInfo";
import { serverAuthenticatedFetch } from "@/lib/api";
import { cookies } from "next/headers";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function StudentViewPage({ params }: PageProps) {
  const { id: idParam } = await params;
  const id = Number.parseInt(idParam, 10);

  if (Number.isNaN(id)) {
    return <h4>Invalid student id</h4>;
  }

  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  const res = await serverAuthenticatedFetch(
    `/students/${id}`,
    cookieHeader,
    {
      method: "GET",
      cache: "no-store",
    }
  );

  if (!res.ok) {
    return <h4>Error loading student: {res.status}</h4>;
  }

  const student = await res.json();

  if (!student) return <h4>404 Not Found</h4>;

  return (
    <div className='mt-50 flex flex-column justify-center bg-gray-100 p-4'> 
      <p className='mt-10 mr-10 text-7xl font-bold '> Update Student</p>
      <ViewStudentInfo student={student} />
    </div>
  );
}
