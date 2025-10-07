import { Content } from "@/types/content.types";
import { X } from "lucide-react";
import { useState } from "react";
import { RichTextEditor } from "./RichTextEditor";
import { ImageUpload } from "./ImageUpload";
import { VideoInput } from "./VideoInput";

// Add Content Modal
export const AddContentModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (content: Omit<Content, 'id' | 'views'>) => void;
}> = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    type: 'menu' as Content['type'],
    status: 'draft' as Content['status'],
    category: '',
    author: 'Admin',
    publishDate: new Date().toISOString().split('T')[0],
    thumbnail: '',
    description: '',
    price: 0,
    content: '',
    videoUrl: '',
    images: [] as string[]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
    // Reset form
    setFormData({
      title: '',
      type: 'menu',
      status: 'draft',
      category: '',
      author: 'Admin',
      publishDate: new Date().toISOString().split('T')[0],
      thumbnail: '',
      description: '',
      price: 0,
      content: '',
      videoUrl: '',
      images: []
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">Add New Content</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Content title..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Type *</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({...formData, type: e.target.value as Content['type']})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="menu">Menu</option>
                <option value="blog">Blog</option>
                <option value="promo">Promo</option>
                <option value="gallery">Gallery</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
              <input
                type="text"
                required
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. Main Course"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({...formData, status: e.target.value as Content['status']})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>

          {/* Price for Menu */}
          {formData.type === 'menu' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price (Rp)</label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: Number(e.target.value)})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="25000"
              />
            </div>
          )}

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              placeholder="Short description..."
            />
          </div>

          {/* Rich Text Content for Blog */}
          {formData.type === 'blog' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
              <RichTextEditor
                value={formData.content}
                onChange={(value) => setFormData({...formData, content: value})}
              />
            </div>
          )}

          {/* Thumbnail */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Thumbnail Image</label>
            <ImageUpload
              images={formData.thumbnail ? [formData.thumbnail] : []}
              onImagesChange={(imgs) => setFormData({...formData, thumbnail: imgs[0] || ''})}
              multiple={false}
            />
          </div>

          {/* Gallery Images */}
          {formData.type === 'gallery' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Gallery Images</label>
              <ImageUpload
                images={formData.images}
                onImagesChange={(imgs) => setFormData({...formData, images: imgs})}
                multiple={true}
              />
            </div>
          )}

          {/* Video URL for Gallery */}
          {formData.type === 'gallery' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Video URL (YouTube/Vimeo)</label>
              <VideoInput
                videoUrl={formData.videoUrl}
                onVideoUrlChange={(url) => setFormData({...formData, videoUrl: url})}
              />
            </div>
          )}

          {/* Submit Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Create Content
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
