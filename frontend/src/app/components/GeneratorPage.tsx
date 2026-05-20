import { useState } from 'react';
import { Navbar } from './Navbar';
import {
  Sparkles, Upload, Camera, Download, Share2,
  Check, Circle, ChevronDown, X, FileText,
  FileDown, CheckCircle2
} from 'lucide-react';

type GeneratorState = 'empty' | 'loading' | 'results';
type InputMode = 'ncert' | 'pdf' | 'camera';

export function GeneratorPage() {
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

    // Simulate loading progress
    const steps = [
      'Analysing chapter content...',
      'Generating Standard version...',
      'Generating Dyslexia version...',
      'Generating Dyscalculia version...',
      'Running quality check...'
    ];

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
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar />

      <div className="flex flex-col lg:flex-row h-[calc(100vh-73px)]">
        {/* Left Sidebar - Input Panel */}
        <div className="w-full lg:w-80 bg-white border-r border-[#D0D8E4] p-6 overflow-y-auto">
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="w-5 h-5 text-[#E67E22]" />
            <h2 className="font-bold text-lg text-[#1A1A2E]">Generate Worksheet</h2>
          </div>

          {/* Section A - Choose Chapter */}
          <div className="mb-6">
            <label className="text-sm font-medium text-[#444455] mb-3 block">Choose a chapter</label>

            {/* Toggle Tabs */}
            <div className="flex gap-1 bg-[#F8FAFC] p-1 rounded-lg mb-4">
              <button
                onClick={() => setInputMode('ncert')}
                className={`flex-1 px-3 py-2 rounded-md text-xs font-medium transition-colors ${
                  inputMode === 'ncert'
                    ? 'bg-white text-[#1B5E8B] shadow-sm'
                    : 'text-[#888899] hover:text-[#444455]'
                }`}
              >
                NCERT Library
              </button>
              <button
                onClick={() => setInputMode('pdf')}
                className={`flex-1 px-3 py-2 rounded-md text-xs font-medium transition-colors ${
                  inputMode === 'pdf'
                    ? 'bg-white text-[#1B5E8B] shadow-sm'
                    : 'text-[#888899] hover:text-[#444455]'
                }`}
              >
                Upload PDF
              </button>
              <button
                onClick={() => setInputMode('camera')}
                className={`flex-1 px-3 py-2 rounded-md text-xs font-medium transition-colors ${
                  inputMode === 'camera'
                    ? 'bg-white text-[#1B5E8B] shadow-sm'
                    : 'text-[#888899] hover:text-[#444455]'
                }`}
              >
                Camera
              </button>
            </div>

            {/* NCERT Library Tab */}
            {inputMode === 'ncert' && (
              <div className="space-y-3">
                <div>
                  <label className="text-xs text-[#888899] mb-1 block">Select Class</label>
                  <select
                    value={selectedClass}
                    onChange={(e) => setSelectedClass(e.target.value)}
                    className="w-full px-3 py-2 border border-[#D0D8E4] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1B5E8B] bg-white"
                  >
                    <option value="">Choose class...</option>
                    {[1,2,3,4,5,6,7,8].map(c => (
                      <option key={c} value={c}>Class {c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs text-[#888899] mb-1 block">Select Subject</label>
                  <select
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value)}
                    className="w-full px-3 py-2 border border-[#D0D8E4] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1B5E8B] bg-white"
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
                  <label className="text-xs text-[#888899] mb-1 block">Select Chapter</label>
                  <select
                    value={selectedChapter}
                    onChange={(e) => setSelectedChapter(e.target.value)}
                    className="w-full px-3 py-2 border border-[#D0D8E4] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1B5E8B] bg-white"
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
                  <p className="text-xs text-[#888899] mt-2">
                    Class 5 · Science · Chapter 2: Components of Food
                  </p>
                )}
              </div>
            )}

            {/* Upload PDF Tab */}
            {inputMode === 'pdf' && (
              <div className="border-2 border-dashed border-[#D0D8E4] rounded-lg p-8 text-center hover:border-[#1B5E8B] transition-colors cursor-pointer">
                <Upload className="w-8 h-8 text-[#888899] mx-auto mb-2" />
                <p className="text-sm text-[#444455] mb-1">Drop your PDF here or click to browse</p>
                <p className="text-xs text-[#888899]">Accepts .pdf files</p>
              </div>
            )}

            {/* Camera Tab */}
            {inputMode === 'camera' && (
              <div className="border-2 border-dashed border-[#D0D8E4] rounded-lg p-8 text-center hover:border-[#1B5E8B] transition-colors cursor-pointer">
                <Camera className="w-8 h-8 text-[#888899] mx-auto mb-2" />
                <p className="text-sm text-[#444455] mb-1">Upload photos of textbook pages</p>
                <p className="text-xs text-[#888899]">Upload pages in order. One page per photo.</p>
              </div>
            )}
          </div>

          <div className="h-px bg-[#D0D8E4] my-6"></div>

          {/* Section B - Choose Versions */}
          <div className="mb-6">
            <label className="text-sm font-medium text-[#444455] mb-3 block">Which versions do you need?</label>

            <div className="space-y-2">
              <label className={`flex items-start gap-3 p-3 border-2 rounded-lg cursor-pointer transition-all ${
                selectedVersions.standard ? 'border-[#1B5E8B] bg-[#E8F4FD]' : 'border-[#D0D8E4] bg-white'
              }`}>
                <input
                  type="checkbox"
                  checked={selectedVersions.standard}
                  onChange={(e) => setSelectedVersions({...selectedVersions, standard: e.target.checked})}
                  className="mt-0.5 accent-[#1B5E8B]"
                />
                <div className="flex-1">
                  <div className="text-sm font-medium text-[#1A1A2E]">Standard</div>
                  <div className="text-xs text-[#888899]">Improved clarity for all learners</div>
                </div>
              </label>

              <label className={`flex items-start gap-3 p-3 border-2 rounded-lg cursor-pointer transition-all ${
                selectedVersions.dyslexia ? 'border-[#1B5E8B] bg-[#E8F4FD]' : 'border-[#D0D8E4] bg-white'
              }`}>
                <input
                  type="checkbox"
                  checked={selectedVersions.dyslexia}
                  onChange={(e) => setSelectedVersions({...selectedVersions, dyslexia: e.target.checked})}
                  className="mt-0.5 accent-[#1B5E8B]"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <div className="text-sm font-medium text-[#1A1A2E]">Dyslexia Edition</div>
                    <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full">Edition B</span>
                  </div>
                  <div className="text-xs text-[#888899]">Shorter sentences, wider spacing, syllable guides</div>
                </div>
              </label>

              <label className={`flex items-start gap-3 p-3 border-2 rounded-lg cursor-pointer transition-all ${
                selectedVersions.adhd ? 'border-[#1B5E8B] bg-[#E8F4FD]' : 'border-[#D0D8E4] bg-white'
              }`}>
                <input
                  type="checkbox"
                  checked={selectedVersions.adhd}
                  onChange={(e) => setSelectedVersions({...selectedVersions, adhd: e.target.checked})}
                  className="mt-0.5 accent-[#1B5E8B]"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <div className="text-sm font-medium text-[#1A1A2E]">Dyscalculia / ADHD Edition</div>
                    <span className="px-2 py-0.5 bg-orange-100 text-orange-700 text-xs rounded-full">Edition C</span>
                  </div>
                  <div className="text-xs text-[#888899]">Step-by-step, visual anchors, progress boxes</div>
                </div>
              </label>
            </div>
          </div>

          <div className="h-px bg-[#D0D8E4] my-6"></div>

          {/* Section C - Language */}
          <div className="mb-8">
            <label className="text-sm font-medium text-[#444455] mb-3 block">Output language</label>

            <div className="flex gap-2">
              <button
                onClick={() => setLanguage('english')}
                className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  language === 'english'
                    ? 'bg-[#1B5E8B] text-white'
                    : 'bg-[#F8FAFC] text-[#888899] hover:bg-[#E8F4FD]'
                }`}
              >
                English
              </button>
              <button
                onClick={() => setLanguage('hindi')}
                className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  language === 'hindi'
                    ? 'bg-[#1B5E8B] text-white'
                    : 'bg-[#F8FAFC] text-[#888899] hover:bg-[#E8F4FD]'
                }`}
              >
                Hindi
              </button>
            </div>

            <div className="flex gap-2 mt-2">
              <span className="px-3 py-1 bg-[#F8FAFC] text-[#888899] text-xs rounded-full">Tamil · Coming soon</span>
              <span className="px-3 py-1 bg-[#F8FAFC] text-[#888899] text-xs rounded-full">Telugu · Coming soon</span>
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            disabled={!selectedChapter && inputMode === 'ncert'}
            className="w-full h-12 bg-[#E67E22] text-white rounded-xl font-medium hover:bg-[#d67118] transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Sparkles className="w-5 h-5" />
            Generate All Versions
          </button>
          <p className="text-xs text-[#888899] text-center mt-2">~20 seconds · Powered by GPT-4o</p>
        </div>

        {/* Right Main Area - Preview Panel */}
        <div className="flex-1 p-4 lg:p-8 overflow-auto">
          {state === 'empty' && <EmptyState />}
          {state === 'loading' && <LoadingState progress={loadingProgress} />}
          {state === 'results' && <ResultsState activeTab={activeTab} setActiveTab={setActiveTab} />}
        </div>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="h-full flex items-center justify-center">
      <div className="text-center max-w-md">
        <div className="mb-6 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-[#E8F4FD] to-[#FEF5EC] rounded-full blur-3xl opacity-30"></div>
          <div className="relative flex justify-center gap-4">
            <div className="w-24 h-32 bg-white rounded-lg shadow-lg transform -rotate-6 border-t-4 border-[#1B5E8B]"></div>
            <div className="w-24 h-32 bg-white rounded-lg shadow-lg transform rotate-0 border-t-4 border-[#3498DB]"></div>
            <div className="w-24 h-32 bg-white rounded-lg shadow-lg transform rotate-6 border-t-4 border-[#E67E22]"></div>
          </div>
        </div>
        <p className="text-lg font-medium text-[#444455] mb-2">Your three versions will appear here</p>
        <p className="text-sm text-[#888899]">Select a chapter and click Generate</p>
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
    <div className="space-y-8">
      {/* Skeleton Cards */}
      <div className="grid grid-cols-3 gap-6">
        {[0, 1, 2].map((i) => (
          <div key={i} className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
            <div className={`h-12 ${i === 0 ? 'bg-[#1B5E8B]' : i === 1 ? 'bg-[#3498DB]' : 'bg-[#E67E22]'} opacity-20`}></div>
            <div className="p-6 space-y-3">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Progress Steps */}
      <div className="max-w-md mx-auto">
        <div className="space-y-3">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center gap-3">
              {index < progress ? (
                <CheckCircle2 className="w-5 h-5 text-[#1E7E34]" />
              ) : index === progress ? (
                <Circle className="w-5 h-5 text-[#1B5E8B] fill-[#1B5E8B]" />
              ) : (
                <Circle className="w-5 h-5 text-[#D0D8E4]" />
              )}
              <span className={`text-sm ${index <= progress ? 'text-[#444455]' : 'text-[#888899]'}`}>
                {step}
              </span>
            </div>
          ))}
        </div>
        <p className="text-center text-sm text-[#888899] mt-6">
          ~{(5 - progress) * 4} seconds remaining
        </p>
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
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-sm text-[#888899]">Class 5 · Science · Chapter 2 · Components of Food</span>
          <span className="px-3 py-1 bg-[#EAF5EA] text-[#1E7E34] text-xs rounded-full flex items-center gap-1">
            <Check className="w-3 h-3" />
            All objectives verified
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-white border border-[#D0D8E4] text-[#444455] rounded-lg hover:bg-[#F8FAFC] transition-colors flex items-center gap-2 text-sm font-medium">
            <Download className="w-4 h-4" />
            Download All (ZIP)
          </button>
          <button className="px-4 py-2 bg-white border border-[#D0D8E4] text-[#444455] rounded-lg hover:bg-[#F8FAFC] transition-colors flex items-center gap-2 text-sm font-medium">
            <Share2 className="w-4 h-4" />
            Share
          </button>
        </div>
      </div>

      {/* Mobile Tabs */}
      <div className="lg:hidden mb-4">
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setActiveTab('standard')}
            className={`flex-1 px-4 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'standard'
                ? 'bg-[#1B5E8B] text-white'
                : 'bg-white border border-[#D0D8E4] text-[#444455]'
            }`}
          >
            Standard
          </button>
          <button
            onClick={() => setActiveTab('dyslexia')}
            className={`flex-1 px-4 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'dyslexia'
                ? 'bg-[#3498DB] text-white'
                : 'bg-white border border-[#D0D8E4] text-[#444455]'
            }`}
          >
            Dyslexia
          </button>
          <button
            onClick={() => setActiveTab('adhd')}
            className={`flex-1 px-4 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'adhd'
                ? 'bg-[#E67E22] text-white'
                : 'bg-white border border-[#D0D8E4] text-[#444455]'
            }`}
          >
            ADHD
          </button>
        </div>
      </div>

      {/* Three Panels - Desktop */}
      <div className="hidden lg:grid grid-cols-3 gap-6 h-[600px]">
        {/* Panel 1 - Standard */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col">
          <div className="bg-[#1B5E8B] text-white px-4 py-3 flex items-center justify-between">
            <span className="text-sm font-bold">STANDARD · EDITION A</span>
            <div className="flex gap-2">
              <button className="hover:bg-white/20 p-1 rounded" title="Download PDF">
                <FileText className="w-4 h-4" />
              </button>
              <button className="hover:bg-white/20 p-1 rounded" title="Download DOCX">
                <FileDown className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-5">
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
          </div>
        </div>

        {/* Panel 2 - Dyslexia */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col">
          <div className="bg-[#3498DB] text-white px-4 py-3 flex items-center justify-between">
            <span className="text-sm font-bold">DYSLEXIA-FRIENDLY · EDITION B</span>
            <div className="flex gap-2">
              <button className="hover:bg-white/20 p-1 rounded" title="Download PDF">
                <FileText className="w-4 h-4" />
              </button>
              <button className="hover:bg-white/20 p-1 rounded" title="Download DOCX">
                <FileDown className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-5" style={{ lineHeight: '2.2' }}>
            <h3 className="font-bold text-base mb-4 text-[#1A1A2E]">Com·po·nents of Food</h3>
            <p className="text-sm text-[#444455] mb-5">
              Food is es·sen·tial for our sur·vi·val.
            </p>
            <p className="text-sm text-[#444455] mb-5">
              Dif·fer·ent foods con·tain dif·fer·ent nu·tri·ents.
            </p>
            <h4 className="font-bold text-sm mb-3 text-[#1A1A2E]">Main Nu·tri·ents</h4>
            <div className="text-sm text-[#444455] space-y-3">
              <p>• Car·bo·hy·drates give en·er·gy</p>
              <p>• Pro·teins help us grow</p>
              <p>• Fats store en·er·gy</p>
              <p>• Vi·ta·mins keep us heal·thy</p>
            </div>
          </div>
        </div>

        {/* Panel 3 - ADHD */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col">
          <div className="bg-[#E67E22] text-white px-4 py-3 flex items-center justify-between">
            <span className="text-sm font-bold">DYSCALCULIA / ADHD · EDITION C</span>
            <div className="flex gap-2">
              <button className="hover:bg-white/20 p-1 rounded" title="Download PDF">
                <FileText className="w-4 h-4" />
              </button>
              <button className="hover:bg-white/20 p-1 rounded" title="Download DOCX">
                <FileDown className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-5">
            <h3 className="font-bold text-base mb-4 text-[#1A1A2E]">Components of Food</h3>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-3 mb-4 rounded">
              <div className="text-xs font-bold text-blue-700 mb-1">DEFINITION</div>
              <p className="text-sm text-[#444455]">Food gives us energy and keeps us healthy</p>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded bg-[#1B5E8B] text-white flex items-center justify-center text-sm font-bold">1</div>
                <div className="flex-1">
                  <p className="text-sm text-[#444455]"><span className="font-bold">Carbohydrates</span> - Give us energy to play and study</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded bg-[#1B5E8B] text-white flex items-center justify-center text-sm font-bold">2</div>
                <div className="flex-1">
                  <p className="text-sm text-[#444455]"><span className="font-bold">Proteins</span> - Help our body grow strong</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded bg-[#1B5E8B] text-white flex items-center justify-center text-sm font-bold">3</div>
                <div className="flex-1">
                  <p className="text-sm text-[#444455]"><span className="font-bold">Fats</span> - Store extra energy for later</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded bg-[#1B5E8B] text-white flex items-center justify-center text-sm font-bold">4</div>
                <div className="flex-1">
                  <p className="text-sm text-[#444455]"><span className="font-bold">Vitamins</span> - Keep us from getting sick</p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 p-3 rounded">
              <div className="text-xs font-bold text-green-700 mb-1">REMEMBER</div>
              <p className="text-sm text-[#444455]">We need ALL these nutrients every day!</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Single Panel */}
      <div className="lg:hidden">
        {activeTab === 'standard' && (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-[#1B5E8B] text-white px-4 py-3 flex items-center justify-between">
              <span className="text-sm font-bold">STANDARD · EDITION A</span>
              <div className="flex gap-2">
                <button className="hover:bg-white/20 p-1 rounded" title="Download PDF">
                  <FileText className="w-4 h-4" />
                </button>
                <button className="hover:bg-white/20 p-1 rounded" title="Download DOCX">
                  <FileDown className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="p-5 max-h-[500px] overflow-y-auto">
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
            </div>
          </div>
        )}

        {activeTab === 'dyslexia' && (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-[#3498DB] text-white px-4 py-3 flex items-center justify-between">
              <span className="text-sm font-bold">DYSLEXIA-FRIENDLY · EDITION B</span>
              <div className="flex gap-2">
                <button className="hover:bg-white/20 p-1 rounded" title="Download PDF">
                  <FileText className="w-4 h-4" />
                </button>
                <button className="hover:bg-white/20 p-1 rounded" title="Download DOCX">
                  <FileDown className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="p-5 max-h-[500px] overflow-y-auto" style={{ lineHeight: '2.2' }}>
              <h3 className="font-bold text-base mb-4 text-[#1A1A2E]">Com·po·nents of Food</h3>
              <p className="text-sm text-[#444455] mb-5">
                Food is es·sen·tial for our sur·vi·val.
              </p>
              <p className="text-sm text-[#444455] mb-5">
                Dif·fer·ent foods con·tain dif·fer·ent nu·tri·ents.
              </p>
              <h4 className="font-bold text-sm mb-3 text-[#1A1A2E]">Main Nu·tri·ents</h4>
              <div className="text-sm text-[#444455] space-y-3">
                <p>• Car·bo·hy·drates give en·er·gy</p>
                <p>• Pro·teins help us grow</p>
                <p>• Fats store en·er·gy</p>
                <p>• Vi·ta·mins keep us heal·thy</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'adhd' && (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-[#E67E22] text-white px-4 py-3 flex items-center justify-between">
              <span className="text-sm font-bold">DYSCALCULIA / ADHD · EDITION C</span>
              <div className="flex gap-2">
                <button className="hover:bg-white/20 p-1 rounded" title="Download PDF">
                  <FileText className="w-4 h-4" />
                </button>
                <button className="hover:bg-white/20 p-1 rounded" title="Download DOCX">
                  <FileDown className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="p-5 max-h-[500px] overflow-y-auto">
              <h3 className="font-bold text-base mb-4 text-[#1A1A2E]">Components of Food</h3>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-3 mb-4 rounded">
                <div className="text-xs font-bold text-blue-700 mb-1">DEFINITION</div>
                <p className="text-sm text-[#444455]">Food gives us energy and keeps us healthy</p>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded bg-[#1B5E8B] text-white flex items-center justify-center text-sm font-bold">1</div>
                  <div className="flex-1">
                    <p className="text-sm text-[#444455]"><span className="font-bold">Carbohydrates</span> - Give us energy to play and study</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded bg-[#1B5E8B] text-white flex items-center justify-center text-sm font-bold">2</div>
                  <div className="flex-1">
                    <p className="text-sm text-[#444455]"><span className="font-bold">Proteins</span> - Help our body grow strong</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded bg-[#1B5E8B] text-white flex items-center justify-center text-sm font-bold">3</div>
                  <div className="flex-1">
                    <p className="text-sm text-[#444455]"><span className="font-bold">Fats</span> - Store extra energy for later</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded bg-[#1B5E8B] text-white flex items-center justify-center text-sm font-bold">4</div>
                  <div className="flex-1">
                    <p className="text-sm text-[#444455]"><span className="font-bold">Vitamins</span> - Keep us from getting sick</p>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 border-l-4 border-green-500 p-3 rounded">
                <div className="text-xs font-bold text-green-700 mb-1">REMEMBER</div>
                <p className="text-sm text-[#444455]">We need ALL these nutrients every day!</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-center gap-4 pt-4">
        <button className="px-6 py-2 border border-[#D0D8E4] text-[#444455] rounded-lg hover:bg-[#F8FAFC] transition-colors font-medium">
          Regenerate
        </button>
        <button className="px-6 py-2 border border-[#D0D8E4] text-[#444455] rounded-lg hover:bg-[#F8FAFC] transition-colors font-medium">
          Adjust settings
        </button>
        <a href="#" className="text-sm text-[#888899] hover:text-[#1B5E8B]">Report an issue</a>
      </div>
    </div>
  );
}
