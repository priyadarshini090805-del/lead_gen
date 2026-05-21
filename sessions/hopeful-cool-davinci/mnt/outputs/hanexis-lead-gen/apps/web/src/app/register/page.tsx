"use client";

import { useState } from "react";

export default function RegisterPage() {

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  async function handleRegister() {

    try {

      const res = await fetch(
        "http://localhost:4000/api/users/register",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            name,
            email,
            password,
          }),
        }
      );

      if (res.ok) {

        alert("Account created");

        window.location.href = "/login";

      } else {

        const err = await res.text();

        alert(err);
      }

    } catch (err) {

      console.error(err);

      alert("Registration failed");
    }
  }

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md space-y-4">

        <h1 className="text-3xl font-bold text-center">
          Create Account
        </h1>

        <input
          placeholder="Name"
          className="w-full border p-3 rounded-lg"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Email"
          className="w-full border p-3 rounded-lg"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 rounded-lg"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleRegister}
          className="w-full bg-black text-white p-3 rounded-lg"
        >
          Register
        </button>

      </div>

    </div>
  );
}