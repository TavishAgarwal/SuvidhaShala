// frontend/src/lib/api.ts
// SuvidhaShala API client — typed interface to the backend

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

// ============================================================
// Types
// ============================================================
export interface Chapter {
  id: string;
  class_num: number;
  subject: string;
  chapter_num: number;
  chapter_title: string;
  language: string;
  learning_objectives: string[];
  word_count: number;
}

export interface VersionResult {
  html: string | null;
  pdfUrl: string | null;
  docxUrl: string | null;
  fidelityScore?: number;
  flagged?: boolean;
  flaggedSections?: { version: string; section: string; reason: string; severity: string }[];
  unavailable?: boolean;
}

export interface QualityReport {
  standard_fidelity: number;
  dyslexia_fidelity: number;
  adhd_fidelity: number;
  flagged_sections: { version: string; section: string; reason: string; severity: string }[];
  all_objectives_verified: boolean;
  objectives_covered: number;
  objectives_total: number;
}

export interface GenerateResponse {
  jobId: string;
  status: string;
  generationTimeMs: number;
  versions: Record<string, VersionResult>;
  qualityReport: QualityReport;
  chapterMeta: { class: number; subject: string; chapterNum: number; title: string };
  fromCache: boolean;
}

// ============================================================
// API Functions
// ============================================================

export async function getChapters(params?: {
  classNum?: number;
  subject?: string;
  language?: string;
}): Promise<Chapter[]> {
  const searchParams = new URLSearchParams();
  if (params?.classNum) searchParams.set('class', String(params.classNum));
  if (params?.subject) searchParams.set('subject', params.subject);
  if (params?.language) searchParams.set('language', params.language);

  const url = `${API_URL}/api/chapters?${searchParams.toString()}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch chapters');
  const data = await res.json();
  return data.chapters || [];
}

export async function generateWorksheet(params: {
  source: 'library' | 'upload' | 'camera';
  chapterId?: string;
  language: string;
  versions: string[];
  files?: File[];
}): Promise<GenerateResponse> {
  const formData = new FormData();
  formData.append('source', params.source);
  formData.append('language', params.language);
  formData.append('versions', JSON.stringify(params.versions));

  if (params.chapterId) {
    formData.append('chapterId', params.chapterId);
  }

  if (params.files) {
    for (const file of params.files) {
      formData.append('files', file);
    }
  }

  const res = await fetch(`${API_URL}/api/generate`, {
    method: 'POST',
    body: formData
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Generation failed' }));
    throw new Error(err.error || 'Generation failed');
  }

  return res.json();
}

export function getDownloadUrl(jobId: string, version: string, format: 'pdf' | 'docx'): string {
  return `${API_URL}/api/download/${jobId}?version=${version}&format=${format}`;
}

export async function checkHealth(): Promise<boolean> {
  try {
    const res = await fetch(`${API_URL}/health`);
    return res.ok;
  } catch {
    return false;
  }
}
