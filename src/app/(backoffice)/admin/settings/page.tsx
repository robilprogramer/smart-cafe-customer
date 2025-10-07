"use client";

import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState("general");

    // State untuk masing-masing tab (simulasi, sesuaikan dengan backend)
    const [generalSettings, setGeneralSettings] = useState({
        appName: "My Application",
        language: "id",
        timezone: "Asia/Jakarta",
    });

    const [notifications, setNotifications] = useState({
        emailNotifications: true,
        pushNotifications: false,
    });

    const [securitySettings, setSecuritySettings] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    // Generic input handler
    function handleInputChange<T>(setter: React.Dispatch<React.SetStateAction<T>>) {
        return (
            e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
        ) => {
            const { name, value, type } = e.target;

            setter((prev) => ({
                ...prev,
                [name]: type === "checkbox" && "checked" in e.target
                    ? (e.target as HTMLInputElement).checked
                    : value,
            }));
        };
    }



    // Simulasi save function (ganti dengan API call sebenarnya)
    const handleSave = (tab: string) => {
        alert(`Pengaturan ${tab} berhasil disimpan!`);
    };

    return (
        <ProtectedRoute>
            <AdminLayout>
                <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow">
                    <h1 className="text-3xl font-bold mb-6">Pengaturan Aplikasi</h1>

                    {/* Tab Navigation */}
                    <nav className="flex border-b border-gray-300 mb-8 space-x-8">
                        {["general", "notifications", "security"].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`pb-3 border-b-4 font-semibold text-lg transition-colors ${activeTab === tab
                                        ? "border-blue-600 text-blue-600"
                                        : "border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300"
                                    }`}
                            >
                                {tab === "general"
                                    ? "Umum"
                                    : tab === "notifications"
                                        ? "Notifikasi"
                                        : "Keamanan"}
                            </button>
                        ))}
                    </nav>

                    {/* Tab Content */}
                    <section>
                        {activeTab === "general" && (
                            <GeneralSettingsTab
                                data={generalSettings}
                                onChange={handleInputChange(setGeneralSettings)}
                                onSave={() => handleSave("Umum")}
                            />
                        )}

                        {activeTab === "notifications" && (
                            <NotificationsTab
                                data={notifications}
                                onChange={handleInputChange(setNotifications)}
                                onSave={() => handleSave("Notifikasi")}
                            />
                        )}

                        {activeTab === "security" && (
                            <SecurityTab
                                data={securitySettings}
                                onChange={handleInputChange(setSecuritySettings)}
                                onSave={() => {
                                    if (securitySettings.newPassword !== securitySettings.confirmPassword) {
                                        alert("Password baru dan konfirmasi tidak cocok!");
                                        return;
                                    }
                                    handleSave("Keamanan");
                                }}
                            />
                        )}
                    </section>
                </div>
            </AdminLayout>
        </ProtectedRoute>
    );
}

function GeneralSettingsTab({
    data,
    onChange,
    onSave,
}: {
    data: { appName: string; language: string; timezone: string };
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    onSave: () => void;
}) {

    return (
        <form onSubmit={(e) => { e.preventDefault(); onSave(); }} className="space-y-6 max-w-lg">
            <div>
                <label className="block mb-1 font-medium text-gray-700">Nama Aplikasi</label>
                <Input
                    type="text"
                    name="appName"
                    value={data.appName}
                    onChange={onChange}
                    placeholder="Nama aplikasi"
                    required
                />
            </div>

            <div>
                <label className="block mb-1 font-medium text-gray-700">Bahasa</label>
                <select
                    name="language"
                    value={data.language}
                    onChange={onChange}
                    className="w-full rounded-md border-gray-300 shadow-sm p-2"
                    required
                >
                    <option value="id">Indonesia</option>
                    <option value="en">English</option>
                    <option value="es">Español</option>
                </select>
            </div>

            <div>
                <label className="block mb-1 font-medium text-gray-700">Zona Waktu</label>
                <select
                    name="timezone"
                    value={data.timezone}
                    onChange={onChange}
                    className="w-full rounded-md border-gray-300 shadow-sm p-2"
                    required
                >
                    <option value="Asia/Jakarta">Asia/Jakarta</option>
                    <option value="Asia/Makassar">Asia/Makassar</option>
                    <option value="Asia/Jayapura">Asia/Jayapura</option>
                    <option value="UTC">UTC</option>
                </select>
            </div>

            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                Simpan Pengaturan Umum
            </Button>
        </form>
    );
}

function NotificationsTab({
    data,
    onChange,
    onSave,
}: {
    data: { emailNotifications: boolean; pushNotifications: boolean };
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // karena hanya checkbox
    onSave: () => void;
}) {

    return (
        <form onSubmit={(e) => { e.preventDefault(); onSave(); }} className="space-y-6 max-w-lg">
            <div className="flex items-center space-x-3">
                <input
                    id="emailNotifications"
                    name="emailNotifications"
                    type="checkbox"
                    checked={data.emailNotifications}
                    onChange={onChange}
                    className="h-5 w-5 text-blue-600 border-gray-300 rounded"
                />
                <label htmlFor="emailNotifications" className="font-medium text-gray-700">
                    Notifikasi Email
                </label>
            </div>

            <div className="flex items-center space-x-3">
                <input
                    id="pushNotifications"
                    name="pushNotifications"
                    type="checkbox"
                    checked={data.pushNotifications}
                    onChange={onChange}
                    className="h-5 w-5 text-blue-600 border-gray-300 rounded"
                />
                <label htmlFor="pushNotifications" className="font-medium text-gray-700">
                    Notifikasi Push
                </label>
            </div>

            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                Simpan Pengaturan Notifikasi
            </Button>
        </form>
    );
}

function SecurityTab({
    data,
    onChange,
    onSave,
}: {
    data: { currentPassword: string; newPassword: string; confirmPassword: string };
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSave: () => void;
}) {

    const passwordsMatch = data.newPassword === data.confirmPassword;

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                if (!passwordsMatch) {
                    alert("Password baru dan konfirmasi tidak cocok!");
                    return;
                }
                onSave();
            }}
            className="space-y-6 max-w-lg"
        >
            <div>
                <label className="block mb-1 font-medium text-gray-700">Password Saat Ini</label>
                <Input
                    type="password"
                    name="currentPassword"
                    value={data.currentPassword}
                    onChange={onChange}
                    placeholder="Masukkan password saat ini"
                    required
                />
            </div>

            <div>
                <label className="block mb-1 font-medium text-gray-700">Password Baru</label>
                <Input
                    type="password"
                    name="newPassword"
                    value={data.newPassword}
                    onChange={onChange}
                    placeholder="Masukkan password baru"
                    required
                />
            </div>

            <div>
                <label className="block mb-1 font-medium text-gray-700">Konfirmasi Password Baru</label>
                <Input
                    type="password"
                    name="confirmPassword"
                    value={data.confirmPassword}
                    onChange={onChange}
                    placeholder="Konfirmasi password baru"
                    required
                />
            </div>

            {!passwordsMatch && (
                <p className="text-red-600 text-sm">Password baru dan konfirmasi tidak cocok.</p>
            )}

            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                Simpan Pengaturan Keamanan
            </Button>
        </form>
    );
}
