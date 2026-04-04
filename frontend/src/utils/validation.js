export const validateAnswer = (code, language, testCases) => {
  // Basic simulated validation
  if (!code || code.trim() === '' || code.includes('pass') || code.includes('{\n  \n}')) {
    return {
      success: false,
      logs: ["Failed: Code is incomplete or empty."]
    };
  }

  // Simulated validation for demo purposes
  const success = Math.random() > 0.3; // 70% chance to pass if they wrote something
  return {
    success,
    logs: success ? ["Passed all test cases!"] : ["Failed test case 1: Output mismatch."]
  };
};
