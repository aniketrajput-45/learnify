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

export const validateCodeWithAI = async (question, userCode, language) => {
  if (!import.meta.env.VITE_GEMINI_API_KEY) {
    return { 
      success: false, 
      logs: ["⚠️ Sensei is offline (API Key missing).", "Please add VITE_GEMINI_API_KEY to your .env to enable real-time C/Python/C++ validation."] 
    };
  }

  try {
    const GenAIModule = await import("@google/genai");
    const GoogleGenerativeAI = GenAIModule.GoogleGenerativeAI || 
                             (GenAIModule.default ? GenAIModule.default.GoogleGenerativeAI : GenAIModule.default);

    const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
      You are the "AlgoQuest Judge", an expert competitive programmer.
      Task: Rigorously evaluate if the user's code correctly solves the DSA problem.
      
      Problem: ${question.title}
      Description: ${question.description}
      Example: ${question.examples}
      Language: ${language}
      
      User's Submitted Code:
      \`\`\`${language}
      ${userCode}
      \`\`\`
      
      Criteria for Success:
      1. The code must be logically correct for the problem described.
      2. It must handle the logic shown in the examples.
      3. It must NOT be a placeholder (like just a return statement without logic, or empty function).
      4. It must be valid syntax for ${language}.
      
      Respond ONLY with a JSON object:
      {
        "success": boolean,
        "logs": string[] (3 specific points about why it passed or failed, be critical)
      }
    `;

    const result = await model.generateContent(prompt);
    const responseText = await result.response.text();
    
    // Clean potential markdown around JSON
    const cleanJson = responseText.replace(/```json|```/g, '').trim();
    return JSON.parse(cleanJson);
  } catch (error) {
    console.error("Gemini Validation Error:", error);
    return { success: false, logs: ["The validation crystal is cracked... (AI Error)"] };
  }
};
