export const libraryData = [
  {
    id: 'arrays',
    title: 'Arrays',
    description: 'An array is a collection of items stored at contiguous memory locations. The idea is to store multiple items of the same type together.',
    basics: [
      'Fixed size (usually, unless using dynamic arrays like ArrayList or vectors).',
      'Indexed starting from 0.',
      'Efficient for accessing elements by index (O(1) time).',
      'Insertion and deletion can be slow (O(n) time) as elements may need to be shifted.'
    ],
    syntax: {
      cpp: `int arr[5] = {1, 2, 3, 4, 5};`,
      java: `int[] arr = {1, 2, 3, 4, 5};`,
      python: `arr = [1, 2, 3, 4, 5]`,
      javascript: `const arr = [1, 2, 3, 4, 5];`
    }
  },
  {
    id: 'strings',
    title: 'Strings',
    description: 'A string is a sequence of characters. In many languages, strings are immutable, meaning once created, their value cannot be changed.',
    basics: [
      'Stored as an array of characters.',
      'Common operations include concatenation, substring, and searching.',
      'Often ended with a null character (\\0) in C but treated as objects in modern languages.',
      'Many languages provide a rich set of built-in methods for string manipulation.'
    ],
    syntax: {
      cpp: `#include <string>\nstd::string str = "Hello World";`,
      java: `String str = "Hello World";`,
      python: `str = "Hello World"`,
      javascript: `const str = "Hello World";`
    }
  },
  {
    id: 'linked-lists',
    title: 'Linked Lists',
    description: 'A linked list is a linear data structure where elements are not stored in contiguous locations. Instead, elements are linked using pointers.',
    basics: [
      'Dynamic size.',
      'Efficient insertion and deletion compared to arrays (O(1) if pointer is known).',
      'Random access is not allowed (must traverse from head).',
      'Extra memory for pointers/references.'
    ],
    syntax: {
      cpp: `struct Node {\n  int data;\n  Node* next;\n};`,
      java: `class Node {\n  int data;\n  Node next;\n}`,
      python: `class Node:\n    def __init__(self, data):\n        self.data = data\n        self.next = None`,
      javascript: `class Node {\n  constructor(data) {\n    this.data = data;\n    this.next = null;\n  }\n}`
    }
  },
  {
    id: 'stacks',
    title: 'Stacks',
    description: 'A stack is a linear data structure that follows the LIFO (Last In First Out) principle. Think of it like a stack of plates.',
    basics: [
      'LIFO Principle: The last element added is the first one to be removed.',
      'Push: Adding an element to the top.',
      'Pop: Removing the top element.',
      'Peek/Top: Viewing the top element without removing it.',
      'Used in recursion, undo mechanisms, and expression parsing.'
    ],
    syntax: {
      cpp: `#include <stack>\nstd::stack<int> s;\ns.push(10);\ns.pop();`,
      java: `import java.util.Stack;\nStack<Integer> s = new Stack<>();\ns.push(10);\ns.pop();`,
      python: `s = []\ns.append(10) # Push\ns.pop() # Pop`,
      javascript: `const s = [];\ns.push(10);\ns.pop();`
    }
  },
  {
    id: 'queues',
    title: 'Queues',
    description: 'A queue is a linear data structure that follows the FIFO (First In First Out) principle. Think of it like a line at a movie theater.',
    basics: [
      'FIFO Principle: The first element added is the first one to be removed.',
      'Enqueue: Adding an element to the back.',
      'Dequeue: Removing the front element.',
      'Used in CPU scheduling, print spooling, and BFS traversal.'
    ],
    syntax: {
      cpp: `#include <queue>\nstd::queue<int> q;\nq.push(10);\nq.pop();`,
      java: `import java.util.LinkedList;\nimport java.util.Queue;\nQueue<Integer> q = new LinkedList<>();\nq.add(10);\nq.remove();`,
      python: `from collections import deque\nq = deque()\nq.append(10) # Enqueue\nq.popleft() # Dequeue`,
      javascript: `const q = [];\nq.push(10); // Enqueue\nq.shift(); // Dequeue`
    }
  },
  {
    id: 'trees',
    title: 'Trees',
    description: 'A tree is a non-linear data structure that represents a hierarchical relationship between elements.',
    basics: [
      'Root: The topmost node.',
      'Edge: The link between two nodes.',
      'Leaf: A node with no children.',
      'Binary Tree: Each node has at most two children.',
      'Binary Search Tree (BST): Left child < Parent < Right child.'
    ],
    syntax: {
      cpp: `struct Node {\n  int val;\n  Node *left, *right;\n};`,
      java: `class Node {\n  int val;\n  Node left, right;\n}`,
      python: `class Node:\n    def __init__(self, val):\n        self.val = val\n        self.left = None\n        self.right = None`,
      javascript: `class Node {\n  constructor(val) {\n    this.val = val;\n    this.left = null;\n    this.right = null;\n  }\n}`
    }
  },
  {
    id: 'graphs',
    title: 'Graphs',
    description: 'A graph is a non-linear data structure consisting of nodes (vertices) and the connections between them (edges).',
    basics: [
      'Vertex: A node in the graph.',
      'Edge: A connection between two vertices.',
      'Directed vs. Undirected: Edges have a direction or not.',
      'Weighted vs. Unweighted: Edges have costs or not.',
      'Representation: Adjacency Matrix or Adjacency List.'
    ],
    syntax: {
      cpp: `// Adjacency List\nstd::vector<int> adj[V];\nadj[u].push_back(v);`,
      java: `// Adjacency List\nList<List<Integer>> adj = new ArrayList<>();`,
      python: `adj = {0: [1, 2], 1: [2], 2: [0, 3]}`,
      javascript: `const adj = {\n  0: [1, 2],\n  1: [2],\n  2: [0, 3]\n};`
    }
  },
  {
    id: 'hash-tables',
    title: 'Hash Tables',
    description: 'A Hash Table is a data structure that stores key-value pairs. It uses a hash function to compute an index into an array of buckets.',
    basics: [
      'Key-Value Mapping: Fast data retrieval based on keys.',
      'Hash Function: Maps a key to an integer index.',
      'Collision: When two keys hash to the same index (handled by chaining or open addressing).',
      'Average Time Complexity: O(1) for search, insert, and delete.'
    ],
    syntax: {
      cpp: `#include <unordered_map>\nstd::unordered_map<string, int> m;\nm["key"] = 10;`,
      java: `import java.util.HashMap;\nHashMap<String, Integer> map = new HashMap<>();\nmap.put("key", 10);`,
      python: `d = {"key": 10}\nvalue = d["key"]`,
      javascript: `const map = new Map();\nmap.set("key", 10);`
    }
  },
  {
    id: 'recursion',
    title: 'Recursion',
    description: 'Recursion is a technique where a function calls itself to solve a smaller instance of the same problem.',
    basics: [
      'Base Case: The condition that stops the recursion.',
      'Recursive Step: The part where the function calls itself.',
      'Stack Overflow: Occurs if recursion depth is too high or base case is missing.',
      'Used in: DFS, Tree traversals, Factorial, Fibonacci.'
    ],
    syntax: {
      cpp: `int fact(int n) {\n  if (n <= 1) return 1;\n  return n * fact(n - 1);\n}`,
      java: `int fact(int n) {\n  if (n <= 1) return 1;\n  return n * fact(n - 1);\n}`,
      python: `def fact(n):\n    if n <= 1: return 1\n    return n * fact(n - 1)`,
      javascript: `function fact(n) {\n  if (n <= 1) return 1;\n  return n * fact(n - 1);\n}`
    }
  }
];
