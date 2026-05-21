"use client";

import { useState } from "react";

export default function LoginPage() {

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  async function handleLogin() {

    try {

      const res = await fetch(
        "http://localhost:4000/api/users/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await res.json();

      if (res.ok) {

        localStorage.setItem(
          "token",
          data.access_token,
        );

        localStorage.setItem(
          "user",
          JSON.stringify(data.user),
        );

        window.location.href = "/dashboard";

      } else {

        alert(
          data.message || "Login failed",
        );
      }

    } catch (err) {

      console.error(err);

      alert("Server error");
    }
  }

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md space-y-4">

        <h1 className="text-3xl font-bold text-center">
          Hanexis Login
        </h1>

        <input
          placeholder="Email"
          className="w-full border p-3 rounded-lg"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 rounded-lg"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button
          onClick={handleLogin}
          className="w-full bg-black text-white p-3 rounded-lg"
        >
          Login
        </button>

        <div className="text-center text-gray-500">
          OR
        </div>

        <button
          className="w-full border p-3 rounded-lg"
        >
          Continue with Google
        </button>

        <button
          className="w-full border p-3 rounded-lg"
        >
          Continue with LinkedIn
        </button>

      </div>

    </div>
  );
}