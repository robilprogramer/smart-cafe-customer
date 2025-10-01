"use client";

import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";

interface Pengguna {
  id: number;
  nama: string;
  email: string;
  role: string;
}

// tipe user yang disimpan di localStorage saat register
interface StoredUser {
  name: string;
  email: string;
  password: string;
  role: string;
}

export default function PenggunaPage() {
  const [users, setUsers] = useState<Pengguna[]>([]);
  const [currentUserRole, setCurrentUserRole] = useState<string>("");

  useEffect(() => {
    loadUsers();
    
    // Ambil role user yang sedang login
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      const user = JSON.parse(currentUser);
      setCurrentUserRole(user.role);
    }
  }, []);

  const loadUsers = () => {
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
  };

  const handleDelete = (email: string, nama: string) => {
    // Cek apakah user yang login adalah superadmin
    if (currentUserRole !== "superadmin") {
      alert("Anda tidak memiliki akses untuk menghapus pengguna!");
      return;
    }

    if (!confirm(`Apakah Anda yakin ingin menghapus pengguna "${nama}"?`)) {
      return;
    }

    const storedUsers = localStorage.getItem("users");
    if (storedUsers) {
      const parsedUsers: StoredUser[] = JSON.parse(storedUsers);
      const filteredUsers = parsedUsers.filter((user) => user.email !== email);
      localStorage.setItem("users", JSON.stringify(filteredUsers));
      
      alert(`Pengguna "${nama}" berhasil dihapus!`);
      loadUsers(); // Reload data setelah hapus
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Title */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Manajemen Pengguna
          </h2>
          <p className="text-gray-600 mt-1">
            Kelola data pengguna yang memiliki akses ke sistem
          </p>
        </div>

        {/* Tabel Pengguna */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Daftar Pengguna
            </h3>
            {currentUserRole === "admin" && (
              <span className="text-sm text-gray-500 italic">
                (Mode baca saja - hanya Super Admin yang bisa menghapus)
              </span>
            )}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border border-gray-200 px-4 py-2 text-left text-sm font-medium text-gray-600">
                    ID
                  </th>
                  <th className="border border-gray-200 px-4 py-2 text-left text-sm font-medium text-gray-600">
                    Nama
                  </th>
                  <th className="border border-gray-200 px-4 py-2 text-left text-sm font-medium text-gray-600">
                    Email
                  </th>
                  <th className="border border-gray-200 px-4 py-2 text-left text-sm font-medium text-gray-600">
                    Role
                  </th>
                  {currentUserRole === "superadmin" && (
                    <th className="border border-gray-200 px-4 py-2 text-center text-sm font-medium text-gray-600">
                      Aksi
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="border border-gray-200 px-4 py-2 text-sm">
                      {user.id}
                    </td>
                    <td className="border border-gray-200 px-4 py-2 text-sm">
                      {user.nama}
                    </td>
                    <td className="border border-gray-200 px-4 py-2 text-sm">
                      {user.email}
                    </td>
                    <td className="border border-gray-200 px-4 py-2 text-sm">
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                        {user.role}
                      </span>
                    </td>
                    {currentUserRole === "superadmin" && (
                      <td className="border border-gray-200 px-4 py-2 text-center">
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(user.email, user.nama)}
                        >
                          Hapus
                        </Button>
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
  );
}