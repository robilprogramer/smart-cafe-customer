// FILE: LoginForm.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// 💡 Tambahkan interface untuk props (termasuk callback)
interface LoginFormProps {
    onLoginSuccess?: () => void;
}

interface User {
    name: string;
    email: string;
    password: string;
    role: string;
}

// 💡 Terima props di komponen
export default function LoginForm({ onLoginSuccess }: LoginFormProps) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();

        const storedUsers = localStorage.getItem("users");
        const users: User[] = storedUsers ? JSON.parse(storedUsers) : [];

        const user = users.find(
            (u) => u.email === email && u.password === password
        );

        if (!user) {
            alert("Email atau password salah!");
            return;
        }

        localStorage.setItem("currentUser", JSON.stringify(user));

        alert(`Selamat datang, ${user.name}!`);

        // 💡 Panggil callback untuk menutup modal di Header
        onLoginSuccess && onLoginSuccess(); 

        // ✅ Redirect berdasarkan role
        if (user.role === "admin") {
            router.push("/admin"); 
        } else if (user.role === "superadmin") {
            router.push("/admin"); 
        } else {
            router.push("/");
        }

        setEmail("");
        setPassword("");
    };

    return (
        <form onSubmit={handleLogin} className="space-y-4">
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
                Masuk
            </Button>
        </form>
    );
}