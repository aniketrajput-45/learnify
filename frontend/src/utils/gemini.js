export const getSenseiHint = async (question, userCode, logs) => {
  if (!import.meta.env.VITE_GEMINI_API_KEY) {
    return "Sensei is currently meditating (API Key missing). Try checking your .env file!";
  }

  try {
    // Dynamic import to handle problematic module exports in Vite
    const GenAIModule = await import("@google/genai");
    
    // Find the constructor in the module object (Vite/ESM/CJS compatibility)
    const GoogleGenerativeAI = GenAIModule.GoogleGenerativeAI || 
                             (GenAIModule.default ? GenAIModule.default.GoogleGenerativeAI : GenAIModule.default);

    if (!GoogleGenerativeAI) {
      throw new Error("Could not find GoogleGenerativeAI in the module exports.");
    }

    const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
      You are the "AlgoQuest Sensei", a wise and encouraging coding mentor in a fantasy-themed DSA game.
      A student is trying to solve a coding challenge and is stuck.
      
      Challenge: ${question.title}
      Description: ${question.description}
      Example: ${question.examples}
      
      User's Current Code:
      \`\`\`javascript
      ${userCode}
      \`\`\`
      
      Battle Logs (Errors):
      ${logs.join('\n')}
      
      Your Goal: Provide a short, wise, and encouraging HINT in a fantasy/RPG style. 
      DO NOT give the full solution code. Focus on the concept they might be missing.
      Keep it under 3-4 sentences.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini Error:", error);
    return "The mystical energy is fading... (Error connecting to AI). Check your console for details!";
  }
};
