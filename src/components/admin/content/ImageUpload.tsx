import { Upload, X } from "lucide-react";
import { useState } from "react";

// Image Upload Component
export const ImageUpload: React.FC<{
  images: string[];
  onImagesChange: (images: string[]) => void;
  multiple?: boolean;
}> = ({ images, onImagesChange, multiple = false }) => {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    // Simulate file upload - in real app, upload to server
    const mockUrl = `https://images.unsplash.com/photo-${Date.now()}?w=400`;
    if (multiple) {
      onImagesChange([...images, mockUrl]);
    } else {
      onImagesChange([mockUrl]);
    }
  };

  const handleFileInput = () => {
    // Simulate file selection
    const mockUrl = `https://images.unsplash.com/photo-${Date.now()}?w=400`;
    if (multiple) {
      onImagesChange([...images, mockUrl]);
    } else {
      onImagesChange([mockUrl]);
    }
  };

  const removeImage = (index: number) => {
    onImagesChange(images.filter((_, i) => i !== index));
  };

  return (
    <div>
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={handleFileInput}
      >
        <Upload className="mx-auto mb-4 text-gray-400" size={48} />
        <p className="text-gray-600 mb-2">Drag and drop images here, or click to select</p>
        <p className="text-sm text-gray-500">{multiple ? 'Multiple files supported' : 'Single file only'}</p>
      </div>

      {images.length > 0 && (
        <div className="grid grid-cols-3 gap-4 mt-4">
          {images.map((img, idx) => (
            <div key={idx} className="relative group">
              <img src={img} alt={`Upload ${idx}`} className="w-full h-32 object-cover rounded-lg" />
              <button
                onClick={() => removeImage(idx)}
                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
