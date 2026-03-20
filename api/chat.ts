import { GoogleGenAI } from '@google/genai';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'API key not configured' });

  try {
    const { content, isPro, systemInstruction } = req.body;
    const ai = new GoogleGenAI({ apiKey });
    const modelName = isPro ? 'gemini-3-pro-preview' : 'gemini-3-flash-preview';
    const response = await ai.models.generateContent({
      model: modelName,
      contents: content,
      config: { systemInstruction }
    });
    return res.status(200).json({ text: response.text });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to generate content' });
  }
}
