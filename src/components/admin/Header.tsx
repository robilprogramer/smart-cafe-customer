"use client"

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
    DialogTrigger,
} from "@/components/ui/dialog"

import LoginForm from "@/components/auth/LoginForm" // Ganti jalur sesuai lokasi aslinya
import RegisterForm from "@/components/auth/RegisterForm" // Ganti jalur sesuai lokasi aslinya

interface HeaderProps {
    onToggleSidebar: () => void
    isSidebarOpen: boolean
}

export default function Header({ onToggleSidebar, isSidebarOpen }: HeaderProps) {
    const [user, setUser] = useState<User | null>(null)
    // 💡 1. Tambahkan state untuk mengontrol modal login
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
    const router = useRouter()

    useEffect(() => {
        setUser(getCurrentUser())
    }, [])

    const handleLogout = () => {
        logoutUser()
        setUser(null)
        // ✅ Logout diarahkan ke /admin
        router.push("/admin")
    }

    // 💡 2. Tambahkan fungsi callback untuk dipanggil dari LoginForm
    const handleLoginSuccess = () => {
        // Memperbarui user state agar Header menampilkan profil
        setUser(getCurrentUser()); 
        // Menutup modal login
        setIsLoginModalOpen(false); 
    };

    return (
        <header className="bg-white shadow-md fixed top-0 left-0 right-0 z-30 h-16">
            <div className="flex items-center justify-between h-full px-4">
                {/* Sidebar Toggle */}
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

                {/* Right Side */}
                <div className="flex items-center gap-4">
                    {/* Search */}
                    <div className="hidden md:flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2">
                        <Search size={18} className="text-gray-400" />
                        <input
                            type="text"
                            placeholder="Cari..."
                            className="bg-transparent border-none outline-none text-sm w-48"
                        />
                    </div>

                    {/* Notification */}
                    <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative">
                        <Bell size={20} className="text-gray-600" />
                        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                    </button>

                    {/* User Profile / Auth */}
                    {user ? (
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
                                {user.name.charAt(0)}
                            </div>
                            <div className="hidden md:block text-sm">
                                <p className="font-medium text-gray-800">{user.name}</p>
                                <p className="text-gray-500 text-xs">{user.email}</p>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="px-3 py-1 text-sm rounded-md bg-red-500 text-white hover:bg-red-600"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <div className="flex gap-2">
                            {/* Sign In Modal */}
                            {/* 💡 Gunakan 'open' dan 'onOpenChange' untuk mengontrol state modal */}
                            <Dialog open={isLoginModalOpen} onOpenChange={setIsLoginModalOpen}>
                                <DialogTrigger asChild>
                                    <button className="px-3 py-1 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700">
                                        Sign In
                                    </button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-md rounded-xl shadow-lg">
                                    <DialogHeader>
                                        <DialogTitle className="text-xl font-bold text-center">Login ke Dashboard</DialogTitle>
                                    </DialogHeader>
                                    {/* 💡 Teruskan callback ke LoginForm */}
                                    <LoginForm onLoginSuccess={handleLoginSuccess} />
                                </DialogContent>
                            </Dialog>

                            {/* Sign Up Modal */}
                            <Dialog>
                                <DialogTrigger asChild>
                                    <button className="px-3 py-1 text-sm rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300">
                                        Sign Up
                                    </button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-md rounded-xl shadow-lg">
                                    <DialogHeader>
                                        <DialogTitle className="text-xl font-bold text-center">Buat Akun Baru</DialogTitle>
                                    </DialogHeader>
                                    <RegisterForm />
                                </DialogContent>
                            </Dialog>
                        </div>
                    )}
                </div>
            </div>
        </header>
    )
}