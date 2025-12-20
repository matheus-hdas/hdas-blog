"use server";

import axios from "axios";

export const sendPromptToGemini = async ({ prompt }: { prompt: string }) => {
  const baseUrl: string = process.env.GEMINI_API_BASE_URL || "";
  const apiKey: string = process.env.GEMINI_API_KEY || "";

  const request = await axios.post(baseUrl, {
    headers: {
      "x-goog-api-key": apiKey,
    },
    contents: [{ parts: [{ text: prompt }] }],
  });

  try {
    let response: string = request.data.candidates[0].content.parts[0].text;
    response = response.replace("```json", "").replace("```", "");

    return JSON.parse(response);
  } catch {
    return {
      error: "Error while gemini response",
    };
  }
};
