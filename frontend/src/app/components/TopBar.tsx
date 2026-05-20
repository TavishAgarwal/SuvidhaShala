import { Link, useLocation } from 'react-router';
import { Home, Sparkles, MessageCircle } from 'lucide-react';

export function TopBar() {
  const location = useLocation();

  return (
    <header className="bg-white border-b border-[#E2E8F0] px-8 py-4 flex items-center justify-between">
      <Link to="/" className="text-xl font-bold text-[#2B3440] hover:text-[#2D9B87] transition-colors">
        SuvidhaShala
      </Link>
      <div className="flex items-center gap-2">
        {location.pathname !== '/' && (
          <Link
            to="/"
            className="flex items-center gap-2 px-4 py-2 text-[#718096] hover:text-[#2D9B87] hover:bg-[#E6F7F4] rounded-lg transition-colors"
          >
            <Home className="w-5 h-5" />
            <span className="text-sm font-medium">Home</span>
          </Link>
        )}
        {location.pathname !== '/generate' && (
          <Link
            to="/generate"
            className="flex items-center gap-2 px-4 py-2 text-[#718096] hover:text-[#2D9B87] hover:bg-[#E6F7F4] rounded-lg transition-colors"
          >
            <Sparkles className="w-5 h-5" />
            <span className="text-sm font-medium">Generate</span>
          </Link>
        )}
        {location.pathname !== '/whatsapp' && (
          <Link
            to="/whatsapp"
            className="flex items-center gap-2 px-4 py-2 text-[#718096] hover:text-[#2D9B87] hover:bg-[#E6F7F4] rounded-lg transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
            <span className="text-sm font-medium">WhatsApp</span>
          </Link>
        )}
      </div>
    </header>
  );
}
