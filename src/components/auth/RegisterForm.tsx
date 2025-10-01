"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface User {
  name: string;
  email: string;
  password: string;
  role: string;
}

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role] = useState("user"); // default role

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    const storedUsers = localStorage.getItem("users");
    const users: User[] = storedUsers ? JSON.parse(storedUsers) : [];

    if (users.some((u) => u.email === email)) {
      alert("Email sudah terdaftar!");
      return;
    }

    const newUser: User = { name, email, password, role };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registrasi berhasil! Silakan login.");
    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <form onSubmit={handleRegister} className="space-y-4">
      <Input
        type="text"
        placeholder="Nama Lengkap"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <Input
        type="email"
        placeholder="Alamat Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Input
        type="password"
        placeholder="Kata Sandi"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <Button type="submit" className="w-full">
        Daftar
      </Button>
    </form>
  );
}
