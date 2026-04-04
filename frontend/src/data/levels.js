export const levels = [
  {
    id: 1,
    title: "Level 1",
    subtitle: "Arrays",
    description: "Master array manipulation and traversal",
    monster: "Array Slime",
    hp: 500,
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2071&auto=format&fit=crop",
    tutorial: "Arrays are collections of items stored at contiguous memory locations. You can access elements using their index, starting from 0. Use loops to traverse arrays.",
    questions: [
      {
        id: "q1", title: "Sum", description: "Calculate the sum of all elements in an array.",
        examples: "sum([1, 2, 3]) // 6",
        templates: { 
          javascript: "function sum(arr) {\n  \n}", 
          python: "def sum(arr):\n  pass",
          c: "int sum(int arr[], int size) {\n  \n}",
          cpp: "#include <vector>\n\nint sum(std::vector<int> arr) {\n  \n}"
        },
        testCases: [{ input: [[1, 2, 3]], expected: 6 }]
      },
      {
        id: "q2", title: "Max", description: "Find the maximum value in an array.",
        examples: "max([1, 5, 3]) // 5",
        templates: { 
          javascript: "function max(arr) {\n  \n}", 
          python: "def max(arr):\n  pass",
          c: "int max(int arr[], int size) {\n  \n}",
          cpp: "#include <vector>\n\nint max(std::vector<int> arr) {\n  \n}"
        },
        testCases: [{ input: [[1, 5, 3]], expected: 5 }]
      },
      {
        id: "q3", title: "Min", description: "Find the minimum value in an array.",
        examples: "min([1, 5, 3]) // 1",
        templates: { 
          javascript: "function min(arr) {\n  \n}", 
          python: "def min(arr):\n  pass",
          c: "int min(int arr[], int size) {\n  \n}",
          cpp: "#include <vector>\n\nint min(std::vector<int> arr) {\n  \n}"
        },
        testCases: [{ input: [[1, 5, 3]], expected: 1 }]
      },
      {
        id: "q4", title: "Reverse", description: "Reverse the elements of an array.",
        examples: "reverse([1, 2, 3]) // [3, 2, 1]",
        templates: { 
          javascript: "function reverse(arr) {\n  \n}", 
          python: "def reverse(arr):\n  pass",
          c: "void reverse(int arr[], int size) {\n  \n}",
          cpp: "#include <vector>\n\nstd::vector<int> reverse(std::vector<int> arr) {\n  \n}"
        },
        testCases: [{ input: [[1, 2, 3]], expected: [3, 2, 1] }]
      },
      {
        id: "q5", title: "Count Even", description: "Count the number of even integers in an array.",
        examples: "countEven([1, 2, 3, 4]) // 2",
        templates: { 
          javascript: "function countEven(arr) {\n  \n}", 
          python: "def count_even(arr):\n  pass",
          c: "int countEven(int arr[], int size) {\n  \n}",
          cpp: "#include <vector>\n\nint countEven(std::vector<int> arr) {\n  \n}"
        },
        testCases: [{ input: [[1, 2, 3, 4]], expected: 2 }]
      }
    ]
  },
  {
    id: 2,
    title: "Level 2",
    subtitle: "Strings",
    description: "Conquer string operations and patterns",
    monster: "String Serpent",
    hp: 600,
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop",
    tutorial: "Strings are sequences of characters. In most languages, they are immutable. You can concatenate strings, find substrings, and manipulate cases.",
    questions: [
      {
        id: "q6", title: "Length", description: "Return the length of a string without using built-in length properties if possible.",
        examples: "length('hello') // 5",
        templates: { 
          javascript: "function length(str) {\n  return str.length;\n}", 
          python: "def length(s):\n  return len(s)",
          c: "int length(char* str) {\n  \n}",
          cpp: "#include <string>\n\nint length(std::string str) {\n  \n}"
        },
        testCases: [{ input: ["hello"], expected: 5 }]
      },
      {
        id: "q7", title: "Uppercase", description: "Convert a string to uppercase.",
        examples: "uppercase('hello') // 'HELLO'",
        templates: { 
          javascript: "function uppercase(str) {\n  \n}", 
          python: "def uppercase(s):\n  pass",
          c: "void uppercase(char* str) {\n  \n}",
          cpp: "#include <string>\n\nstd::string uppercase(std::string str) {\n  \n}"
        },
        testCases: [{ input: ["hello"], expected: "HELLO" }]
      },
      {
        id: "q8", title: "Reverse", description: "Reverse a string.",
        examples: "reverse('hello') // 'olleh'",
        templates: { 
          javascript: "function reverse(str) {\n  \n}", 
          python: "def reverse(s):\n  pass",
          c: "void reverse(char* str) {\n  \n}",
          cpp: "#include <string>\n\nstd::string reverse(std::string str) {\n  \n}"
        },
        testCases: [{ input: ["hello"], expected: "olleh" }]
      },
      {
        id: "q9", title: "Palindrome", description: "Check if a string is a palindrome.",
        examples: "isPalindrome('racecar') // true",
        templates: { 
          javascript: "function isPalindrome(str) {\n  \n}", 
          python: "def is_palindrome(s):\n  pass",
          c: "#include <stdbool.h>\n\nbool isPalindrome(char* str) {\n  \n}",
          cpp: "#include <string>\n\nbool isPalindrome(std::string str) {\n  \n}"
        },
        testCases: [{ input: ["racecar"], expected: true }]
      },
      {
        id: "q10", title: "Vowels", description: "Count the number of vowels in a string.",
        examples: "countVowels('hello') // 2",
        templates: { 
          javascript: "function countVowels(str) {\n  \n}", 
          python: "def count_vowels(s):\n  pass",
          c: "int countVowels(char* str) {\n  \n}",
          cpp: "#include <string>\n\nint countVowels(std::string str) {\n  \n}"
        },
        testCases: [{ input: ["hello"], expected: 2 }]
      }
    ]
  },
  {
    id: 3,
    title: "Level 3",
    subtitle: "Math",
    description: "Solve mathematical algorithms",
    monster: "Math Wisp",
    hp: 700,
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2070&auto=format&fit=crop",
    tutorial: "Mathematical algorithms often involve loops and modulo operators. Remember edge cases like 0 or negative numbers.",
    questions: [
      {
        id: "q11", title: "Even/Odd", description: "Return 'Even' if the number is even, 'Odd' otherwise.",
        examples: "evenOdd(4) // 'Even'",
        templates: { 
          javascript: "function evenOdd(n) {\n  \n}", 
          python: "def even_odd(n):\n  pass",
          c: "char* evenOdd(int n) {\n  \n}",
          cpp: "#include <string>\n\nstd::string evenOdd(int n) {\n  \n}"
        },
        testCases: [{ input: [4], expected: "Even" }]
      },
      {
        id: "q12", title: "Sum of digits", description: "Calculate the sum of the digits of a positive integer.",
        examples: "sumDigits(123) // 6",
        templates: { 
          javascript: "function sumDigits(n) {\n  \n}", 
          python: "def sum_digits(n):\n  pass",
          c: "int sumDigits(int n) {\n  \n}",
          cpp: "int sumDigits(int n) {\n  \n}"
        },
        testCases: [{ input: [123], expected: 6 }]
      },
      {
        id: "q13", title: "Factorial", description: "Calculate the factorial of a number.",
        examples: "factorial(5) // 120",
        templates: { 
          javascript: "function factorial(n) {\n  \n}", 
          python: "def factorial(n):\n  pass",
          c: "int factorial(int n) {\n  \n}",
          cpp: "int factorial(int n) {\n  \n}"
        },
        testCases: [{ input: [5], expected: 120 }]
      },
      {
        id: "q14", title: "Prime", description: "Check if a number is prime.",
        examples: "isPrime(7) // true",
        templates: { 
          javascript: "function isPrime(n) {\n  \n}", 
          python: "def is_prime(n):\n  pass",
          c: "#include <stdbool.h>\n\nbool isPrime(int n) {\n  \n}",
          cpp: "bool isPrime(int n) {\n  \n}"
        },
        testCases: [{ input: [7], expected: true }]
      },
      {
        id: "q15", title: "GCD", description: "Find the Greatest Common Divisor of two numbers.",
        examples: "gcd(12, 8) // 4",
        templates: { 
          javascript: "function gcd(a, b) {\n  \n}", 
          python: "def gcd(a, b):\n  pass",
          c: "int gcd(int a, int b) {\n  \n}",
          cpp: "int gcd(int a, int b) {\n  \n}"
        },
        testCases: [{ input: [12, 8], expected: 4 }]
      }
    ]
  },
  {
    id: 4,
    title: "Level 4",
    subtitle: "Searching",
    description: "Find elements with precision",
    monster: "Shadow Stalker",
    hp: 800,
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop",
    tutorial: "Searching algorithms help locate items. Linear search checks one by one. Binary search is faster but requires a sorted array.",
    questions: [
      {
        id: "q16", title: "Linear search", description: "Return true if target exists in array, false otherwise.",
        examples: "search([1,2,3], 2) // true",
        templates: { 
          javascript: "function search(arr, target) {\n  \n}", 
          python: "def search(arr, target):\n  pass",
          c: "#include <stdbool.h>\n\nbool search(int arr[], int size, int target) {\n  \n}",
          cpp: "#include <vector>\n\nbool search(std::vector<int> arr, int target) {\n  \n}"
        },
        testCases: [{ input: [[1,2,3], 2], expected: true }]
      },
      {
        id: "q17", title: "Find index", description: "Return the index of the target, or -1 if not found.",
        examples: "findIndex([1,2,3], 3) // 2",
        templates: { 
          javascript: "function findIndex(arr, target) {\n  \n}", 
          python: "def find_index(arr, target):\n  pass",
          c: "int findIndex(int arr[], int size, int target) {\n  \n}",
          cpp: "#include <vector>\n\nint findIndex(std::vector<int> arr, int target) {\n  \n}"
        },
        testCases: [{ input: [[1,2,3], 3], expected: 2 }]
      },
      {
        id: "q18", title: "Count occurrences", description: "Count how many times target appears in array.",
        examples: "count([1,2,2,3], 2) // 2",
        templates: { 
          javascript: "function count(arr, target) {\n  \n}", 
          python: "def count(arr, target):\n  pass",
          c: "int count(int arr[], int size, int target) {\n  \n}",
          cpp: "#include <vector>\n\nint count(std::vector<int> arr, int target) {\n  \n}"
        },
        testCases: [{ input: [[1,2,2,3], 2], expected: 2 }]
      },
      {
        id: "q19", title: "First duplicate", description: "Find the first element that repeats in the array. Return -1 if none.",
        examples: "firstDuplicate([2,1,3,5,3,2]) // 3",
        templates: { 
          javascript: "function firstDuplicate(arr) {\n  \n}", 
          python: "def first_duplicate(arr):\n  pass",
          c: "int firstDuplicate(int arr[], int size) {\n  \n}",
          cpp: "#include <vector>\n\nint firstDuplicate(std::vector<int> arr) {\n  \n}"
        },
        testCases: [{ input: [[2,1,3,5,3,2]], expected: 3 }]
      },
      {
        id: "q20", title: "Missing number", description: "Given array of size n with numbers from 0 to n, find the missing one.",
        examples: "missing([3,0,1]) // 2",
        templates: { 
          javascript: "function missing(arr) {\n  \n}", 
          python: "def missing(arr):\n  pass",
          c: "int missing(int arr[], int size) {\n  \n}",
          cpp: "#include <vector>\n\nint missing(std::vector<int> arr) {\n  \n}"
        },
        testCases: [{ input: [[3,0,1]], expected: 2 }]
      }
    ]
  },
  {
    id: 5,
    title: "Level 5",
    subtitle: "Recursion",
    description: "Break problems into smaller pieces",
    monster: "Gear Golem",
    hp: 1000,
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop",
    tutorial: "Recursion is when a function calls itself. Always define a base case to stop the recursion, otherwise you will get a stack overflow.",
    questions: [
      {
        id: "q21", title: "Factorial", description: "Calculate factorial using recursion.",
        examples: "factorial(5) // 120",
        templates: { 
          javascript: "function factorial(n) {\n  \n}", 
          python: "def factorial(n):\n  pass",
          c: "int factorial(int n) {\n  \n}",
          cpp: "int factorial(int n) {\n  \n}"
        },
        testCases: [{ input: [5], expected: 120 }]
      },
      {
        id: "q22", title: "Fibonacci", description: "Find nth Fibonacci number using recursion.",
        examples: "fib(5) // 5",
        templates: { 
          javascript: "function fib(n) {\n  \n}", 
          python: "def fib(n):\n  pass",
          c: "int fib(int n) {\n  \n}",
          cpp: "int fib(int n) {\n  \n}"
        },
        testCases: [{ input: [5], expected: 5 }]
      },
      {
        id: "q23", title: "Sum array", description: "Sum all elements in an array using recursion.",
        examples: "sumArray([1,2,3]) // 6",
        templates: { 
          javascript: "function sumArray(arr) {\n  \n}", 
          python: "def sum_array(arr):\n  pass",
          c: "int sumArray(int arr[], int size) {\n  \n}",
          cpp: "#include <vector>\n\nint sumArray(std::vector<int> arr) {\n  \n}"
        },
        testCases: [{ input: [[1,2,3]], expected: 6 }]
      },
      {
        id: "q24", title: "Reverse string", description: "Reverse a string using recursion.",
        examples: "reverse('abc') // 'cba'",
        templates: { 
          javascript: "function reverse(str) {\n  \n}", 
          python: "def reverse(s):\n  pass",
          c: "void reverse(char* str) {\n  \n}",
          cpp: "#include <string>\n\nstd::string reverse(std::string str) {\n  \n}"
        },
        testCases: [{ input: ["abc"], expected: "cba" }]
      },
      {
        id: "q25", title: "Power", description: "Calculate base raised to the power of exponent using recursion.",
        examples: "power(2, 3) // 8",
        templates: { 
          javascript: "function power(base, exp) {\n  \n}", 
          python: "def power(base, exp):\n  pass",
          c: "int power(int base, int exp) {\n  \n}",
          cpp: "int power(int base, int exp) {\n  \n}"
        },
        testCases: [{ input: [2, 3], expected: 8 }]
      }
    ]
  }
];
