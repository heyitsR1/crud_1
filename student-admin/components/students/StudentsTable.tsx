import React from 'react'; 
import Link from 'next/link'
import type { Student } from '@/lib/types';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from '@/components/ui/button';
import { resolveSoa } from 'dns/promises';

interface StudentTableProps { 
    students: Student[],
    role?:string,
}

const StudentsTable = ({ students,role }: StudentTableProps) => {
  return (
    <Table> 
         <TableCaption>Student Records</TableCaption>
        <TableHeader>
        <TableRow>
            <TableHead>
                ID
            </TableHead>
            <TableHead>
                Name
            </TableHead>
            <TableHead>
                Grade
            </TableHead>
            <TableHead>
                Contact
            </TableHead>
            <TableHead>
                Course
            </TableHead>
            <TableHead>
                Email
            </TableHead>
        </TableRow>
        </TableHeader>
        <TableBody> 
            {students.map((student)=> (
            <TableRow key={student.id}>
                <TableCell>{student.id}</TableCell>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.grade}</TableCell>
                <TableCell>{student.contact}</TableCell>
                <TableCell>{student.course}</TableCell>
                <TableCell>{student.email}</TableCell>
                {role==="admin" && (
                    <TableCell> <Button asChild variant="link"><Link href = {`/students/${student.id}`}>Edit</Link></Button> </TableCell>
                )
                }
            </TableRow>

            ))}

        </TableBody>
    </Table>
  )
}

export default StudentsTable;