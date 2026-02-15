
-- Run this in your Supabase SQL Editor to create the members table

CREATE TABLE members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  linkedin TEXT NOT NULL,
  github TEXT
);

-- Enable Row Level Security (RLS)
ALTER TABLE members ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (For the join form)
CREATE POLICY "Enable insert for everyone" ON members FOR INSERT WITH CHECK (true);

-- Allow authenticated users to view
CREATE POLICY "Enable read for authenticated users only" ON members FOR SELECT USING (auth.role() = 'authenticated');
