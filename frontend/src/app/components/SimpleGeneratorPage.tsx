import { useState } from 'react';
import { SimpleNavbar } from './SimpleNavbar';
import {
  Sparkles, Upload, Camera, Download, Share2,
  Check, FileText, FileDown, CheckCircle2
} from 'lucide-react';

type GeneratorState = 'empty' | 'loading' | 'results';
type InputMode = 'ncert' | 'pdf' | 'camera';

export function SimpleGeneratorPage() {
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
    <div className="min-h-screen bg-gradient-to-b from-[#F7FAFC] to-white">
      <SimpleNavbar />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#2B3440] mb-2">Generate Accessible Worksheets</h1>
          <p className="text-[#718096]">Create three versions of any chapter in just 20 seconds</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Panel - Input */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 border border-[#E2E8F0] shadow-sm sticky top-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2D9B87] to-[#52B788] flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <h2 className="font-bold text-lg text-[#2B3440]">Setup</h2>
              </div>

              {/* Input Mode */}
              <div className="mb-6">
                <label className="text-sm font-semibold text-[#2B3440] mb-3 block">Choose source</label>

                <div className="flex gap-2 bg-[#F7FAFC] p-1 rounded-xl mb-4">
                  <button
                    onClick={() => setInputMode('ncert')}
                    className={`flex-1 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                      inputMode === 'ncert'
                        ? 'bg-white text-[#2D9B87] shadow-sm'
                        : 'text-[#718096] hover:text-[#2D9B87]'
                    }`}
                  >
                    NCERT Library
                  </button>
                  <button
                    onClick={() => setInputMode('pdf')}
                    className={`flex-1 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                      inputMode === 'pdf'
                        ? 'bg-white text-[#2D9B87] shadow-sm'
                        : 'text-[#718096] hover:text-[#2D9B87]'
                    }`}
                  >
                    Upload PDF
                  </button>
                  <button
                    onClick={() => setInputMode('camera')}
                    className={`flex-1 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                      inputMode === 'camera'
                        ? 'bg-white text-[#2D9B87] shadow-sm'
                        : 'text-[#718096] hover:text-[#2D9B87]'
                    }`}
                  >
                    Camera
                  </button>
                </div>

                {inputMode === 'ncert' && (
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs font-medium text-[#718096] mb-1.5 block">Class</label>
                      <select
                        value={selectedClass}
                        onChange={(e) => setSelectedClass(e.target.value)}
                        className="w-full px-4 py-3 border border-[#E2E8F0] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2D9B87]/30 bg-white"
                      >
                        <option value="">Select class...</option>
                        {[1,2,3,4,5,6,7,8].map(c => (
                          <option key={c} value={c}>Class {c}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-medium text-[#718096] mb-1.5 block">Subject</label>
                      <select
                        value={selectedSubject}
                        onChange={(e) => setSelectedSubject(e.target.value)}
                        className="w-full px-4 py-3 border border-[#E2E8F0] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2D9B87]/30 bg-white"
                        disabled={!selectedClass}
                      >
                        <option value="">Select subject...</option>
                        <option value="mathematics">Mathematics</option>
                        <option value="science">Science</option>
                        <option value="english">English</option>
                        <option value="hindi">Hindi</option>
                        <option value="social">Social Science</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-medium text-[#718096] mb-1.5 block">Chapter</label>
                      <select
                        value={selectedChapter}
                        onChange={(e) => setSelectedChapter(e.target.value)}
                        className="w-full px-4 py-3 border border-[#E2E8F0] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2D9B87]/30 bg-white"
                        disabled={!selectedSubject}
                      >
                        <option value="">Select chapter...</option>
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
                      <div className="bg-[#E6F7F4] border border-[#2D9B87]/30 rounded-xl p-3">
                        <p className="text-xs text-[#2D9B87] font-medium">
                          ✓ Class 5 · Science · Chapter 2: Components of Food
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {inputMode === 'pdf' && (
                  <div className="border-2 border-dashed border-[#E2E8F0] rounded-xl p-8 text-center hover:border-[#2D9B87] transition-colors cursor-pointer">
                    <Upload className="w-10 h-10 text-[#718096] mx-auto mb-3" />
                    <p className="text-sm text-[#2B3440] font-medium mb-1">Drop your PDF here</p>
                    <p className="text-xs text-[#718096]">or click to browse</p>
                  </div>
                )}

                {inputMode === 'camera' && (
                  <div className="border-2 border-dashed border-[#E2E8F0] rounded-xl p-8 text-center hover:border-[#2D9B87] transition-colors cursor-pointer">
                    <Camera className="w-10 h-10 text-[#718096] mx-auto mb-3" />
                    <p className="text-sm text-[#2B3440] font-medium mb-1">Upload textbook photos</p>
                    <p className="text-xs text-[#718096]">One page per photo</p>
                  </div>
                )}
              </div>

              <div className="h-px bg-[#E2E8F0] my-6"></div>

              {/* Version Selection */}
              <div className="mb-6">
                <label className="text-sm font-semibold text-[#2B3440] mb-3 block">Select versions</label>

                <div className="space-y-3">
                  {[
                    { key: 'standard', label: 'Standard', desc: 'Improved clarity for all learners', badge: null },
                    { key: 'dyslexia', label: 'Dyslexia Edition', desc: 'Shorter sentences, wider spacing', badge: 'Edition B' },
                    { key: 'adhd', label: 'ADHD / Dyscalculia', desc: 'Step-by-step, visual anchors', badge: 'Edition C' }
                  ].map((version) => (
                    <label
                      key={version.key}
                      className={`flex items-start gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                        selectedVersions[version.key as keyof typeof selectedVersions]
                          ? 'border-[#2D9B87] bg-[#E6F7F4]/50'
                          : 'border-[#E2E8F0] bg-white hover:border-[#2D9B87]/30'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedVersions[version.key as keyof typeof selectedVersions]}
                        onChange={(e) => setSelectedVersions({...selectedVersions, [version.key]: e.target.checked})}
                        className="mt-1 accent-[#2D9B87] w-4 h-4"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-semibold text-[#2B3440]">{version.label}</span>
                          {version.badge && (
                            <span className="px-2 py-0.5 bg-teal-100 text-teal-700 text-xs rounded-full font-medium">
                              {version.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[#718096]">{version.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="h-px bg-[#E2E8F0] my-6"></div>

              {/* Language */}
              <div className="mb-6">
                <label className="text-sm font-semibold text-[#2B3440] mb-3 block">Language</label>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setLanguage('english')}
                    className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      language === 'english'
                        ? 'bg-gradient-to-r from-[#2D9B87] to-[#52B788] text-white shadow-lg shadow-teal-500/30'
                        : 'bg-[#F7FAFC] text-[#718096] border border-[#E2E8F0] hover:border-[#2D9B87]'
                    }`}
                  >
                    English
                  </button>
                  <button
                    onClick={() => setLanguage('hindi')}
                    className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      language === 'hindi'
                        ? 'bg-gradient-to-r from-[#2D9B87] to-[#52B788] text-white shadow-lg shadow-teal-500/30'
                        : 'bg-[#F7FAFC] text-[#718096] border border-[#E2E8F0] hover:border-[#2D9B87]'
                    }`}
                  >
                    Hindi
                  </button>
                </div>

                <div className="flex flex-wrap gap-2 mt-3">
                  <span className="px-3 py-1 bg-[#F7FAFC] text-[#718096] text-xs rounded-full border border-[#E2E8F0]">
                    Tamil · Coming soon
                  </span>
                  <span className="px-3 py-1 bg-[#F7FAFC] text-[#718096] text-xs rounded-full border border-[#E2E8F0]">
                    Telugu · Coming soon
                  </span>
                </div>
              </div>

              {/* Generate Button */}
              <button
                onClick={handleGenerate}
                disabled={!selectedChapter && inputMode === 'ncert'}
                className="w-full h-14 bg-gradient-to-r from-[#F58B4C] to-[#F4A261] text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-orange-500/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Sparkles className="w-5 h-5" />
                Generate All Versions
              </button>
              <p className="text-xs text-[#718096] text-center mt-3">~20 seconds · Powered by AI</p>
            </div>
          </div>

          {/* Right Panel - Preview */}
          <div className="lg:col-span-2">
            {state === 'empty' && <EmptyState />}
            {state === 'loading' && <LoadingState progress={loadingProgress} />}
            {state === 'results' && <ResultsState />}
          </div>
        </div>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="grid grid-cols-3 gap-6">
      {/* Panel 1 - Standard skeleton */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-[#E2E8F0]">
        <div className="h-14 bg-blue-100"></div>
        <div className="p-6 space-y-4">
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded-lg w-3/4 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded-lg w-full animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded-lg w-5/6 animate-pulse"></div>
          </div>
          <div className="space-y-3">
            <div className="h-3 bg-gray-200 rounded-lg w-full animate-pulse"></div>
            <div className="h-3 bg-gray-200 rounded-lg w-4/5 animate-pulse"></div>
            <div className="h-3 bg-gray-200 rounded-lg w-5/6 animate-pulse"></div>
            <div className="h-3 bg-gray-200 rounded-lg w-full animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Panel 2 - Dyslexia skeleton with accent bar */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-[#E2E8F0]">
        <div className="h-14 bg-teal-100 border-t-4 border-[#2D9B87]"></div>
        <div className="p-6 space-y-5">
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded-lg w-2/3 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded-lg w-4/5 animate-pulse"></div>
          </div>
          <div className="space-y-4">
            <div className="h-3 bg-gray-200 rounded-lg w-5/6 animate-pulse"></div>
            <div className="h-3 bg-gray-200 rounded-lg w-3/4 animate-pulse"></div>
            <div className="h-3 bg-gray-200 rounded-lg w-4/5 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Panel 3 - ADHD skeleton with pill elements */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-[#E2E8F0]">
        <div className="h-14 bg-orange-100"></div>
        <div className="p-6 space-y-4">
          <div className="h-4 bg-gray-200 rounded-lg w-3/4 animate-pulse"></div>
          <div className="flex gap-2">
            <div className="h-6 w-6 bg-gray-200 rounded-lg animate-pulse"></div>
            <div className="flex-1 h-3 bg-gray-200 rounded-full animate-pulse"></div>
          </div>
          <div className="flex gap-2">
            <div className="h-6 w-6 bg-gray-200 rounded-lg animate-pulse"></div>
            <div className="flex-1 h-3 bg-gray-200 rounded-full animate-pulse"></div>
          </div>
          <div className="flex gap-2">
            <div className="h-6 w-6 bg-gray-200 rounded-lg animate-pulse"></div>
            <div className="flex-1 h-3 bg-gray-200 rounded-full animate-pulse"></div>
          </div>
          <div className="h-12 bg-gray-200 rounded-lg animate-pulse mt-4"></div>
        </div>
      </div>
    </div>
  );
}

function LoadingState({ progress }: { progress: number }) {
  const steps = [
    { label: 'Analysing chapter content', icon: 'check' },
    { label: 'Generating accessible versions', icon: progress >= 2 ? 'spinner' : 'circle' },
    { label: 'Running quality checks', icon: 'circle' }
  ];

  return (
    <div className="space-y-6">
      {/* Animated skeleton panels */}
      <div className="grid grid-cols-3 gap-6">
        {[0, 1, 2].map((i) => (
          <div key={i} className="bg-white rounded-2xl shadow-sm overflow-hidden border border-[#E2E8F0]">
            <div className={`h-14 ${i === 0 ? 'bg-blue-200' : i === 1 ? 'bg-teal-200 border-t-4 border-[#2D9B87]' : 'bg-orange-200'} animate-pulse`}></div>
            <div className="p-6 space-y-4">
              <div className="space-y-3 animate-pulse">
                <div className="h-4 bg-gray-200 rounded-lg w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded-lg w-full"></div>
                <div className="h-4 bg-gray-200 rounded-lg w-5/6"></div>
              </div>
              {i === 2 && (
                <div className="space-y-2 animate-pulse">
                  <div className="flex gap-2">
                    <div className="h-6 w-6 bg-gray-300 rounded-lg"></div>
                    <div className="flex-1 h-3 bg-gray-200 rounded-full"></div>
                  </div>
                  <div className="flex gap-2">
                    <div className="h-6 w-6 bg-gray-300 rounded-lg"></div>
                    <div className="flex-1 h-3 bg-gray-200 rounded-full"></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Progress indicator */}
      <div className="bg-white rounded-2xl p-8 border border-[#E2E8F0]">
        <div className="max-w-lg mx-auto">
          <div className="space-y-5">
            {steps.map((step, index) => (
              <div key={index} className="flex items-center gap-4">
                {step.icon === 'check' ? (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#2D9B87] to-[#52B788] flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-white" />
                  </div>
                ) : step.icon === 'spinner' ? (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#2D9B87] to-[#52B788] flex items-center justify-center flex-shrink-0 animate-pulse">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-full border-2 border-[#E2E8F0] flex-shrink-0"></div>
                )}
                <span className={`text-base ${step.icon !== 'circle' ? 'text-[#2B3440] font-medium' : 'text-[#718096]'}`}>
                  {step.label}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-[#E2E8F0] text-center">
            <p className="text-lg font-medium text-[#2D9B87]">~18 seconds remaining</p>
            <p className="text-sm text-[#718096] mt-1">Generating all three versions...</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ResultsState() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 border border-[#E2E8F0] flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="text-sm text-[#718096]">Class 5 · Science · Chapter 2 · Components of Food</span>
          <span className="px-3 py-1.5 bg-green-100 text-green-700 text-xs rounded-full flex items-center gap-1.5 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5" />
            All versions ready
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-gradient-to-r from-[#2D9B87] to-[#52B788] text-white rounded-xl hover:shadow-lg transition-all flex items-center gap-2 text-sm font-medium">
            <Download className="w-4 h-4" />
            Download All (ZIP)
          </button>
          <button className="px-4 py-2 border border-[#E2E8F0] text-[#718096] hover:text-[#2D9B87] hover:border-[#2D9B87] rounded-xl transition-all flex items-center gap-2 text-sm font-medium">
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
              <h3 className="font-bold text-base mb-3 text-[#2B3440]">Components of Food</h3>
              <p className="text-sm text-[#4A5568] mb-4 leading-relaxed">
                Food is essential for our survival. Different foods contain different nutrients that help our body grow and stay healthy.
              </p>
              <h4 className="font-bold text-sm mb-2 text-[#2B3440]">Main Nutrients</h4>
              <ul className="text-sm text-[#4A5568] space-y-2 list-disc list-inside leading-relaxed">
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
              <h3 className="font-bold text-base mb-4 text-[#2B3440]">Com·po·nents of Food</h3>
              <p className="text-sm text-[#4A5568] mb-5">Food is es·sen·tial for our sur·vi·val.</p>
              <p className="text-sm text-[#4A5568] mb-5">Dif·fer·ent foods con·tain dif·fer·ent nu·tri·ents.</p>
              <h4 className="font-bold text-sm mb-3 text-[#2B3440]">Main Nu·tri·ents</h4>
              <div className="text-sm text-[#4A5568] space-y-3">
                <p>• Car·bo·hy·drates give en·er·gy</p>
                <p>• Pro·teins help us grow</p>
                <p>• Fats store en·er·gy</p>
                <p>• Vi·ta·mins keep us heal·thy</p>
              </div>
            </div>
          }
        />

        <WorksheetPanel
          title="ADHD / DYSCALCULIA · EDITION C"
          color="orange"
          content={
            <>
              <h3 className="font-bold text-base mb-4 text-[#2B3440]">Components of Food</h3>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-3 mb-4 rounded-lg">
                <div className="text-xs font-bold text-blue-700 mb-1">DEFINITION</div>
                <p className="text-sm text-[#4A5568]">Food gives us energy and keeps us healthy</p>
              </div>
              <div className="space-y-3 mb-4">
                {['Carbohydrates - Give us energy', 'Proteins - Help us grow', 'Fats - Store energy', 'Vitamins - Keep us healthy'].map((item, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-lg bg-gradient-to-br from-[#2D9B87] to-[#52B788] text-white flex items-center justify-center text-sm font-bold">{i + 1}</div>
                    <p className="text-sm text-[#4A5568]">{item}</p>
                  </div>
                ))}
              </div>
              <div className="bg-green-50 border-l-4 border-green-500 p-3 rounded-lg">
                <div className="text-xs font-bold text-green-700 mb-1">REMEMBER</div>
                <p className="text-sm text-[#4A5568]">We need ALL these nutrients!</p>
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
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-[#E2E8F0] flex flex-col h-[600px]">
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
