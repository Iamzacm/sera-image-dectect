export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { base64, mediaType } = req.body;
    if (!base64 || !mediaType) return res.status(400).json({ error: "Missing image data" });

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1000,
        messages: [{
          role: "user",
          content: [
            { type: "image", source: { type: "base64", media_type: mediaType, data: base64 } },
            { type: "text", text: `You are an expert forensic image analyst. Detect if this image is AI-generated.\n\nCheck for: unnatural textures/lighting, hand/finger artifacts, background distortions, overly perfect symmetry, missing camera grain, AI model signatures (Midjourney, DALL-E, Stable Diffusion, etc.).\n\nReply ONLY with valid JSON — no markdown:\n{"ai_probability": <integer 0-100>, "reasoning": "<2-3 sentences>"}` }
          ]
        }]
      })
    });

    const data = await response.json();
    const text = (data.content || []).find(c => c.type === "text")?.text || "";
    const parsed = JSON.parse(text.replace(/```json|```/g, "").trim());
    res.status(200).json(parsed);
  } catch (e) {
    res.status(500).json({ error: "Analysis failed" });
  }
}
