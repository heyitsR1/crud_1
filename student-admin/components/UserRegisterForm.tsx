"use client";
import { Checkbox } from "@/components/ui/checkbox"
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authenticatedFetch } from "@/lib/api";
import { z } from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { isDynamicPostpone } from "next/dist/server/app-render/dynamic-rendering";
import { ShineBorder } from "./ui/shine-border";

  const formSchema = z.object({
    username: z.string().min(2,{
      message: "Username must be at least 2 characters.",
    }).max(50, {
        message: "Username must be at least 2 characters.",
    }
    ),
    password:z.string()
    .min(8, {message: "Password must be at least 8 characters.",})
    .max(20, {message: "Password cannot be longer than 20 characters"})
    .regex(/[A-Z]/,{message: "Password must have atleast one uppercase character"})
    .regex(/[0-9]/,{message: "Password must have at least one number"})
    .regex(/[\W]/,{message: "Password must have at least one special character"}),
    confirm_password:z.string(),
    isAdmin:z.boolean().optional(),
  }).refine((data)=>data.password === data.confirm_password,{
    message: "Passwords do not match",
    path:['confirm_password']
  })

const StudentForm = () => {
   const form_2 = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      confirm_password: "",
      isAdmin: false,

    },

  })
  const router = useRouter();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const user_created = {
        username: values.username,
        password: values.password,
        roles: ['user'],
    };

    if (values.isAdmin) user_created.roles.push('admin');

    try {
        const res = await authenticatedFetch("/users", {
        method: "POST",
        body: JSON.stringify(user_created),
        })
        const body = await res.json();
        if (!res.ok) {
            console.error ("Server Error: ", body.message)
            router.push(`/error?code=${body.statusCode}&message=${body.message}`);
            return
        }
        console.log("User created:", body);
        router.refresh();
        router.push("/");
    } catch (err) {
        console.error("Error submitting form:", err);
    }
    
  }

  return (
    <Form {...form_2}>    <ShineBorder borderWidth={5}  shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} />

    <form onSubmit={form_2.handleSubmit(onSubmit)} className="w-full flex flex-col gap-5"> 
    <FormField
        control={form_2.control}
        name="username"
        render={({field}) => (
        <FormItem>
            <FormLabel>Username</FormLabel>
            <FormControl>
                <Input placeholder='Enter a username'
                 {...field}/>
            </FormControl>
            <FormDescription />
            <FormMessage />
        </FormItem>
        )}
    />
    <FormField
        control={form_2.control}
        name="password"
        render={({field}) => (
        <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
                <Input type = "password" placeholder='Enter a $tronG password'
                 {...field}/>
            </FormControl>
            <FormDescription />
            <FormMessage />
        </FormItem>
        )}
    />
    <FormField
        control={form_2.control}
        name="confirm_password"
        render={({field}) => (
        <FormItem>
            <FormLabel>Confirm Password</FormLabel>
            <FormControl>
                <Input type="password" placeholder="Re-type your password"
                 {...field}/>
            </FormControl>
            <FormDescription />
            <FormMessage />
        </FormItem>
        )}
    />
    <FormField 
  control={form_2.control}
  name="isAdmin"
  render={({ field }) => (
      <FormItem>
        <div className="flex items-center gap-4">
      <FormControl>
        <Checkbox className="border-zinc-900"checked={field.value} onCheckedChange={field.onChange} />
      </FormControl>
      <FormLabel>Register as Admin</FormLabel>
  </div>
      <FormMessage />
    </FormItem>
  )}
/>

       <Button className="font-bold" variant="default" type="submit">
         Create user
        </Button>
    {/* <ShineBorder shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} /> */}
    </form>
    </Form>
    

  );
};

export default StudentForm;