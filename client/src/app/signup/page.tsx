"use client";
import FormBtn from "@/components/FromBtn";
import Input from "@/components/Input";
import { User } from "@/utils/type";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Spinner from "@/components/Spinner";

export default function SignUpPage() {
  const [user, setUser] = useState<User>({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [loading, setLoading] = useState<Boolean>(false);

  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    try {
      event.preventDefault();
      setLoading(true);
      let response = await axios.post("/api/users/signup", user);

      if (response.data.success) {
        router.push("/login");
      } else {
        toast.error(response.data.error);
      }
    } catch (error: any) {
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
        <h1 className="font-bold text-2xl text-center">SignUp</h1>
        <Input
          type="text"
          field="name"
          placeholder="Name"
          setInput={setUser}
          input={user.name!}
        />
        <Input
          type="email"
          field="email"
          placeholder="Email"
          input={user.email}
          setInput={setUser}
        />
        <Input
          type="number"
          field="phone"
          placeholder="Phone"
          input={user.phone!}
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
          <Link href="/login">Alredy have an account</Link>
        </div>
      </form>
    </div>
  );
}