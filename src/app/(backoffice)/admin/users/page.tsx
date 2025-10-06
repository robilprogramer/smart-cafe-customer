"use client";

import { useEffect, useState, useCallback } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

interface Pengguna {
  id: number;
  nama: string;
  email: string;
  role: string;
}

interface StoredUser {
  name: string;
  email: string;
  password: string;
  role: string;
}

export default function PenggunaPage() {
  const [users, setUsers] = useState<Pengguna[]>([]);
  const [currentUserRole, setCurrentUserRole] = useState<string>("");

  // state untuk form register
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin");

  // state untuk edit
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingEmail, setEditingEmail] = useState("");

  const loadUsers = useCallback(() => {
    const storedUsers = localStorage.getItem("users");
    if (storedUsers) {
      const parsedUsers: StoredUser[] = JSON.parse(storedUsers);
      const usersWithId: Pengguna[] = parsedUsers.map((user, index) => ({
        id: index + 1,
        nama: user.name,
        email: user.email,
        role: user.role,
      }));
      setUsers(usersWithId);
    }
  }, []);

  useEffect(() => {
    loadUsers();

    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      const user = JSON.parse(currentUser);
      setCurrentUserRole(user.role);
    }
  }, [loadUsers]);

  const handleDelete = useCallback(
    (email: string, nama: string) => {
      if (currentUserRole !== "superadmin") {
        toast.error("Anda tidak memiliki akses untuk menghapus pengguna!", {
          position: "top-right",
        });
        return;
      }

      toast(
        (t) => (
          <div className="flex flex-col gap-2">
            <p>Apakah Anda yakin ingin menghapus pengguna {nama}?</p>
            <div className="flex justify-end gap-2">
              <Button size="sm" onClick={() => toast.dismiss(t.id)} variant="outline">
                Batal
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => {
                  const storedUsers = localStorage.getItem("users");
                  if (storedUsers) {
                    const parsedUsers: StoredUser[] = JSON.parse(storedUsers);
                    const filteredUsers = parsedUsers.filter(
                      (user) => user.email !== email
                    );
                    localStorage.setItem("users", JSON.stringify(filteredUsers));
                    loadUsers();
                    toast.success("Pengguna berhasil dihapus");
                    toast.dismiss(t.id);
                  }
                }}
              >
                Hapus
              </Button>
            </div>
          </div>
        ),
        { position: "top-center" }
      );
    },
    [currentUserRole, loadUsers]
  );

  const handleEdit = (user: Pengguna) => {
    if (currentUserRole !== "superadmin") {
      toast.error("Anda tidak memiliki akses untuk mengedit pengguna!");
      return;
    }

    setIsEditMode(true);
    setEditingEmail(user.email);
    setName(user.nama);
    setEmail(user.email);
    setPassword(""); // kosongkan password untuk keamanan
    setRole(user.role);
    setShowRegisterForm(true);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    const storedUsers = localStorage.getItem("users");
    let usersArray: StoredUser[] = [];
    if (storedUsers) {
      try {
        usersArray = JSON.parse(storedUsers) as StoredUser[];
      } catch (error) {
        console.error("Gagal parsing users dari localStorage:", error);
      }
    }

    if (isEditMode) {
      // Mode Edit
      const userIndex = usersArray.findIndex((user) => user.email === editingEmail);
      
      if (userIndex !== -1) {
        // Cek jika email diubah, pastikan tidak duplikat
        if (email !== editingEmail && usersArray.some((user) => user.email === email)) {
          toast.error("Email sudah digunakan!");
          return;
        }

        // Update user
        usersArray[userIndex] = {
          name,
          email,
          password: password || usersArray[userIndex].password, // jika password kosong, pakai yang lama
          role,
        };

        localStorage.setItem("users", JSON.stringify(usersArray));
        toast.success("Pengguna berhasil diperbarui");
      }
    } else {
      // Mode Tambah Baru
      // cek duplicate email
      if (usersArray.some((user) => user.email === email)) {
        toast.error("Email sudah digunakan!");
        return;
      }

      usersArray.push({
        name,
        email,
        password,
        role,
      });

      localStorage.setItem("users", JSON.stringify(usersArray));
      toast.success("Pengguna berhasil ditambahkan");
    }

    // reset form
    resetForm();
    loadUsers();
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    setRole("admin");
    setShowRegisterForm(false);
    setIsEditMode(false);
    setEditingEmail("");
  };

  return (
    <ProtectedRoute>
      <AdminLayout>
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Manajemen Pengguna</h2>
            <p className="text-gray-600 mt-1">
              Kelola data pengguna yang memiliki akses ke sistem
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Daftar Pengguna</h3>
              {currentUserRole === "superadmin" && (
                <Button 
                  onClick={() => {
                    if (showRegisterForm && isEditMode) {
                      resetForm();
                    } else {
                      setShowRegisterForm((prev) => !prev);
                      if (!showRegisterForm) {
                        setIsEditMode(false);
                      }
                    }
                  }}
                >
                  {showRegisterForm ? "Tutup Form" : "Tambah Pengguna"}
                </Button>
              )}
            </div>

            {/* Form Tambah/Edit User */}
            {showRegisterForm && currentUserRole === "superadmin" && (
              <form
                onSubmit={handleRegister}
                className="space-y-3 bg-gray-50 p-4 rounded-md mb-6 border-2 border-gray-200"
              >
                <div className="mb-2">
                  <h4 className="font-semibold text-gray-700">
                    {isEditMode ? "Edit Pengguna" : "Tambah Pengguna Baru"}
                  </h4>
                </div>
                <input
                  type="text"
                  placeholder="Nama"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full border px-3 py-2 rounded-md"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full border px-3 py-2 rounded-md"
                />
                <input
                  type="password"
                  placeholder={isEditMode ? "Password (kosongkan jika tidak ingin diubah)" : "Password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required={!isEditMode}
                  className="w-full border px-3 py-2 rounded-md"
                />
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full border rounded-md px-3 py-2"
                >
                  <option value="admin">Admin</option>
                  <option value="kasir">Kasir</option>
                  <option value="pelayan">Pelayan</option>
                  <option value="superadmin">Super Admin</option>
                </select>
                <div className="flex gap-2">
                  <Button type="submit" className="flex-1 bg-green-600">
                    {isEditMode ? "Update" : "Register"}
                  </Button>
                  {isEditMode && (
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={resetForm}
                      className="flex-1"
                    >
                      Batal
                    </Button>
                  )}
                </div>
              </form>
            )}

            {/* Tabel User */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border border-gray-200 px-4 py-2 text-left text-sm font-medium text-gray-600">ID</th>
                    <th className="border border-gray-200 px-4 py-2 text-left text-sm font-medium text-gray-600">Nama</th>
                    <th className="border border-gray-200 px-4 py-2 text-left text-sm font-medium text-gray-600">Email</th>
                    <th className="border border-gray-200 px-4 py-2 text-left text-sm font-medium text-gray-600">Role</th>
                    {currentUserRole === "superadmin" && (
                      <th className="border border-gray-200 px-4 py-2 text-center text-sm font-medium text-gray-600">Aksi</th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="border border-gray-200 px-4 py-2 text-sm">{user.id}</td>
                      <td className="border border-gray-200 px-4 py-2 text-sm">{user.nama}</td>
                      <td className="border border-gray-200 px-4 py-2 text-sm">{user.email}</td>
                      <td className="border border-gray-200 px-4 py-2 text-sm">
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                          {user.role}
                        </span>
                      </td>
                      {currentUserRole === "superadmin" && (
                        <td className="border border-gray-200 px-4 py-2">
                          <div className="flex gap-2 justify-center">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEdit(user)}
                              className="flex items-center gap-1"
                            >
                              <Pencil size={14} />
                              Edit
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleDelete(user.email, user.nama)}
                              className="flex items-center gap-1"
                            >
                              <Trash2 size={14} />
                              Hapus
                            </Button>
                          </div>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>

              {users.length === 0 && (
                <p className="text-center text-gray-500 mt-4">
                  Belum ada pengguna terdaftar.
                </p>
              )}
            </div>
          </div>
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
}