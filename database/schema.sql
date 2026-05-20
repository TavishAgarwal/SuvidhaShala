-- ============================================================
-- SuvidhaShala — Database Schema
-- Run this entire file in the Supabase SQL editor before
-- starting the backend server.
-- ============================================================

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================
-- Table 1: chapters
-- Stores pre-processed NCERT chapter content.
-- ============================================================
CREATE TABLE IF NOT EXISTS chapters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  class_num INTEGER NOT NULL CHECK (class_num BETWEEN 1 AND 10),
  subject VARCHAR(50) NOT NULL,
  chapter_num INTEGER NOT NULL CHECK (chapter_num > 0),
  chapter_title VARCHAR(200) NOT NULL,
  language VARCHAR(20) DEFAULT 'english',
  content_json JSONB NOT NULL,
  learning_objectives TEXT[],
  word_count INTEGER,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(class_num, subject, chapter_num, language)
);

-- Index for common queries
CREATE INDEX IF NOT EXISTS idx_chapters_class_subject
  ON chapters(class_num, subject);
CREATE INDEX IF NOT EXISTS idx_chapters_language
  ON chapters(language);

-- ============================================================
-- Table 2: generation_jobs
-- Tracks every generation request for caching and analytics.
-- ============================================================
CREATE TABLE IF NOT EXISTS generation_jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  chapter_id UUID REFERENCES chapters(id) ON DELETE SET NULL,
  source_type VARCHAR(20) NOT NULL CHECK (source_type IN ('library', 'upload', 'camera')),
  versions_requested TEXT[] NOT NULL,
  language VARCHAR(20) DEFAULT 'english',
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'done', 'failed', 'expired')),
  standard_file_url TEXT,
  dyslexia_file_url TEXT,
  adhd_file_url TEXT,
  standard_docx_url TEXT,
  dyslexia_docx_url TEXT,
  adhd_docx_url TEXT,
  quality_score JSONB,
  generation_time_ms INTEGER,
  created_at TIMESTAMP DEFAULT NOW(),
  expires_at TIMESTAMP
);

-- Index for download lookups
CREATE INDEX IF NOT EXISTS idx_generation_jobs_status
  ON generation_jobs(status);
CREATE INDEX IF NOT EXISTS idx_generation_jobs_expires
  ON generation_jobs(expires_at);
CREATE INDEX IF NOT EXISTS idx_generation_jobs_created
  ON generation_jobs(created_at);

-- ============================================================
-- Table 3: whatsapp_sessions
-- WhatsApp conversation state per phone number.
-- ============================================================
CREATE TABLE IF NOT EXISTS whatsapp_sessions (
  phone_number VARCHAR(20) PRIMARY KEY,
  conversation_state VARCHAR(50) DEFAULT 'greeting',
  -- states: greeting, awaiting_class, awaiting_subject,
  --         awaiting_chapter, awaiting_version, processing, done
  class_num INTEGER,
  subject VARCHAR(50),
  chapter_num INTEGER,
  version_type VARCHAR(20),
  uploaded_text TEXT,
  last_job_id UUID REFERENCES generation_jobs(id) ON DELETE SET NULL,
  last_message_at TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Index for session lookups
CREATE INDEX IF NOT EXISTS idx_whatsapp_sessions_state
  ON whatsapp_sessions(conversation_state);
CREATE INDEX IF NOT EXISTS idx_whatsapp_sessions_last_message
  ON whatsapp_sessions(last_message_at);

-- ============================================================
-- Storage: Create bucket for generated worksheets
-- Run this in the Supabase dashboard or via API:
--   INSERT INTO storage.buckets (id, name, public)
--   VALUES ('generated-worksheets', 'generated-worksheets', false);
-- ============================================================
