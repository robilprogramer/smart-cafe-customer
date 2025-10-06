"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import { AddContentModal } from "@/components/admin/content/AddContentModal";
import { ContentTable } from "@/components/admin/content/ContentTable";
import { FilterBar } from "@/components/admin/content/FilterBar";
import { StatsCard } from "@/components/admin/content/StatsCard";
import { useContents } from "@/hooks/useContents";
import { Calendar, Eye, FileImage, FileText, Plus } from "lucide-react";
import { useState } from "react";

export default function ContentManagementPage() {
  const { 
    contents, 
    loading, 
    filters, 
    setFilters, 
    deleteContent, 
    updateStatus, 
    createContent 
  } = useContents();
  
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const stats = {
    total: contents.length,
    published: contents.filter(c => c.status === 'published').length,
    draft: contents.filter(c => c.status === 'draft').length,
    totalViews: contents.reduce((sum, c) => sum + c.views, 0)
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Title */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Content Management
            </h2>
            <p className="text-gray-600 mt-1">
              Kelola semua konten kuliner Anda dengan mudah
            </p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg shadow flex items-center gap-2"
          >
            <Plus size={18} />
            Add New Content
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatsCard
            icon={<FileText className="text-white" size={24} />}
            title="Total Content"
            value={stats.total}
            color="bg-blue-500"
          />
          <StatsCard
            icon={<Eye className="text-white" size={24} />}
            title="Total Views"
            value={stats.totalViews.toLocaleString()}
            color="bg-green-500"
          />
          <StatsCard
            icon={<Calendar className="text-white" size={24} />}
            title="Published"
            value={stats.published}
            color="bg-purple-500"
          />
          <StatsCard
            icon={<FileText className="text-white" size={24} />}
            title="Draft"
            value={stats.draft}
            color="bg-yellow-500"
          />
        </div>

        {/* Filter Bar */}
        <FilterBar filters={filters} onFilterChange={handleFilterChange} />

        {/* Content Table */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Daftar Content
          </h3>

          {loading ? (
            <div className="p-12 text-center">
              <div className="text-gray-500">Loading...</div>
            </div>
          ) : contents.length === 0 ? (
            <div className="p-12 text-center">
              <FileImage className="mx-auto text-gray-400 mb-4" size={64} />
              <div className="text-gray-500 text-lg mb-2">No content found</div>
              <p className="text-gray-400 mb-4">Start creating your first content</p>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg inline-flex items-center gap-2"
              >
                <Plus size={20} />
                Create Content
              </button>
            </div>
          ) : (
            <ContentTable
              contents={contents}
              onDelete={deleteContent}
              onStatusChange={updateStatus}
            />
          )}
        </div>
      </div>

      {/* Add Content Modal */}
      <AddContentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={createContent}
      />
    </AdminLayout>
  );
}