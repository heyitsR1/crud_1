"use client";
import React, { useState,useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export type Student = {
  id: string;
  name: string;
  grade: string;
  course: string;
  contact: string;
  email: string;
};

interface ViewStudentInfoProps {
  student: Student;
}

const ViewStudentInfo = ({ student }: ViewStudentInfoProps) => {
  const router = useRouter();

  const [form, setForm] = useState({
    id: student.id || "",
    name: student.name || "",
    grade: student.grade || "",
    course: student.course || "",
    contact: student.contact || "",
    email: student.email || "",
  });

    useEffect(() => {
    if (student) {
        setForm({
        id: student.id?.toString() || "",
        name: student.name || "",
        grade: student.grade?.toString() || "",
        course: student.course || "",
        contact: student.contact || "",
        email: student.email || "",
        });
    }
    }, [student]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:3000/students/${Number.parseInt(form.id, 10)}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          grade: Number.parseFloat(form.grade),
          contact: form.contact,
          course: form.course,
          email: form.email,
        }),
      });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      const data = await res.json();
      console.log("Student updated:", data);
      router.refresh();
      router.push("/students");
    } catch (err) {
      console.error("Error updating form", err);
    }
  };

  const deleteHandler = async (e: React.MouseEvent) => { 
    e.preventDefault(); 
    try { 
        const res = await fetch(`http://localhost:3000/students/${Number.parseInt(form.id, 10)}`, {
        method: "DELETE"
    })
    if (!res.ok) throw new Error(`Request failed: ${res.status}`);
    console.log("Student deleted:", form.id);
    router.refresh();
    router.push("/students");

  } catch (err) {
      console.error("Error updating form", err);
    }}

  return (
    <form onSubmit={submitHandler}>
      <input
        type="text"
        placeholder="name"
        name="name"
        value={form.name}
        onChange={handleChange}
      />
      <input
        type="number"
        placeholder="grade"
        name="grade"
        value={form.grade}
        onChange={handleChange}
      />
      <input
        type="tel"
        placeholder="contact"
        name="contact"
        value={form.contact}
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="course"
        name="course"
        value={form.course}
        onChange={handleChange}
      />
      <input
        type="email"
        placeholder="email"
        name="email"
        value={form.email}
        onChange={handleChange}
      />
      <Button variant = "ghost" type="submit">Update</Button>
    <Button variant="destructive"onClick ={deleteHandler}>  Delete </Button>
      
    </form>
  );
};

export default ViewStudentInfo;
