"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import TitleComponent from "../components/shared/TitleComponent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "@/lib/api";
import { ShineBorder } from "@/components/ui/shine-border";

export default function Home() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await login(username, password);
      router.push("/students");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="text-7xl font-bold text-center mb-10">
        <TitleComponent />
      </div>
      <div className="mt-10 relative w-full max-w-sm space-y-4 rounded-lg">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm space-y-4 rounded-lg bg-white p-6 shadow-md"
        // className="mt-10"
      >
        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            placeholder="Enter your username"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        <Button
          type="submit"
          variant="default"
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? "Signing in..." : "Sign In"}
        </Button>
        {error && <p className="text-sm text-red-500">{error}</p>}   
        <ShineBorder shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} />
      </form>
        </div>
    </div>
  );
}
