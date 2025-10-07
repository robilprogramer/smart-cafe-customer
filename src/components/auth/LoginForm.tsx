import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";

interface LoginFormProps {
    onLoginSuccess?: () => void;
}

interface User {
    name: string;
    email: string;
    password: string;
    role: string;
}

export default function LoginForm({ onLoginSuccess }: LoginFormProps) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        const storedUsers = localStorage.getItem("users");
        const users: User[] = storedUsers ? JSON.parse(storedUsers) : [];

        const user = users.find(u => u.email === email && u.password === password);

        if (!user) {
            toast.error("Email atau password salah!");
            return;
        }

        localStorage.setItem("currentUser", JSON.stringify(user));

        toast.success(`Selamat datang, ${user.name}!`); // <-- switch alert

        onLoginSuccess && onLoginSuccess();

        if (user.role === "admin" || user.role === "superadmin") {
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
            <Button type="submit" className="w-full">Masuk</Button>
        </form>
    );
}
