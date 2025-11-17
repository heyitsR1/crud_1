'use client'
import { useSearchParams } from "next/navigation";

export default function ErrorPage () {
const params = useSearchParams();
  const code = params.get("code");
  const message = params.get("message"); 
    return ( 
        <div className="flex items-center justify-center gap-5 h-screen w-full"> 
            <div>
                <div className="text-7xl text-center">{code}</div>
            <div className="text-3xl">{message}</div>
            </div>
            
        </div>
    )
}