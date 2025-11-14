"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authenticatedFetch } from "@/lib/api";
import { z } from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

  const formSchema = z.object({
    username: z.string().min(2,{
      
      message: "Username must be at least 2 characters.",
    }).max(50, {
      
      message: "Username must be at least 2 characters.",
    }

    )
  })

const StudentForm = () => {
   const form_2 = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  })
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    grade: "",
    course: "",
    contact: "",
    email: "",
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }


  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await authenticatedFetch("/students", {
        method: "POST",
        body: JSON.stringify({ ...form, grade: parseFloat(form.grade) }),
      });
      if (!res.ok) {
        throw new Error(`Request failed: ${res.status}`);
      }
      const data = await res.json();
      console.log("Student created: ", data);
      router.refresh();
      router.push("/students");
    } catch (err) {
      console.error("Error submitting form", err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="w-full px-20">
      <br/>
      <Form {...form_2}>
      <form onSubmit={submitHandler} className="w-full flex flex-col gap-4">
      {/* <form onSubmit={form_2.handleSubmit(onSubmit)} className="space-y-8 w-full flex flex-col gap-4"> */}
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
        <Button className="font-bold" variant="default" type="submit">
          Create user
        </Button>
      </form>
      </Form>
    </div>
  );
};

export default StudentForm;