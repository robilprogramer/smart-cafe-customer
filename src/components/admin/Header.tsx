'use client'

import { Menu, X, Bell, Search } from "lucide-react"
import { useState, useEffect, useRef } from "react"
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

// Data menu untuk search
const menuItems = [
    { label: 'Beranda', href: '/admin', keywords: ['dashboard', 'home', 'beranda', 'utama'] },
    { label: 'Pengguna', href: '/admin/users', keywords: ['user', 'pengguna', 'member', 'akun'] },
    { label: 'Konten', href: '/admin/content', keywords: ['content', 'konten', 'artikel', 'post'] },
    { label: 'Produk', href: '/admin/products', keywords: ['product', 'produk', 'barang', 'item'] },
    { label: 'Laporan', href: '/admin/laporan', keywords: ['report', 'laporan', 'statistik', 'analytics'] },
    { label: 'Pesan', href: '/admin/pesan', keywords: ['message', 'pesan', 'chat', 'inbox'] },
    { label: 'Promo', href: '/admin/promo', keywords: ['promo', 'diskon', 'discount', 'voucher'] },
    { label: 'Pengaturan', href: '/admin/settings', keywords: ['setting', 'pengaturan', 'konfigurasi', 'config'] },
];

export default function Header({ onToggleSidebar, isSidebarOpen }: HeaderProps) {
    const [user, setUser] = useState<User | null>(null)
    const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false)
    const [isLoginMode, setIsLoginMode] = useState(true)
    const [searchQuery, setSearchQuery] = useState('')
    const [searchResults, setSearchResults] = useState<typeof menuItems>([])
    const [showSearchResults, setShowSearchResults] = useState(false)
    const searchRef = useRef<HTMLDivElement>(null)
    const router = useRouter()

    useEffect(() => {
        setUser(getCurrentUser())
    }, [])

    // Handle search
    useEffect(() => {
        if (searchQuery.trim() === '') {
            setSearchResults([])
            setShowSearchResults(false)
            return
        }

        const query = searchQuery.toLowerCase()
        const filtered = menuItems.filter(item => 
            item.label.toLowerCase().includes(query) ||
            item.keywords.some(keyword => keyword.toLowerCase().includes(query))
        )

        setSearchResults(filtered)
        setShowSearchResults(true)
    }, [searchQuery])

    // Close search results when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setShowSearchResults(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
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

    const handleSearchResultClick = (href: string) => {
        router.push(href)
        setSearchQuery('')
        setShowSearchResults(false)
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
                    {/* Search Box with Results */}
                    <div className="hidden md:block relative" ref={searchRef}>
                        <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2">
                            <Search size={18} className="text-gray-400" />
                            <input
                                type="text"
                                placeholder="Cari menu..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onFocus={() => searchQuery && setShowSearchResults(true)}
                                className="bg-transparent border-none outline-none text-sm w-48"
                            />
                        </div>

                        {/* Search Results Dropdown */}
                        {showSearchResults && (
                            <div className="absolute top-full mt-2 w-72 bg-white rounded-lg shadow-lg border border-gray-200 py-2 max-h-80 overflow-y-auto">
                                {searchResults.length > 0 ? (
                                    <>
                                        <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase">
                                            Hasil Pencarian ({searchResults.length})
                                        </div>
                                        {searchResults.map((item, index) => (
                                            <button
                                                key={index}
                                                onClick={() => handleSearchResultClick(item.href)}
                                                className="w-full px-4 py-3 hover:bg-gray-50 transition-colors text-left flex items-center gap-3"
                                            >
                                                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                                    <Search size={16} className="text-blue-600" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-gray-900">{item.label}</p>
                                                    <p className="text-xs text-gray-500">{item.href}</p>
                                                </div>
                                            </button>
                                        ))}
                                    </>
                                ) : (
                                    <div className="px-4 py-8 text-center">
                                        <Search size={32} className="text-gray-300 mx-auto mb-2" />
                                        <p className="text-sm text-gray-500">Tidak ada hasil ditemukan</p>
                                        <p className="text-xs text-gray-400 mt-1">Coba kata kunci lain</p>
                                    </div>
                                )}
                            </div>
                        )}
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