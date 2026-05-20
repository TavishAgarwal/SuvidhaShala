import { useState } from 'react';
import { Sidebar } from './Sidebar';
import {
  Sparkles, Upload, Camera, Download, Share2,
  Check, Circle, ChevronDown, X, FileText,
  FileDown, CheckCircle2, Bell, Search
} from 'lucide-react';

type GeneratorState = 'empty' | 'loading' | 'results';
type InputMode = 'ncert' | 'pdf' | 'camera';

export function ModernGeneratorPage() {
  const [state, setState] = useState<GeneratorState>('empty');
  const [inputMode, setInputMode] = useState<InputMode>('ncert');
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedChapter, setSelectedChapter] = useState('');
  const [selectedVersions, setSelectedVersions] = useState({
    standard: true,
    dyslexia: true,
    adhd: true
  });
  const [language, setLanguage] = useState<'english' | 'hindi'>('english');
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [activeTab, setActiveTab] = useState<'standard' | 'dyslexia' | 'adhd'>('standard');

  const handleGenerate = () => {
    setState('loading');
    setLoadingProgress(0);

    let step = 0;
    const interval = setInterval(() => {
      step++;
      setLoadingProgress(step);
      if (step >= 5) {
        clearInterval(interval);
        setTimeout(() => setState('results'), 500);
      }
    }, 3000);
  };

  return (
    <div className="flex h-screen bg-[#F5F6FA]">
      <Sidebar />

      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-white border-b border-[#E8E8F0] px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-[#1A1A2E]">Generate Worksheet</h1>
              <p className="text-sm text-[#888899]">Create accessible learning materials instantly</p>
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
          <div className="grid grid-cols-3 gap-6">
            {/* Left Panel - Input Form */}
            <div className="bg-white rounded-2xl p-6 border border-[#E8E8F0]">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <h2 className="font-bold text-lg text-[#1A1A2E]">Setup</h2>
              </div>

              {/* Input Mode Tabs */}
              <div className="mb-6">
                <label className="text-sm font-medium text-[#1A1A2E] mb-3 block">Choose a chapter</label>

                <div className="flex gap-2 bg-[#F8F9FF] p-1 rounded-xl mb-4">
                  <button
                    onClick={() => setInputMode('ncert')}
                    className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                      inputMode === 'ncert'
                        ? 'bg-white text-[#2D9B87] shadow-sm'
                        : 'text-[#888899] hover:text-[#2D9B87]'
                    }`}
                  >
                    NCERT Library
                  </button>
                  <button
                    onClick={() => setInputMode('pdf')}
                    className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                      inputMode === 'pdf'
                        ? 'bg-white text-[#2D9B87] shadow-sm'
                        : 'text-[#888899] hover:text-[#2D9B87]'
                    }`}
                  >
                    Upload PDF
                  </button>
                  <button
                    onClick={() => setInputMode('camera')}
                    className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                      inputMode === 'camera'
                        ? 'bg-white text-[#2D9B87] shadow-sm'
                        : 'text-[#888899] hover:text-[#2D9B87]'
                    }`}
                  >
                    Camera
                  </button>
                </div>

                {inputMode === 'ncert' && (
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs text-[#888899] mb-1.5 block">Select Class</label>
                      <select
                        value={selectedClass}
                        onChange={(e) => setSelectedClass(e.target.value)}
                        className="w-full px-3 py-2.5 border border-[#E8E8F0] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2D9B87]/30 bg-white"
                      >
                        <option value="">Choose class...</option>
                        {[1,2,3,4,5,6,7,8].map(c => (
                          <option key={c} value={c}>Class {c}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-xs text-[#888899] mb-1.5 block">Select Subject</label>
                      <select
                        value={selectedSubject}
                        onChange={(e) => setSelectedSubject(e.target.value)}
                        className="w-full px-3 py-2.5 border border-[#E8E8F0] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2D9B87]/30 bg-white"
                        disabled={!selectedClass}
                      >
                        <option value="">Choose subject...</option>
                        <option value="mathematics">Mathematics</option>
                        <option value="science">Science</option>
                        <option value="english">English</option>
                        <option value="hindi">Hindi</option>
                        <option value="social">Social Science</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs text-[#888899] mb-1.5 block">Select Chapter</label>
                      <select
                        value={selectedChapter}
                        onChange={(e) => setSelectedChapter(e.target.value)}
                        className="w-full px-3 py-2.5 border border-[#E8E8F0] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2D9B87]/30 bg-white"
                        disabled={!selectedSubject}
                      >
                        <option value="">Choose chapter...</option>
                        {selectedSubject === 'science' && selectedClass === '5' && (
                          <>
                            <option value="ch1">Chapter 1: Super Senses</option>
                            <option value="ch2">Chapter 2: Components of Food</option>
                            <option value="ch3">Chapter 3: Fibre to Fabric</option>
                          </>
                        )}
                      </select>
                    </div>

                    {selectedChapter && (
                      <div className="bg-blue-50 border border-blue-200 rounded-xl p-3">
                        <p className="text-xs text-blue-700">
                          Class 5 · Science · Chapter 2: Components of Food
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {inputMode === 'pdf' && (
                  <div className="border-2 border-dashed border-[#E8E8F0] rounded-xl p-8 text-center hover:border-[#2D9B87] transition-colors cursor-pointer">
                    <Upload className="w-8 h-8 text-[#888899] mx-auto mb-2" />
                    <p className="text-sm text-[#1A1A2E] mb-1">Drop your PDF here</p>
                    <p className="text-xs text-[#888899]">or click to browse</p>
                  </div>
                )}

                {inputMode === 'camera' && (
                  <div className="border-2 border-dashed border-[#E8E8F0] rounded-xl p-8 text-center hover:border-[#2D9B87] transition-colors cursor-pointer">
                    <Camera className="w-8 h-8 text-[#888899] mx-auto mb-2" />
                    <p className="text-sm text-[#1A1A2E] mb-1">Upload textbook photos</p>
                    <p className="text-xs text-[#888899]">One page per photo</p>
                  </div>
                )}
              </div>

              <div className="h-px bg-[#E8E8F0] my-6"></div>

              {/* Version Selection */}
              <div className="mb-6">
                <label className="text-sm font-medium text-[#1A1A2E] mb-3 block">Choose versions</label>

                <div className="space-y-3">
                  <label className={`flex items-start gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                    selectedVersions.standard ? 'border-[#2D9B87] bg-teal-50/50' : 'border-[#E8E8F0] bg-white hover:border-[#2D9B87]/30'
                  }`}>
                    <input
                      type="checkbox"
                      checked={selectedVersions.standard}
                      onChange={(e) => setSelectedVersions({...selectedVersions, standard: e.target.checked})}
                      className="mt-1 accent-[#2D9B87]"
                    />
                    <div className="flex-1">
                      <div className="text-sm font-medium text-[#1A1A2E] mb-1">Standard</div>
                      <div className="text-xs text-[#888899]">Improved clarity for all learners</div>
                    </div>
                  </label>

                  <label className={`flex items-start gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                    selectedVersions.dyslexia ? 'border-[#2D9B87] bg-teal-50/50' : 'border-[#E8E8F0] bg-white hover:border-[#2D9B87]/30'
                  }`}>
                    <input
                      type="checkbox"
                      checked={selectedVersions.dyslexia}
                      onChange={(e) => setSelectedVersions({...selectedVersions, dyslexia: e.target.checked})}
                      className="mt-1 accent-[#2D9B87]"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="text-sm font-medium text-[#1A1A2E]">Dyslexia Edition</div>
                        <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">Edition B</span>
                      </div>
                      <div className="text-xs text-[#888899]">Shorter sentences, wider spacing, syllable guides</div>
                    </div>
                  </label>

                  <label className={`flex items-start gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                    selectedVersions.adhd ? 'border-[#2D9B87] bg-teal-50/50' : 'border-[#E8E8F0] bg-white hover:border-[#2D9B87]/30'
                  }`}>
                    <input
                      type="checkbox"
                      checked={selectedVersions.adhd}
                      onChange={(e) => setSelectedVersions({...selectedVersions, adhd: e.target.checked})}
                      className="mt-1 accent-[#2D9B87]"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="text-sm font-medium text-[#1A1A2E]">Dyscalculia / ADHD</div>
                        <span className="px-2 py-0.5 bg-orange-100 text-orange-700 text-xs rounded-full font-medium">Edition C</span>
                      </div>
                      <div className="text-xs text-[#888899]">Step-by-step, visual anchors, progress boxes</div>
                    </div>
                  </label>
                </div>
              </div>

              <div className="h-px bg-[#E8E8F0] my-6"></div>

              {/* Language Selection */}
              <div className="mb-6">
                <label className="text-sm font-medium text-[#1A1A2E] mb-3 block">Output language</label>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setLanguage('english')}
                    className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      language === 'english'
                        ? 'bg-gradient-to-r from-[#2D9B87] to-[#52B788] text-white shadow-lg'
                        : 'bg-[#F8F9FF] text-[#888899] hover:bg-teal-50 border border-[#E8E8F0]'
                    }`}
                  >
                    English
                  </button>
                  <button
                    onClick={() => setLanguage('hindi')}
                    className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      language === 'hindi'
                        ? 'bg-gradient-to-r from-[#2D9B87] to-[#52B788] text-white shadow-lg'
                        : 'bg-[#F8F9FF] text-[#888899] hover:bg-teal-50 border border-[#E8E8F0]'
                    }`}
                  >
                    Hindi
                  </button>
                </div>

                <div className="flex flex-wrap gap-2 mt-3">
                  <span className="px-3 py-1 bg-[#F8F9FF] text-[#888899] text-xs rounded-full border border-[#E8E8F0]">Tamil · Coming soon</span>
                  <span className="px-3 py-1 bg-[#F8F9FF] text-[#888899] text-xs rounded-full border border-[#E8E8F0]">Telugu · Coming soon</span>
                </div>
              </div>

              {/* Generate Button */}
              <button
                onClick={handleGenerate}
                disabled={!selectedChapter && inputMode === 'ncert'}
                className="w-full h-14 bg-gradient-to-r from-orange-400 to-orange-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-orange-300/50 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Sparkles className="w-5 h-5" />
                Generate All Versions
              </button>
              <p className="text-xs text-[#888899] text-center mt-3">~20 seconds · Powered by GPT-4o</p>
            </div>

            {/* Right Panel - Preview */}
            <div className="col-span-2">
              {state === 'empty' && <EmptyState />}
              {state === 'loading' && <LoadingState progress={loadingProgress} />}
              {state === 'results' && <ResultsState activeTab={activeTab} setActiveTab={setActiveTab} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="bg-white rounded-2xl p-12 border border-[#E8E8F0] h-full flex items-center justify-center">
      <div className="text-center max-w-md">
        <div className="mb-6 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-teal-200 to-orange-200 rounded-full blur-3xl opacity-20"></div>
          <div className="relative flex justify-center gap-4">
            <div className="w-20 h-28 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl shadow-lg transform -rotate-6 border-t-4 border-blue-500"></div>
            <div className="w-20 h-28 bg-gradient-to-br from-teal-100 to-teal-200 rounded-xl shadow-lg transform rotate-0 border-t-4 border-teal-500"></div>
            <div className="w-20 h-28 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl shadow-lg transform rotate-6 border-t-4 border-orange-500"></div>
          </div>
        </div>
        <p className="text-lg font-semibold text-[#1A1A2E] mb-2">Your worksheets will appear here</p>
        <p className="text-sm text-[#888899]">Select a chapter and click Generate to start</p>
      </div>
    </div>
  );
}

function LoadingState({ progress }: { progress: number }) {
  const steps = [
    'Analysing chapter content...',
    'Generating Standard version...',
    'Generating Dyslexia version...',
    'Generating Dyscalculia version...',
    'Running quality check...'
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-6">
        {[0, 1, 2].map((i) => (
          <div key={i} className="bg-white rounded-2xl shadow-sm overflow-hidden animate-pulse border border-[#E8E8F0]">
            <div className={`h-14 ${i === 0 ? 'bg-blue-200' : i === 1 ? 'bg-teal-200' : 'bg-orange-200'} opacity-30`}></div>
            <div className="p-6 space-y-3">
              <div className="h-4 bg-gray-200 rounded-lg w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded-lg w-full"></div>
              <div className="h-4 bg-gray-200 rounded-lg w-5/6"></div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl p-8 border border-[#E8E8F0]">
        <div className="max-w-md mx-auto space-y-4">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center gap-3">
              {index < progress ? (
                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#2D9B87] to-[#52B788] flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
              ) : index === progress ? (
                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#2D9B87] to-[#52B788] animate-pulse"></div>
              ) : (
                <div className="w-6 h-6 rounded-full bg-[#E8E8F0]"></div>
              )}
              <span className={`text-sm ${index <= progress ? 'text-[#1A1A2E] font-medium' : 'text-[#888899]'}`}>
                {step}
              </span>
            </div>
          ))}
          <div className="text-center pt-4">
            <p className="text-sm text-[#888899]">~{(5 - progress) * 4} seconds remaining</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ResultsState({
  activeTab,
  setActiveTab
}: {
  activeTab: 'standard' | 'dyslexia' | 'adhd';
  setActiveTab: (tab: 'standard' | 'dyslexia' | 'adhd') => void;
}) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 border border-[#E8E8F0] flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="text-sm text-[#888899]">Class 5 · Science · Chapter 2 · Components of Food</span>
          <span className="px-3 py-1.5 bg-green-100 text-green-700 text-xs rounded-full flex items-center gap-1.5 font-medium">
            <Check className="w-3.5 h-3.5" />
            All objectives verified
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-gradient-to-r from-[#2D9B87] to-[#52B788] text-white rounded-xl hover:shadow-lg transition-all flex items-center gap-2 text-sm font-medium">
            <Download className="w-4 h-4" />
            Download All (ZIP)
          </button>
          <button className="px-4 py-2 border border-[#E8E8F0] text-[#888899] hover:text-[#2D9B87] hover:border-[#2D9B87] rounded-xl transition-all flex items-center gap-2 text-sm font-medium">
            <Share2 className="w-4 h-4" />
            Share
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <WorksheetPanel
          title="STANDARD · EDITION A"
          color="blue"
          content={
            <>
              <h3 className="font-bold text-base mb-3 text-[#1A1A2E]">Components of Food</h3>
              <p className="text-sm text-[#444455] mb-4 leading-relaxed">
                Food is essential for our survival. Different foods contain different nutrients that help our body grow and stay healthy.
              </p>
              <h4 className="font-bold text-sm mb-2 text-[#1A1A2E]">Main Nutrients</h4>
              <ul className="text-sm text-[#444455] space-y-2 list-disc list-inside leading-relaxed">
                <li>Carbohydrates provide energy</li>
                <li>Proteins help in growth and repair</li>
                <li>Fats store energy</li>
                <li>Vitamins and minerals keep us healthy</li>
              </ul>
            </>
          }
        />

        <WorksheetPanel
          title="DYSLEXIA-FRIENDLY · EDITION B"
          color="teal"
          content={
            <div style={{ lineHeight: '2.2' }}>
              <h3 className="font-bold text-base mb-4 text-[#1A1A2E]">Com·po·nents of Food</h3>
              <p className="text-sm text-[#444455] mb-5">Food is es·sen·tial for our sur·vi·val.</p>
              <p className="text-sm text-[#444455] mb-5">Dif·fer·ent foods con·tain dif·fer·ent nu·tri·ents.</p>
              <h4 className="font-bold text-sm mb-3 text-[#1A1A2E]">Main Nu·tri·ents</h4>
              <div className="text-sm text-[#444455] space-y-3">
                <p>• Car·bo·hy·drates give en·er·gy</p>
                <p>• Pro·teins help us grow</p>
                <p>• Fats store en·er·gy</p>
                <p>• Vi·ta·mins keep us heal·thy</p>
              </div>
            </div>
          }
        />

        <WorksheetPanel
          title="DYSCALCULIA / ADHD · EDITION C"
          color="orange"
          content={
            <>
              <h3 className="font-bold text-base mb-4 text-[#1A1A2E]">Components of Food</h3>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-3 mb-4 rounded-lg">
                <div className="text-xs font-bold text-blue-700 mb-1">DEFINITION</div>
                <p className="text-sm text-[#444455]">Food gives us energy and keeps us healthy</p>
              </div>
              <div className="space-y-3 mb-4">
                {['Carbohydrates - Give us energy to play and study', 'Proteins - Help our body grow strong', 'Fats - Store extra energy for later', 'Vitamins - Keep us from getting sick'].map((item, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-lg bg-gradient-to-br from-[#2D9B87] to-[#52B788] text-white flex items-center justify-center text-sm font-bold">{i + 1}</div>
                    <p className="text-sm text-[#444455]">{item}</p>
                  </div>
                ))}
              </div>
              <div className="bg-green-50 border-l-4 border-green-500 p-3 rounded-lg">
                <div className="text-xs font-bold text-green-700 mb-1">REMEMBER</div>
                <p className="text-sm text-[#444455]">We need ALL these nutrients every day!</p>
              </div>
            </>
          }
        />
      </div>
    </div>
  );
}

function WorksheetPanel({ title, color, content }: { title: string; color: 'blue' | 'teal' | 'orange'; content: React.ReactNode }) {
  const gradients = {
    blue: 'from-blue-500 to-blue-600',
    teal: 'from-teal-500 to-teal-600',
    orange: 'from-orange-500 to-orange-600'
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-[#E8E8F0] flex flex-col h-[600px]">
      <div className={`bg-gradient-to-r ${gradients[color]} text-white px-4 py-4 flex items-center justify-between`}>
        <span className="text-xs font-bold">{title}</span>
        <div className="flex gap-2">
          <button className="hover:bg-white/20 p-1.5 rounded-lg transition-colors" title="Download PDF">
            <FileText className="w-4 h-4" />
          </button>
          <button className="hover:bg-white/20 p-1.5 rounded-lg transition-colors" title="Download DOCX">
            <FileDown className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-6">
        {content}
      </div>
    </div>
  );
}
