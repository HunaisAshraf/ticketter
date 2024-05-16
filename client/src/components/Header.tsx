"use client";

// import { cookies } from "next/headers";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Header() {
  //   const user = cookies().get("token");
  const router = useRouter();

  async function handleLogout() {
    try {
      const { data } = await axios.get("/api/users/logout");

      if (data.success) {
        router.push("/login");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <header className="flex justify-between p-5">
      <h1 className="text-3xl">Ticketer</h1>
      <nav className="flex gap-2">
        <>
          <Link className="bg-blue-700 px-2 py-1 rounded-sm" href="/dashboard">
            Dashboard
          </Link>
          <Link className="bg-blue-700 px-2 py-1 rounded-sm" href="/login">
            SignIn
          </Link>
          <Link className="bg-blue-700 px-2 py-1 rounded-sm" href="/signup">
            SignUp
          </Link>
        </>
        <button
          className="bg-blue-700 px-2 py-1 rounded-sm"
          onClick={handleLogout}
        >
          Logout
        </button>
      </nav>
    </header>
  );
}
