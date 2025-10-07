// Rich Text Editor Component (Simplified version)
export const RichTextEditor: React.FC<{
  value: string;
  onChange: (value: string) => void;
}> = ({ value, onChange }) => {
  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      <div className="bg-gray-50 border-b border-gray-300 p-2 flex gap-2">
        <button className="px-3 py-1 hover:bg-gray-200 rounded font-bold">B</button>
        <button className="px-3 py-1 hover:bg-gray-200 rounded italic">I</button>
        <button className="px-3 py-1 hover:bg-gray-200 rounded underline">U</button>
        <div className="border-l border-gray-300 mx-2"></div>
        <button className="px-3 py-1 hover:bg-gray-200 rounded">H1</button>
        <button className="px-3 py-1 hover:bg-gray-200 rounded">H2</button>
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-4 min-h-64 focus:outline-none resize-none"
        placeholder="Write your content here..."
      />
    </div>
  );
};