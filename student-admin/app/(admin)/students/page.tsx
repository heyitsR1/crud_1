"use client";

import { useEffect, useState } from "react";
import CreateButtonComponent from "@/components/shared/CreateButton";
import StudentsTable from "@/components/students/StudentsTable";
import type { Student } from "@/lib/types";
import { authenticatedFetch } from "@/lib/api";
import fetchUserProfile from "@/lib/fetchUserProfile";

export default function StudentPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user,setUser] = useState< {roles?: string[]}|null> (null)

  useEffect(()=>{
    const loadUser = async() => {
      try { 
        const userData = await fetchUserProfile()
        setUser(userData)
      }
      catch (err) { 
        console.error (`${err}: Error while loading user`)
      }
    }
    loadUser();
  },[])

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await authenticatedFetch("/students");

        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          const message =
            typeof body === "object" && body !== null && "message" in body
              ? (body as { message?: string }).message
              : undefined;
          throw new Error(message ?? "Failed to fetch students");
        }

        const data: Student[] = await res.json();
        setStudents(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch students");
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  if (loading == null) {
    return <div className="p-8">Loading data...</div>;
  }
  if (user == null) {
    return <div className="p-8">User not Loading...</div>;
  }

  if (error) {
    return <div className="p-8 text-red-500">Error: {error}</div>;
  }
  const userRole = user.roles?.[0];
  return (
    <div >
      <div className="flex justify-end mb-4 mr-4">
        {
          userRole == "admin" && <CreateButtonComponent /> 
        }
        </div>
      <div className="m-15">
      <StudentsTable students={students} role = {userRole} />
      </div>
    </div>
  );
}