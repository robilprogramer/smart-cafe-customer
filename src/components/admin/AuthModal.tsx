"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { loginUser, registerUser } from "@/lib/auth"

export default function AuthModal() {
  const [isLogin, setIsLogin] = useState(true) // toggle login/register
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("Admin")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    const user = loginUser(email, password)
    if (user) {
      alert("Login berhasil!")
      window.location.reload()
    } else {
      alert("Email atau password salah!")
    }
  }

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    registerUser({ name, email, password, role })
    alert("Registrasi berhasil!")
    window.location.reload()
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">{isLogin ? "Sign In" : "Sign Up"}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{isLogin ? "Login" : "Register"}</DialogTitle>
        </DialogHeader>

        {isLogin ? (
          <form onSubmit={handleLogin} className="space-y-3">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button type="submit" className="w-full">Login</Button>
          </form>
        ) : (
          <form onSubmit={handleRegister} className="space-y-3">
            <Input
              type="text"
              placeholder="Nama"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full border rounded-md px-3 py-2"
            >
              <option value="Admin">Admin</option>
              <option value="Kasir">Kasir</option>
              <option value="Pelayan">Pelayan</option>
            </select>
            <Button type="submit" className="w-full bg-green-600">Register</Button>
          </form>
        )}

        <div className="text-sm text-center mt-2">
          {isLogin ? (
            <p>
              Belum punya akun?{" "}
              <button onClick={() => setIsLogin(false)} className="text-blue-600 hover:underline">
                Register
              </button>
            </p>
          ) : (
            <p>
              Sudah punya akun?{" "}
              <button onClick={() => setIsLogin(true)} className="text-blue-600 hover:underline">
                Login
              </button>
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
