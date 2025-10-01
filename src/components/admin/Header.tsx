'use client'

import { Menu, X, Bell, Search } from "lucide-react"
import { useState, useEffect } from "react"
import { getCurrentUser, logoutUser, User } from "@/lib/auth"
import { useRouter } from "next/navigation"

// Shadcn Dialog
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import LoginForm from "@/components/auth/LoginForm"
import RegisterForm from "@/components/auth/RegisterForm"

interface HeaderProps {
    onToggleSidebar: () => void
    isSidebarOpen: boolean
}

export default function Header({ onToggleSidebar, isSidebarOpen }: HeaderProps) {
    const [user, setUser] = useState<User | null>(null)
    const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false)
    const [isLoginMode, setIsLoginMode] = useState(true) // switch antara login & register
    const router = useRouter()

    useEffect(() => {
        setUser(getCurrentUser())
    }, [])

    const handleLogout = () => {
        logoutUser()
        setUser(null)
        router.push("/admin")
    }

    const handleLoginSuccess = () => {
        setUser(getCurrentUser())
        setIsAuthDialogOpen(false)
    }

    return (
        <header className="bg-white shadow-md fixed top-0 left-0 right-0 z-30 h-16">
            <div className="flex items-center justify-between h-full px-4">
                <div className="flex items-center gap-4">
                    <button
                        onClick={onToggleSidebar}
                        className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                        aria-label="Toggle Sidebar"
                    >
                        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                    <h1 className="text-xl font-bold text-gray-800">Admin Dashboard</h1>
                </div>

                <div className="flex items-center gap-4">
                    <div className="hidden md:flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2">
                        <Search size={18} className="text-gray-400" />
                        <input
                            type="text"
                            placeholder="Cari..."
                            className="bg-transparent border-none outline-none text-sm w-48"
                        />
                    </div>

                    <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative">
                        <Bell size={20} className="text-gray-600" />
                        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                    </button>

                    {user ? (
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
                                {user.name.charAt(0)}
                            </div>
                            <div className="hidden md:block text-sm">
                                <p className="font-medium text-gray-800">{user.name}</p>
                                <p className="text-gray-500 text-xs">{user.email}</p>
                            </div>
                            {/* <button
                                onClick={handleLogout}
                                className="px-3 py-1 text-sm rounded-md bg-red-500 text-white hover:bg-red-600"
                            >
                                Logout
                            </button> */}
                        </div>
                    ) : (
                        <>
                            {/* Dialog Login/Register dengan switch */}
                            <Dialog open={isAuthDialogOpen} onOpenChange={setIsAuthDialogOpen}>
                                <DialogTrigger asChild>
                                    <Button variant="default">Sign In / Sign Up</Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-md rounded-xl shadow-lg">
                                    <DialogHeader>
                                        <DialogTitle className="text-xl font-bold text-center">
                                            {isLoginMode ? "Login ke Dashboard" : "Buat Akun Baru"}
                                        </DialogTitle>
                                    </DialogHeader>

                                    {/* Switch antara Login / Register */}
                                    <div className="flex justify-center mb-4 gap-2">
                                        <Button
                                            variant={isLoginMode ? "default" : "outline"}
                                            onClick={() => setIsLoginMode(true)}
                                        >
                                            Login
                                        </Button>
                                        <Button
                                            variant={!isLoginMode ? "default" : "outline"}
                                            onClick={() => setIsLoginMode(false)}
                                        >
                                            Register
                                        </Button>
                                    </div>

                                    {/* Form */}
                                    {isLoginMode ? (
                                        <LoginForm onLoginSuccess={handleLoginSuccess} />
                                    ) : (
                                        <RegisterForm />
                                    )}

                                    <DialogFooter className="mt-2">
                                        <Button variant="secondary" onClick={() => setIsAuthDialogOpen(false)}>Tutup</Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </>
                    )}
                </div>
            </div>
        </header>
    )
}
