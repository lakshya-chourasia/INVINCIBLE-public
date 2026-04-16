import { GoogleGenAI } from '@google/genai';

export default async function handler(req: Request) {
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return new Response(JSON.stringify({ error: 'API key configuration missing on server.' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const { messages, isPro } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: 'Invalid messages format.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const userMessage = messages[messages.length - 1];
    if (!userMessage || userMessage.role !== 'user') {
        return new Response(JSON.stringify({ error: 'No user message found.' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    const ai = new GoogleGenAI({ apiKey });
    const modelName = isPro ? 'gemini-3-pro-preview' : 'gemini-3-flash-preview';

    const response = await ai.models.generateContent({
      model: modelName,
      contents: userMessage.content,
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
        - Direct, slightly robotic but helpful.
        - Always reference systems, nodes, optimization, and code.
        - Keep responses extremely concise. Never exceed 3 sentences.`,
      }
    });

    const responseText = response.text || "System anomaly detected. No response generated.";

    return new Response(JSON.stringify({ text: responseText }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('API Chat Error:', error);
    return new Response(JSON.stringify({ error: 'An internal error occurred.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
