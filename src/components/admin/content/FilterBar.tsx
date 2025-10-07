import { Search } from "lucide-react";

// Filter Bar Component
export const FilterBar: React.FC<{
  filters: any;
  onFilterChange: (key: string, value: string) => void;
}> = ({ filters, onFilterChange }) => (
  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
    <div className="flex flex-wrap gap-4">
      <div className="flex-1 min-w-64">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search content..."
            value={filters.search}
            onChange={(e) => onFilterChange('search', e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      
      <select
        value={filters.type}
        onChange={(e) => onFilterChange('type', e.target.value)}
        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="all">All Types</option>
        <option value="menu">Menu</option>
        <option value="blog">Blog</option>
        <option value="promo">Promo</option>
        <option value="gallery">Gallery</option>
      </select>
      
      <select
        value={filters.status}
        onChange={(e) => onFilterChange('status', e.target.value)}
        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="all">All Status</option>
        <option value="published">Published</option>
        <option value="draft">Draft</option>
        <option value="archived">Archived</option>
      </select>
    </div>
  </div>
);
