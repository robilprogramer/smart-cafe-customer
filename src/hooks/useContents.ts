import { ContentAPI } from "@/services/content.api";
import { Content } from "@/types/content.types";
import { useEffect, useState, useCallback } from "react";

export const useContents = () => {
  const [contents, setContents] = useState<Content[]>([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    type: 'all',
    status: 'all',
    search: ''
  });

  const fetchContents = useCallback(async () => {
    setLoading(true);
    try {
      const response = await ContentAPI.getContents(filters);
      setContents(response.data);
    } catch (error) {
      console.error('Error fetching contents:', error);
    } finally {
      setLoading(false);
    }
  }, [filters]); // fetchContents akan dibuat ulang hanya ketika filters berubah

  useEffect(() => {
    fetchContents();
  }, [fetchContents]); // Sekarang dependency-nya fetchContents

  const deleteContent = async (id: string) => {
    await ContentAPI.deleteContent(id);
    fetchContents();
  };

  const updateStatus = async (id: string, status: Content['status']) => {
    await ContentAPI.updateStatus(id, status);
    fetchContents();
  };

  const createContent = async (content: Omit<Content, 'id' | 'views'>) => {
    await ContentAPI.createContent(content);
    fetchContents();
  };

  return {
    contents,
    loading,
    filters,
    setFilters,
    deleteContent,
    updateStatus,
    createContent,
    refetch: fetchContents
  };
};