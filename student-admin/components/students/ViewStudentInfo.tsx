"use client";
import React, { useState,useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Form } from "../ui/form";
import { Input } from "@/components/ui/input";
import type { Student } from '@/lib/types';
import { authenticatedFetch } from "@/lib/api";


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
      const res = await authenticatedFetch(`/students/${Number.parseInt(form.id, 10)}`, {
        method: "PATCH",
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
        const res = await authenticatedFetch(`/students/${Number.parseInt(form.id, 10)}`, {
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
    <div className="w-full px-20">
    <Form>
    <form onSubmit={submitHandler} className="w-full flex flex-col gap-4">
      <Input
        type="text"
        placeholder="name"
        name="name"
        value={form.name}
        onChange={handleChange}
      />
      <Input
        type="number"
        placeholder="grade"
        name="grade"
        value={form.grade}
        onChange={handleChange}
      />
      <Input
        type="tel"
        placeholder="contact"
        name="contact"
        value={form.contact}
        onChange={handleChange}
      />
      <Input
        type="text"
        placeholder="course"
        name="course"
        value={form.course}
        onChange={handleChange}
      />
      <Input
        type="email"
        placeholder="email"
        name="email"
        value={form.email}
        onChange={handleChange}
      />
      <Button variant = "default" type="submit">Update</Button>
    <Button variant="destructive"onClick ={deleteHandler}>Delete</Button>
      
    </form>
    </Form>
    </div>
  );
};

export default ViewStudentInfo;
