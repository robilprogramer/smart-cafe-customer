import { Video } from "lucide-react";
import { useState } from "react";

// Video Input Component
export const VideoInput: React.FC<{
  videoUrl: string;
  onVideoUrlChange: (url: string) => void;
}> = ({ videoUrl, onVideoUrlChange }) => {
  const [previewUrl, setPreviewUrl] = useState(videoUrl);

  const extractVideoId = (url: string) => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/);
    return match ? match[1] : null;
  };

  const handleUrlChange = (url: string) => {
    onVideoUrlChange(url);
    setPreviewUrl(url);
  };

  const videoId = extractVideoId(previewUrl);

  return (
    <div>
      <div className="flex gap-2 mb-4">
        <div className="flex-1 relative">
          <Video className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Paste YouTube/Vimeo URL..."
            value={videoUrl}
            onChange={(e) => handleUrlChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {videoId && (
        <div className="aspect-video bg-black rounded-lg overflow-hidden">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}`}
            className="w-full h-full"
            allowFullScreen
          />
        </div>
      )}
    </div>
  );
};
