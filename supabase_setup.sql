
-- Run this in your Supabase SQL Editor to create the members table

CREATE TABLE members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  name TEXT NOT NULL CHECK (length(trim(name)) >= 2),
  phone TEXT NOT NULL CHECK (length(trim(phone)) >= 5),
  email TEXT NOT NULL CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$') UNIQUE,
  linkedin TEXT NOT NULL CHECK (linkedin ILIKE '%linkedin.com%'),
  github TEXT CHECK (github IS NULL OR github ILIKE '%github.com%')
);

-- Enable Row Level Security (RLS)
ALTER TABLE members ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (For the join form)
CREATE POLICY "Enable insert for everyone" ON members FOR INSERT WITH CHECK (true);

-- Allow authenticated users to view
CREATE POLICY "Enable read for authenticated users only" ON members FOR SELECT USING (auth.role() = 'authenticated');
