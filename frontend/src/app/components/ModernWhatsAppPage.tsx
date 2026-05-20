import { Sidebar } from './Sidebar';
import { MessageCircle, Check, Smartphone, Zap, Globe, Bell, Search, QrCode, Send } from 'lucide-react';

export function ModernWhatsAppPage() {
  return (
    <div className="flex h-screen bg-[#F5F6FA]">
      <Sidebar />

      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-white border-b border-[#E8E8F0] px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-[#1A1A2E]">WhatsApp Bot</h1>
              <p className="text-sm text-[#888899]">No app. No login. Just send a message.</p>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="w-5 h-5 text-[#888899] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border border-[#E8E8F0] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2D9B87]/30 w-64"
                />
              </div>

              <button className="relative p-2 hover:bg-[#F8F9FF] rounded-xl transition-colors">
                <Bell className="w-6 h-6 text-[#888899]" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              <div className="flex items-center gap-3 pl-4 border-l border-[#E8E8F0]">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2D9B87] to-[#52B788] flex items-center justify-center">
                  <span className="text-white font-medium text-sm">JK</span>
                </div>
                <div>
                  <div className="text-sm font-medium text-[#1A1A2E]">Jane Khan</div>
                  <div className="text-xs text-[#888899]">Teacher</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-8">
          <div className="max-w-5xl mx-auto">
            {/* Header Card */}
            <div className="bg-gradient-to-br from-[#25D366] to-[#128C7E] rounded-2xl p-8 mb-8 text-white">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <MessageCircle className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">SuvidhaShala WhatsApp Bot</h2>
                  <p className="text-white/80">Generate worksheets directly from WhatsApp</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8 mb-8">
              {/* Phone Mockup */}
              <div className="bg-white rounded-2xl p-8 border border-[#E8E8F0]">
                <h3 className="text-lg font-bold text-[#1A1A2E] mb-6">See it in action</h3>

                <div className="max-w-sm mx-auto">
                  <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-8 border-gray-900">
                    {/* Phone Top Bar */}
                    <div className="bg-[#075E54] text-white px-4 py-3 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#2D9B87] to-[#52B788] flex items-center justify-center">
                          <span className="text-white font-bold text-xs">S</span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-sm">SuvidhaShala Bot</div>
                        <div className="text-xs opacity-75">Online</div>
                      </div>
                    </div>

                    {/* Chat Messages */}
                    <div className="bg-[#E5DDD5] p-4 space-y-3 h-96 overflow-y-auto" style={{
                      backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 0h100v100H0z\' fill=\'%23E5DDD5\'/%3E%3Cpath d=\'M20 10h60v1H20zM15 30h70v1H15zM25 50h50v1H25z\' opacity=\'.05\' fill=\'%23000\'/%3E%3C/svg%3E")',
                    }}>
                      {/* Teacher Message */}
                      <div className="flex justify-end">
                        <div className="bg-[#DCF8C6] rounded-xl px-4 py-2 max-w-[80%] shadow-sm">
                          <p className="text-sm text-[#1A1A2E]">5 science 2 dyslexia</p>
                          <p className="text-xs text-[#888899] text-right mt-1">10:23 AM</p>
                        </div>
                      </div>

                      {/* Bot Reply 1 */}
                      <div className="flex justify-start">
                        <div className="bg-white rounded-xl px-4 py-3 max-w-[85%] shadow-sm">
                          <p className="text-sm text-[#444455] mb-1">Creating your dyslexia-friendly worksheet...</p>
                          <p className="text-sm font-medium mb-1">
                            <span className="text-[#2D9B87]">Class 5</span> ·
                            <span className="text-[#2D9B87]"> Science</span> ·
                            <span className="text-[#2D9B87]"> Chapter 2</span>
                          </p>
                          <p className="text-sm text-[#888899]">This takes about 20 seconds ⏳</p>
                          <p className="text-xs text-[#888899] text-right mt-2">10:23 AM</p>
                        </div>
                      </div>

                      {/* Bot Reply 2 - PDF */}
                      <div className="flex justify-start">
                        <div className="bg-white rounded-xl px-4 py-3 max-w-[85%] shadow-sm">
                          <div className="flex items-center gap-3 mb-3 pb-3 border-b border-gray-100">
                            <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-red-600 rounded-xl flex items-center justify-center flex-shrink-0">
                              <span className="text-white font-bold text-xs">PDF</span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-medium text-[#1A1A2E] truncate">SuvidhaShala_Class5_Science_Ch2.pdf</p>
                              <p className="text-xs text-[#888899]">245 KB</p>
                            </div>
                          </div>
                          <p className="text-sm text-[#444455] mb-2 font-medium">Your worksheet is ready! ✨</p>
                          <div className="flex flex-wrap gap-1.5 mb-3">
                            <span className="text-xs bg-teal-100 text-teal-700 px-2 py-1 rounded-full font-medium">✓ Shorter sentences</span>
                            <span className="text-xs bg-teal-100 text-teal-700 px-2 py-1 rounded-full font-medium">✓ Wider spacing</span>
                            <span className="text-xs bg-teal-100 text-teal-700 px-2 py-1 rounded-full font-medium">✓ Syllable guides</span>
                          </div>
                          <p className="text-xs text-[#888899] mb-2">Reply 'New' for another worksheet</p>
                          <p className="text-xs text-[#888899] text-right">10:24 AM</p>
                        </div>
                      </div>
                    </div>

                    {/* Message Input */}
                    <div className="bg-[#F0F0F0] px-4 py-3 flex items-center gap-2">
                      <div className="flex-1 bg-white rounded-full px-4 py-2.5">
                        <input
                          type="text"
                          placeholder="Type a message"
                          className="w-full outline-none text-sm"
                          disabled
                        />
                      </div>
                      <button className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center hover:bg-[#128C7E] transition-colors">
                        <Send className="w-5 h-5 text-white" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* How to Use */}
              <div className="space-y-6">
                <div className="bg-white rounded-2xl p-6 border border-[#E8E8F0]">
                  <h3 className="text-lg font-bold text-[#1A1A2E] mb-6">How to get started</h3>

                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-lg">1</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-[#1A1A2E] mb-1">Save our number</h4>
                        <p className="text-sm text-[#888899] mb-2">Add +91 98765 43210 to your contacts</p>
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-50 border border-green-200 rounded-lg text-sm text-green-700">
                          <Smartphone className="w-4 h-4" />
                          +91 98765 43210
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-lg">2</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-[#1A1A2E] mb-1">Send your request</h4>
                        <p className="text-sm text-[#888899] mb-2">Format: class subject chapter version</p>
                        <div className="bg-[#DCF8C6] border border-green-200 rounded-xl px-4 py-2 inline-block">
                          <code className="text-sm text-[#1A1A2E] font-mono">"5 science 2 dyslexia"</code>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-lg">3</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-[#1A1A2E] mb-1">Receive your PDF</h4>
                        <p className="text-sm text-[#888899] mb-2">Get your custom worksheet in ~20 seconds</p>
                        <div className="flex items-center gap-2 text-sm text-green-700">
                          <Check className="w-5 h-5" />
                          <span className="font-medium">Instant delivery</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* QR Code */}
                <div className="bg-white rounded-2xl p-6 border border-[#E8E8F0] text-center">
                  <h4 className="font-semibold text-[#1A1A2E] mb-4">Or scan to start chatting</h4>
                  <div className="w-48 h-48 bg-gradient-to-br from-teal-50 to-blue-50 rounded-2xl border-2 border-[#E8E8F0] mx-auto flex items-center justify-center shadow-sm">
                    <div className="text-center">
                      <QrCode className="w-16 h-16 text-[#2D9B87] mx-auto mb-2" />
                      <p className="text-sm text-[#888899]">WhatsApp QR Code</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="bg-white rounded-2xl p-8 border border-[#E8E8F0]">
              <h3 className="text-lg font-bold text-[#1A1A2E] mb-6 text-center">Why use WhatsApp Bot?</h3>

              <div className="grid grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-8 h-8 text-orange-600" />
                  </div>
                  <h4 className="font-semibold text-[#1A1A2E] mb-2">Works on 2G</h4>
                  <p className="text-sm text-[#888899]">No high-speed internet needed</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center mx-auto mb-4">
                    <Smartphone className="w-8 h-8 text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-[#1A1A2E] mb-2">No smartphone needed</h4>
                  <p className="text-sm text-[#888899]">Works on basic phones</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center mx-auto mb-4">
                    <Globe className="w-8 h-8 text-green-600" />
                  </div>
                  <h4 className="font-semibold text-[#1A1A2E] mb-2">Hindi & English</h4>
                  <p className="text-sm text-[#888899]">More languages coming soon</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-100 to-teal-200 flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8 text-teal-600" />
                  </div>
                  <h4 className="font-semibold text-[#1A1A2E] mb-2">Free forever</h4>
                  <p className="text-sm text-[#888899]">No hidden costs</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
