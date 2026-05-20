import { Navbar } from './Navbar';
import { BookOpen, Camera, MessageCircle, Sparkles, Users, Zap } from 'lucide-react';
import { Link } from 'react-router';

export function LandingPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar />

      {/* Hero Section */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12 py-12 lg:py-24">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-3xl lg:text-5xl font-bold text-[#1A1A2E] mb-6 leading-tight">
            Every child deserves content that fits how they learn.
          </h1>
          <p className="text-lg text-[#888899] mb-10 leading-relaxed max-w-3xl mx-auto">
            SuvidhaShala transforms any NCERT chapter into three parallel versions — for standard learners, children with dyslexia, and children with dyscalculia or ADHD. Free. Instant. In your language.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
            <Link
              to="/generator"
              className="w-full sm:w-auto px-8 py-4 bg-[#E67E22] text-white rounded-xl hover:bg-[#d67118] transition-colors font-medium text-lg text-center"
            >
              Generate a Worksheet
            </Link>
            <Link
              to="/whatsapp"
              className="w-full sm:w-auto px-8 py-4 bg-white border-2 border-[#1B5E8B] text-[#1B5E8B] rounded-xl hover:bg-[#E8F4FD] transition-colors font-medium text-lg flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5 text-[#25D366]" />
              Try on WhatsApp
            </Link>
          </div>

          <p className="text-sm text-[#888899]">
            No account needed. No training required. Works on any device.
          </p>

          {/* Hero Visual Mockup */}
          <div className="mt-16 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[#E8F4FD] to-[#FEF5EC] rounded-3xl blur-3xl opacity-50"></div>
            <div className="relative bg-white rounded-2xl shadow-xl p-8 transform rotate-1">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-[#E8F4FD] rounded-lg p-6 border-t-4 border-[#1B5E8B]">
                  <div className="text-xs font-bold text-[#1B5E8B] mb-3">STANDARD · EDITION A</div>
                  <div className="space-y-2">
                    <div className="h-3 bg-[#1B5E8B] rounded opacity-60 w-full"></div>
                    <div className="h-3 bg-[#1B5E8B] rounded opacity-40 w-5/6"></div>
                    <div className="h-3 bg-[#1B5E8B] rounded opacity-30 w-4/6"></div>
                  </div>
                </div>
                <div className="bg-[#E8F4FD] rounded-lg p-6 border-t-4 border-[#3498DB]">
                  <div className="text-xs font-bold text-[#3498DB] mb-3">DYSLEXIA · EDITION B</div>
                  <div className="space-y-3">
                    <div className="h-3 bg-[#3498DB] rounded opacity-60 w-full"></div>
                    <div className="h-3 bg-[#3498DB] rounded opacity-40 w-4/6"></div>
                    <div className="h-3 bg-[#3498DB] rounded opacity-30 w-5/6"></div>
                  </div>
                </div>
                <div className="bg-[#FEF5EC] rounded-lg p-6 border-t-4 border-[#E67E22]">
                  <div className="text-xs font-bold text-[#E67E22] mb-3">ADHD · EDITION C</div>
                  <div className="space-y-2">
                    <div className="h-3 bg-[#E67E22] rounded opacity-60 w-full"></div>
                    <div className="h-3 bg-[#E67E22] rounded opacity-40 w-5/6"></div>
                    <div className="h-3 bg-[#E67E22] rounded opacity-30 w-3/6"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Callout */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12 pb-12 lg:pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-8 border border-red-200">
            <div className="text-5xl font-bold text-red-700 mb-2">8.2M</div>
            <div className="text-base font-medium text-red-900 mb-1">Children with learning disabilities in India</div>
            <div className="text-sm text-red-700">Receiving zero adapted content</div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-8 border border-blue-200">
            <div className="text-5xl font-bold text-blue-700 mb-2">20 sec</div>
            <div className="text-base font-medium text-blue-900 mb-1">To generate all three versions</div>
            <div className="text-sm text-blue-700">For any chapter, any subject</div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-8 border border-green-200">
            <div className="text-5xl font-bold text-green-700 mb-2">₹0</div>
            <div className="text-base font-medium text-green-900 mb-1">Cost for government school teachers</div>
            <div className="text-sm text-green-700">Always free, no signup</div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="how-it-works" className="max-w-[1440px] mx-auto px-6 lg:px-12 pb-12 lg:pb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-[#E8F4FD] flex items-center justify-center mx-auto mb-6">
              <BookOpen className="w-8 h-8 text-[#1B5E8B]" />
            </div>
            <h3 className="text-xl font-bold text-[#1A1A2E] mb-3">NCERT Library Built In</h3>
            <p className="text-[#888899] leading-relaxed">
              Select any chapter from Classes 1–8 without uploading anything
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-[#FEF5EC] flex items-center justify-center mx-auto mb-6">
              <Camera className="w-8 h-8 text-[#E67E22]" />
            </div>
            <h3 className="text-xl font-bold text-[#1A1A2E] mb-3">Camera Upload</h3>
            <p className="text-[#888899] leading-relaxed">
              Photograph any state board textbook page. AI reads and adapts it.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-[#EAF5EA] flex items-center justify-center mx-auto mb-6">
              <MessageCircle className="w-8 h-8 text-[#1E7E34]" />
            </div>
            <h3 className="text-xl font-bold text-[#1A1A2E] mb-3">WhatsApp Delivery</h3>
            <p className="text-[#888899] leading-relaxed">
              Send one message. Receive the PDF. No app needed.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
