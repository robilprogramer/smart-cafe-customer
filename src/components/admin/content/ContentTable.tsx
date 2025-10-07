import { Content } from "@/types/content.types";
import { Edit2, Eye, FileText, Image, Tag, Trash2 } from "lucide-react";

// Content Table Component
export const ContentTable: React.FC<{
  contents: Content[];
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: Content['status']) => void;
}> = ({ contents, onDelete, onStatusChange }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'menu': return <FileText size={16} className="text-blue-600" />;
      case 'blog': return <FileText size={16} className="text-purple-600" />;
      case 'promo': return <Tag size={16} className="text-red-600" />;
      case 'gallery': return <Image size={16} className="text-green-600" />;
      default: return <FileText size={16} />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Content</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Views</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {contents.map((content) => (
              <tr key={content.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img 
                      src={content.thumbnail} 
                      alt={content.title}
                      className="w-12 h-12 rounded-lg object-cover mr-3"
                    />
                    <div className="text-sm font-medium text-gray-900">{content.title}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    {getTypeIcon(content.type)}
                    <span className="text-sm text-gray-900 capitalize">{content.type}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{content.category}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <select
                    value={content.status}
                    onChange={(e) => onStatusChange(content.id, e.target.value as Content['status'])}
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(content.status)} border-0 cursor-pointer`}
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                    <option value="archived">Archived</option>
                  </select>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{content.author}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{content.views.toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{content.publishDate}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex items-center gap-2">
                    <button className="text-blue-600 hover:text-blue-900">
                      <Eye size={18} />
                    </button>
                    <button className="text-green-600 hover:text-green-900">
                      <Edit2 size={18} />
                    </button>
                    <button 
                      onClick={() => onDelete(content.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
