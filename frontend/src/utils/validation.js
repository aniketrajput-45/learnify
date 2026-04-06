export const validateAnswer = (code, language, testCases) => {
  if (!code || code.trim() === '') {
    return {
      success: false,
      logs: ["Failed: No code provided."]
    };
  }

  if (language === 'javascript') {
    const logs = [];
    let allPassed = true;

    try {
      // Create the function from the user's code
      // We assume the user's code is something like: function sum(arr) { ... }
      // Or they just wrote the body. We'll try to extract the function name from the first test case's template if possible, 
      // but for now, we'll just evaluate the code and call the function.
      
      // To be more robust, we'll wrap the user code and then call the function by name.
      const functionNameMatch = code.match(/function\s+([a-zA-Z0-9_]+)/) || code.match(/const\s+([a-zA-Z0-9_]+)\s*=/);
      const functionName = functionNameMatch ? functionNameMatch[1] : null;

      if (!functionName) {
        return {
          success: false,
          logs: ["Error: Could not find a valid function definition. Please use 'function myFuncName() { ... }'."]
        };
      }

      // Capture console.log
      const capturedLogs = [];
      const originalConsoleLog = console.log;
      console.log = (...args) => {
        capturedLogs.push(`> ${args.map(a => typeof a === 'object' ? JSON.stringify(a) : a).join(' ')}`);
      };

      try {
        // Evaluate the user's code in a local scope
        const userFunc = new Function(`${code}; return ${functionName};`)();

        testCases.forEach((tc, index) => {
          const result = userFunc(...tc.input);
          const expected = JSON.stringify(tc.expected);
          const actual = JSON.stringify(result);

          if (actual === expected) {
            logs.push(`✅ Test ${index + 1}: Passed!`);
          } else {
            logs.push(`❌ Test ${index + 1}: Failed. Expected ${expected}, got ${actual}`);
            allPassed = false;
          }
        });
      } finally {
        // Restore console.log
        console.log = originalConsoleLog;
        logs.unshift(...capturedLogs); // Add console.log outputs to the beginning of logs
      }

      return {
        success: allPassed,
        logs: allPassed ? ["✨ Excellent! All spells cast correctly!", ...logs] : ["💥 Your spell fizzled out!", ...logs]
      };

    } catch (error) {
      return {
        success: false,
        logs: [`⚠️ Magical Backlash (Error): ${error.message}`]
      };
    }
  }

  // For other languages, we'll keep a "Simulated Success" for now, 
  // but we'll make it smarter (check if code is not empty)
  const isNotEmpty = code.length > 20 && !code.includes('pass');
  return {
    success: isNotEmpty,
    logs: isNotEmpty 
      ? ["Spell cast successfully (Simulated for " + language + ")"] 
      : ["Your spell was too weak! (Did you complete the function?)"]
  };
};
