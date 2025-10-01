"use client";

import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";

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

  useEffect(() => {
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
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Daftar Pengguna
          </h3>

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
