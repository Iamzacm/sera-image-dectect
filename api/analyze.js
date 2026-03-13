export default async function handler(req, res) {
  const API_KEY = process.env.ANTHROPIC_API_KEY;

  if (!API_KEY) {
    return res.status(500).json({ error: "API key not configured" });
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { image, mediaType } = req.body;

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 500,
        messages: [
          {
            role: "user",
            content: [
              {
                type: "image",
                source: {
                  type: "base64",
                  media_type: mediaType,
                  data: image
                }
              },
              {
                type: "text",
                text: `Detect if this image is AI generated. 
Return JSON only:
{"ai_probability": number, "reasoning": "short explanation"}`
              }
            ]
          }
        ]
      })
    });

    const data = await response.json();

    res.status(200).json(data);

  } catch (error) {
    res.status(500).json({ error: "Analysis failed" });
  }
              }
