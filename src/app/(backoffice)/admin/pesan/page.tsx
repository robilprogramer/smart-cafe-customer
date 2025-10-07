"use client";

import { useState, useEffect, useRef } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

interface Message {
  id: number;
  sender: "admin" | "user";
  content: string;
  createdAt: string;
  type?: "text" | "image" | "audio" | "video";
  fileUrl?: string;
}

interface User {
  id: number;
  name: string;
}

export default function ChatWAClone() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [chatHistory, setChatHistory] = useState<Record<number, Message[]>>({});
  const [userMessage, setUserMessage] = useState("");
  const [adminMessage, setAdminMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const userFileInputRef = useRef<HTMLInputElement>(null);
  const adminFileInputRef = useRef<HTMLInputElement>(null);

  const users: User[] = [
    { id: 1, name: "Rudi Hartono" },
    { id: 2, name: "Sari Wulandari" },
    { id: 3, name: "Budi Santoso" },
    { id: 4, name: "Putri Amelia" },
    { id: 5, name: "Ahmad Fadli" },
    { id: 6, name: "Dewi Kusuma" },
    { id: 7, name: "Eko Prasetyo" },
    { id: 8, name: "Fitri Handayani" },
    { id: 9, name: "Gita Puspita" },
    { id: 10, name: "Hendra Wijaya" },
    { id: 11, name: "Indah Permata" },
    { id: 12, name: "Joko Susanto" },
    { id: 13, name: "Kiki Saputra" },
    { id: 14, name: "Linda Maharani" },
    { id: 15, name: "Made Sukma" },
    { id: 16, name: "Nanda Pratama" },
    { id: 17, name: "Oscar Nugroho" },
    { id: 18, name: "Putri Rahayu" },
    { id: 19, name: "Qori Abdullah" },
    { id: 20, name: "Rina Safitri" },
  ];

  // Filter users berdasarkan search query (hanya dari awal nama depan)
  const filteredUsers = users.filter((user) => {
    const firstName = user.name.split(" ")[0];
    return firstName.toLowerCase().startsWith(searchQuery.toLowerCase());
  });

  // Fungsi kirim teks user
  const sendUserMessage = () => {
    if (!userMessage.trim() || !selectedUser) return;

    const newMsg: Message = {
      id: Date.now(),
      sender: "user",
      content: userMessage,
      createdAt: new Date().toISOString(),
      type: "text",
    };

    setChatHistory((prev) => ({
      ...prev,
      [selectedUser.id]: [...(prev[selectedUser.id] || []), newMsg],
    }));

    setUserMessage("");
  };

  // Fungsi kirim teks admin
  const sendAdminMessage = () => {
    if (!adminMessage.trim() || !selectedUser) return;

    const newMsg: Message = {
      id: Date.now(),
      sender: "admin",
      content: adminMessage,
      createdAt: new Date().toISOString(),
      type: "text",
    };

    setChatHistory((prev) => ({
      ...prev,
      [selectedUser.id]: [...(prev[selectedUser.id] || []), newMsg],
    }));

    setAdminMessage("");
  };

  // Fungsi untuk kirim gambar atau video via file upload
  const handleFileUpload = (
    sender: "user" | "admin",
    file: File
  ) => {
    if (!selectedUser || !file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const url = e.target?.result as string;

      // tipe berdasarkan mime
      let msgType: "image" | "video" = "image";
      if (file.type.startsWith("video")) {
        msgType = "video";
      }

      const newMsg: Message = {
        id: Date.now(),
        sender: sender,
        content: file.name,
        createdAt: new Date().toISOString(),
        type: msgType,
        fileUrl: url,
      };

      setChatHistory((prev) => ({
        ...prev,
        [selectedUser.id]: [...(prev[selectedUser.id] || []), newMsg],
      }));
    };

    reader.readAsDataURL(file);
  };

  // Fungsi mulai rekam (audio atau video tergantung opsi)
  const startRecording = async (
    sender: "user" | "admin",
    mode: "audio" | "video"
  ) => {
    try {
      const constraints =
        mode === "video"
          ? { audio: true, video: true }
          : { audio: true };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      const recorder = new MediaRecorder(stream);
      const chunks: Blob[] = [];

      recorder.ondataavailable = (e) => {
        chunks.push(e.data);
      };
      recorder.onstop = () => {
        const blob = new Blob(chunks, {
          type: mode === "video" ? "video/webm" : "audio/webm",
        });
        const url = URL.createObjectURL(blob);

        if (!selectedUser) return;

        const newMsg: Message = {
          id: Date.now(),
          sender: sender,
          content: mode === "video" ? "Video message" : "Voice message",
          createdAt: new Date().toISOString(),
          type: mode === "video" ? "video" : "audio",
          fileUrl: url,
        };

        setChatHistory((prev) => ({
          ...prev,
          [selectedUser.id]: [...(prev[selectedUser.id] || []), newMsg],
        }));

        stream.getTracks().forEach((track) => track.stop());
      };

      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
    } catch (err) {
      alert("Tidak dapat mengakses perangkat media");
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop();
      setIsRecording(false);
      setMediaRecorder(null);
    }
  };

  // Auto scroll ke bawah kalau ada pesan baru
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory, selectedUser]);

  return (
    <ProtectedRoute>
      <AdminLayout>
        <div className="flex h-[85vh] bg-white overflow-hidden">
          {/* Sidebar */}
          <div className="w-[30%] bg-white border-r border-gray-200 flex flex-col">
            <div className="bg-[#f0f2f5] p-4 flex items-center">
              <h2 className="text-gray-900 font-medium text-lg">Chats</h2>
            </div>
            <div className="bg-white p-2">
              <div className="bg-[#f0f2f5] rounded-lg px-4 py-2 flex items-center gap-3">
                <svg
                  className="w-4 h-4 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari atau mulai chat baru"
                  className="flex-1 bg-transparent text-gray-900 text-sm outline-none placeholder-gray-500"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                )}
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <div
                    key={user.id}
                    onClick={() => setSelectedUser(user)}
                    className={`px-4 py-3 cursor-pointer border-b border-gray-100 hover:bg-[#f5f6f6] transition-colors flex items-center gap-3 ${
                      selectedUser?.id === user.id ? "bg-[#f0f2f5]" : ""
                    }`}
                  >
                    <div className="w-12 h-12 rounded-full bg-[#dfe5e7] flex items-center justify-center text-gray-600 font-medium">
                      {user.name[0]}
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-900 font-medium">{user.name}</p>
                      <p className="text-gray-500 text-sm">
                        {chatHistory[user.id]?.[
                          (chatHistory[user.id] || []).length - 1
                        ]?.content.slice(0, 30) || "Belum ada pesan"}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center">
                  <p className="text-gray-500 text-sm">Tidak ada hasil ditemukan</p>
                  <p className="text-gray-400 text-xs mt-1">Coba cari dengan kata kunci lain</p>
                </div>
              )}
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            {selectedUser ? (
              <>
                {/* Header */}
                <div className="bg-[#f0f2f5] p-3 flex items-center gap-3 border-b border-gray-200">
                  <div className="w-10 h-10 rounded-full bg-[#dfe5e7] flex items-center justify-center text-gray-600 font-medium">
                    {selectedUser.name[0]}
                  </div>
                  <h2 className="text-gray-900 font-medium">{selectedUser.name}</h2>
                </div>

                {/* Body */}
                <div
                  className="flex-1 p-6 overflow-y-auto space-y-2"
                  style={{
                    backgroundColor: "#e5ddd5",
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d9d9d9' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                  }}
                >
                  {chatHistory[selectedUser.id]?.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${
                        msg.sender === "admin" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-md px-3 py-2 rounded-lg shadow-sm ${
                          msg.sender === "admin"
                            ? "bg-[#d9fdd3] text-gray-900 rounded-br-none"
                            : "bg-white text-gray-900 rounded-bl-none"
                        }`}
                      >
                        {/* Jenis pesan */}
                        {msg.type === "text" && (
                          <p className="text-sm whitespace-pre-wrap leading-relaxed">
                            {msg.content}
                          </p>
                        )}

                        {msg.type === "image" && msg.fileUrl && (
                          <div className="mt-1">
                            <img
                              src={msg.fileUrl}
                              alt={msg.content}
                              className="rounded-md max-w-full h-auto"
                            />
                            {msg.content && (
                              <p className="text-xs text-gray-600 mt-1">
                                {msg.content}
                              </p>
                            )}
                          </div>
                        )}

                        {msg.type === "audio" && msg.fileUrl && (
                          <div className="mt-1">
                            <audio controls className="w-full">
                              <source
                                src={msg.fileUrl}
                                type="audio/webm"
                              />
                              Browser tidak mendukung audio.
                            </audio>
                          </div>
                        )}

                        {msg.type === "video" && msg.fileUrl && (
                          <div className="mt-1">
                            <video controls className="w-full rounded-md">
                              <source
                                src={msg.fileUrl}
                                type="video/webm"
                              />
                              Browser tidak mendukung video.
                            </video>
                            {msg.content && (
                              <p className="text-xs text-gray-600 mt-1">
                                {msg.content}
                              </p>
                            )}
                          </div>
                        )}

                        {/* Timestamp */}
                        <span className="block text-[10px] mt-1 text-right text-gray-500">
                          {new Date(msg.createdAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    </div>
                  ))}
                  <div ref={chatEndRef} />
                </div>

                {/* Input Area */}
                <div className="bg-[#f0f2f5] p-3 flex gap-4 flex-wrap md:flex-nowrap">
                  {/* User Input */}
                  <div className="flex flex-1 min-w-[250px] items-end gap-2">
                    <input
                      ref={userFileInputRef}
                      type="file"
                      accept="image/*,video/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFileUpload("user", file);
                      }}
                    />
                    <button
                      onClick={() => userFileInputRef.current?.click()}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-full p-2 w-10 h-10 flex items-center justify-center transition-colors"
                      title="Kirim gambar/video"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>

                    <div className="flex-1 bg-white rounded-lg flex items-center px-3 py-2 shadow-sm">
                      <input
                        value={userMessage}
                        onChange={(e) => setUserMessage(e.target.value)}
                        placeholder="Pesan User..."
                        onKeyDown={(e) =>
                          e.key === "Enter" && sendUserMessage()
                        }
                        className="flex-1 bg-transparent text-gray-900 text-sm outline-none placeholder-gray-500"
                      />
                    </div>

                    {/* Tombol rekam video & audio / kirim */}
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => startRecording("user", "video")}
                        className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2 w-10 h-10 flex items-center justify-center transition-colors shadow-sm"
                        title="Rekam video"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M17 10.5V6c0-1.1-.9-2-2-2H5C3.9 4 3 4.9 3 6v12c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2v-4.5l4 4v-11l-4 4z" />
                        </svg>
                      </button>
                      {userMessage.trim() ? (
                        <button
                          onClick={sendUserMessage}
                          className="bg-[#25d366] hover:bg-[#20bd5a] text-white rounded-full p-2 w-10 h-10 flex items-center justify-center transition-colors shadow-sm"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                          </svg>
                        </button>
                      ) : (
                        <button
                          onClick={() =>
                            isRecording
                              ? stopRecording()
                              : startRecording("user", "audio")
                          }
                          className={`${
                            isRecording
                              ? "bg-red-500 hover:bg-red-600"
                              : "bg-[#25d366] hover:bg-[#20bd5a]"
                          } text-white rounded-full p-2 w-10 h-10 flex items-center justify-center transition-colors shadow-sm`}
                          title={
                            isRecording ? "Stop recording" : "Record voice"
                          }
                        >
                          {isRecording ? (
                            <svg
                              className="w-5 h-5"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z"
                                clipRule="evenodd"
                              />
                            </svg>
                          ) : (
                            <svg
                              className="w-5 h-5"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z"
                                clipRule="evenodd"
                              />
                            </svg>
                          )}
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Admin Input */}
                  <div className="flex flex-1 min-w-[250px] items-end gap-2">
                    <input
                      ref={adminFileInputRef}
                      type="file"
                      accept="image/*,video/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFileUpload("admin", file);
                      }}
                    />
                    <button
                      onClick={() => adminFileInputRef.current?.click()}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-full p-2 w-10 h-10 flex items-center justify-center transition-colors"
                      title="Kirim gambar/video"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>

                    <div className="flex-1 bg-white rounded-lg flex items-center px-3 py-2 shadow-sm">
                      <input
                        value={adminMessage}
                        onChange={(e) => setAdminMessage(e.target.value)}
                        placeholder="Pesan Admin..."
                        onKeyDown={(e) =>
                          e.key === "Enter" && sendAdminMessage()
                        }
                        className="flex-1 bg-transparent text-gray-900 text-sm outline-none placeholder-gray-500"
                      />
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => startRecording("admin", "video")}
                        className="bg-blue-700 hover:bg-blue-800 text-white rounded-full p-2 w-10 h-10 flex items-center justify-center transition-colors shadow-sm"
                        title="Rekam video (Admin)"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M17 10.5V6c0-1.1-.9-2-2-2H5C3.9 4 3 4.9 3 6v12c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2v-4.5l4 4v-11l-4 4z" />
                        </svg>
                      </button>
                      {adminMessage.trim() ? (
                        <button
                          onClick={sendAdminMessage}
                          className="bg-[#128c7e] hover:bg-[#0f7a6e] text-white rounded-full p-2 w-10 h-10 flex items-center justify-center transition-colors shadow-sm"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                          </svg>
                        </button>
                      ) : (
                        <button
                          onClick={() =>
                            isRecording
                              ? stopRecording()
                              : startRecording("admin", "audio")
                          }
                          className={`${
                            isRecording
                              ? "bg-red-500 hover:bg-red-600"
                              : "bg-[#128c7e] hover:bg-[#0f7a6e]"
                          } text-white rounded-full p-2 w-10 h-10 flex items-center justify-center transition-colors shadow-sm`}
                          title={
                            isRecording ? "Stop recording" : "Record voice"
                          }
                        >
                          {isRecording ? (
                            <svg
                              className="w-5 h-5"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z"
                                clipRule="evenodd"
                              />
                            </svg>
                          ) : (
                            <svg
                              className="w-5 h-5"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z"
                                clipRule="evenodd"
                              />
                            </svg>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center bg-[#f8f9fa]">
                <div className="text-center">
                  <div className="w-64 h-64 mx-auto mb-8 opacity-10">
                    <svg viewBox="0 0 24 24" fill="#54656f">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                    </svg>
                  </div>
                  <h3 className="text-gray-600 text-3xl font-light mb-2">
                    Admin Web
                  </h3>
                  <p className="text-gray-500 text-sm">
                    Pilih chat untuk mulai percakapan
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
}
