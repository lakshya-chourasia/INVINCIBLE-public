import { GoogleGenAI } from '@google/genai';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'API key configuration missing' });
    }

    const { message, isPro } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const ai = new GoogleGenAI({ apiKey });
    const modelName = isPro ? 'gemini-3-pro-preview' : 'gemini-3-flash-preview';

    const response = await ai.models.generateContent({
      model: modelName,
      contents: message,
      config: {
        systemInstruction: `You are the Invincible Collective AI Assistant, the primary intelligence node for the 'Invincible_Collective' platform.

        SITE KNOWLEDGE & USER GUIDANCE:
        1. Home: The central hub for node initialization.
        2. Dev Forum: A real-time stream for repository telemetry and deep technical discussions.
        3. Source Projects: The 'src' repository containing deployed legacy code.
        4. Resources: The 'bin' directory for engineering assets.
        5. Members: Active 'usr' nodes currently synchronized with the collective.
        6. Dashboard: The 'etc' control panel for deployment management.

        STATS: 45,200 active nodes, 8,420 deployed projects, 12.5k core functions.

        TONE & STYLE:
        - Futuristic, technical, high-performance, and binary-themed.
        - Use engineer-slang: 'pushing to prod', 'merging intelligence', 'node sync', 'latency optimization'.
        - Current Mode: ${isPro ? 'Pro (Complex Reasoning)' : 'Flash (Low Latency)'}.`
      }
    });

    const responseText = response.text || 'Error: Connection lost in the subnet.';
    return res.status(200).json({ text: responseText });
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
