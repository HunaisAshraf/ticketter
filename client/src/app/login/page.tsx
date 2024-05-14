"use client";
import FormBtn from "@/components/FromBtn";
import Input from "@/components/Input";
import { User } from "@/utils/type";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Spinner from "@/components/Spinner";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [user, setUser] = useState<User>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    try {
      event.preventDefault();
      setLoading(true);
      const { data } = await axios.post("/api/users/login", user);
      console.log(data)

      if (data.success) {
        router.push("/");
      } else {
        toast.error(data.message);
      }
    } catch (error:any) {
      console.log(error);
      toast.error(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <Toaster />
      <form className="border-2 rounded-md p-6" onSubmit={handleSubmit}>
        <h1 className="font-bold text-2xl text-center">Login</h1>
        <Input
          type="email"
          field="email"
          placeholder="Email"
          input={user.email}
          setInput={setUser}
        />
        <Input
          type="password"
          field="password"
          placeholder="Password"
          input={user.password}
          setInput={setUser}
        />
        {loading ? (
          <div className="text-center">
            <Spinner />
          </div>
        ) : (
          <FormBtn title="Submit" />
        )}
        <div className="text-center my-3">
          <Link href="/signup">Create an account</Link>
        </div>
      </form>
    </div>
  );
}