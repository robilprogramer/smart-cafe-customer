interface FooterProps {
  isSidebarOpen: boolean;
}

export default function Footer({ isSidebarOpen }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer 
      className={`bg-white border-t border-gray-200 py-4 mt-auto transition-all duration-300 ${
        isSidebarOpen ? 'lg:ml-64' : 'ml-0'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-2">
          <p className="text-sm text-gray-600">
            © {currentYear} Admin Dashboard. All rights reserved.
          </p>
          <div className="flex gap-4 text-sm text-gray-600">
            <a href="#" className="hover:text-blue-600 transition-colors">
              Kebijakan Privasi
            </a>
            <a href="#" className="hover:text-blue-600 transition-colors">
              Syarat & Ketentuan
            </a>
            <a href="#" className="hover:text-blue-600 transition-colors">
              Kontak
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}