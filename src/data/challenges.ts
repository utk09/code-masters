import type { Challenge } from "../types";

export const challenges: Challenge[] = [
  {
    id: "challenge-1",
    title: "Two Sum",
    description:
      "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution.",
    difficulty: "beginner",
    category: "Arrays",
    points: 50,
    starterCode: `function solution(input) {
  const { nums, target } = input;
  // Your code here
  // Return an array of two indices

}`,
    solution: `function solution(input) {
  const { nums, target } = input;
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}`,
    tests: [
      {
        id: "test-1-1",
        description: "Example 1: nums = [2,7,11,15], target = 9",
        input: { nums: [2, 7, 11, 15], target: 9 },
        expectedOutput: [0, 1],
      },
      {
        id: "test-1-2",
        description: "Example 2: nums = [3,2,4], target = 6",
        input: { nums: [3, 2, 4], target: 6 },
        expectedOutput: [1, 2],
      },
      {
        id: "test-1-3",
        description: "Example 3: nums = [3,3], target = 6",
        input: { nums: [3, 3], target: 6 },
        expectedOutput: [0, 1],
      },
    ],
    hints: [
      "Think about how you can use a hash map to store values you have seen.",
      "For each element, check if the complement (target - current element) exists in your map.",
      "Remember to return the indices, not the values themselves.",
    ],
  },
  {
    id: "challenge-2",
    title: "Palindrome Check",
    description:
      "Write a function that checks if a given string is a palindrome. A palindrome reads the same backward as forward. Ignore case and non-alphanumeric characters.",
    difficulty: "beginner",
    category: "Strings",
    points: 50,
    starterCode: `function solution(str) {
  // Your code here
  // Return true if palindrome, false otherwise

}`,
    solution: `function solution(str) {
  const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  return cleaned === cleaned.split('').reverse().join('');
}`,
    tests: [
      {
        id: "test-2-1",
        description: 'Example 1: "A man, a plan, a canal: Panama"',
        input: "A man, a plan, a canal: Panama",
        expectedOutput: true,
      },
      {
        id: "test-2-2",
        description: 'Example 2: "race a car"',
        input: "race a car",
        expectedOutput: false,
      },
      {
        id: "test-2-3",
        description: 'Example 3: "Was it a car or a cat I saw?"',
        input: "Was it a car or a cat I saw?",
        expectedOutput: true,
      },
    ],
    hints: [
      "First, clean the string by removing non-alphanumeric characters.",
      "Convert the string to lowercase for case-insensitive comparison.",
      "Compare the cleaned string with its reverse.",
    ],
  },
  {
    id: "challenge-3",
    title: "FizzBuzz",
    description:
      'Write a function that returns an array of numbers from 1 to n. For multiples of 3, use "Fizz" instead of the number. For multiples of 5, use "Buzz". For multiples of both 3 and 5, use "FizzBuzz".',
    difficulty: "beginner",
    category: "Logic",
    points: 50,
    starterCode: `function solution(n) {
  // Your code here
  // Return an array of strings/numbers

}`,
    solution: `function solution(n) {
  const result = [];
  for (let i = 1; i <= n; i++) {
    if (i % 15 === 0) result.push("FizzBuzz");
    else if (i % 3 === 0) result.push("Fizz");
    else if (i % 5 === 0) result.push("Buzz");
    else result.push(i);
  }
  return result;
}`,
    tests: [
      {
        id: "test-3-1",
        description: "Example 1: n = 5",
        input: 5,
        expectedOutput: [1, 2, "Fizz", 4, "Buzz"],
      },
      {
        id: "test-3-2",
        description: "Example 2: n = 15",
        input: 15,
        expectedOutput: [
          1,
          2,
          "Fizz",
          4,
          "Buzz",
          "Fizz",
          7,
          8,
          "Fizz",
          "Buzz",
          11,
          "Fizz",
          13,
          14,
          "FizzBuzz",
        ],
      },
    ],
    hints: [
      "Check for divisibility by 15 first (both 3 and 5).",
      "Use the modulo operator (%) to check divisibility.",
      "Build an array as you iterate from 1 to n.",
    ],
  },
  {
    id: "challenge-4",
    title: "Reverse Linked List",
    description:
      "Given the head of a singly linked list represented as an array, reverse the list, and return the reversed list as an array.",
    difficulty: "intermediate",
    category: "Data Structures",
    points: 100,
    starterCode: `function solution(arr) {
  // Input is an array representing a linked list
  // Return the reversed array

}`,
    solution: `function solution(arr) {
  return arr.reverse();
}`,
    tests: [
      {
        id: "test-4-1",
        description: "Example 1: [1,2,3,4,5]",
        input: [1, 2, 3, 4, 5],
        expectedOutput: [5, 4, 3, 2, 1],
      },
      {
        id: "test-4-2",
        description: "Example 2: [1,2]",
        input: [1, 2],
        expectedOutput: [2, 1],
      },
      {
        id: "test-4-3",
        description: "Example 3: []",
        input: [],
        expectedOutput: [],
      },
    ],
    hints: [
      "You can use the built-in reverse() method.",
      "Alternatively, use two pointers approach.",
      "Consider the edge case of an empty array.",
    ],
  },
  {
    id: "challenge-5",
    title: "Valid Parentheses",
    description:
      'Given a string s containing just the characters "(", ")", "{", "}", "[" and "]", determine if the input string is valid. An input string is valid if: Open brackets must be closed by the same type of brackets. Open brackets must be closed in the correct order.',
    difficulty: "intermediate",
    category: "Stacks",
    points: 100,
    starterCode: `function solution(s) {
  // Your code here
  // Return true if valid, false otherwise

}`,
    solution: `function solution(s) {
  const stack = [];
  const pairs = { ')': '(', '}': '{', ']': '[' };

  for (const char of s) {
    if (char in pairs) {
      if (stack.pop() !== pairs[char]) return false;
    } else {
      stack.push(char);
    }
  }

  return stack.length === 0;
}`,
    tests: [
      {
        id: "test-5-1",
        description: 'Example 1: "()"',
        input: "()",
        expectedOutput: true,
      },
      {
        id: "test-5-2",
        description: 'Example 2: "()[]{}"',
        input: "()[]{}",
        expectedOutput: true,
      },
      {
        id: "test-5-3",
        description: 'Example 3: "(]"',
        input: "(]",
        expectedOutput: false,
      },
      {
        id: "test-5-4",
        description: 'Example 4: "([)]"',
        input: "([)]",
        expectedOutput: false,
      },
    ],
    hints: [
      "Use a stack to keep track of opening brackets.",
      "When you see a closing bracket, check if it matches the top of the stack.",
      "At the end, the stack should be empty for a valid string.",
    ],
  },
  {
    id: "challenge-6",
    title: "Merge Sorted Arrays",
    description:
      "You are given two integer arrays nums1 and nums2, sorted in non-decreasing order. Merge nums2 into nums1 as one sorted array and return it.",
    difficulty: "intermediate",
    category: "Arrays",
    points: 100,
    starterCode: `function solution(input) {
  const { nums1, nums2 } = input;
  // Your code here
  // Return merged sorted array

}`,
    solution: `function solution(input) {
  const { nums1, nums2 } = input;
  return [...nums1, ...nums2].sort((a, b) => a - b);
}`,
    tests: [
      {
        id: "test-6-1",
        description: "Example 1: nums1 = [1,2,3], nums2 = [2,5,6]",
        input: { nums1: [1, 2, 3], nums2: [2, 5, 6] },
        expectedOutput: [1, 2, 2, 3, 5, 6],
      },
      {
        id: "test-6-2",
        description: "Example 2: nums1 = [1], nums2 = []",
        input: { nums1: [1], nums2: [] },
        expectedOutput: [1],
      },
    ],
    hints: [
      "You can combine both arrays and then sort.",
      "Or use a two-pointer approach for O(n) time complexity.",
      "Consider edge cases where one array is empty.",
    ],
  },
  {
    id: "challenge-7",
    title: "Binary Search",
    description:
      "Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums. If target exists, return its index. Otherwise, return -1.",
    difficulty: "advanced",
    category: "Algorithms",
    points: 150,
    starterCode: `function solution(input) {
  const { nums, target } = input;
  // Implement binary search
  // Return index of target or -1

}`,
    solution: `function solution(input) {
  const { nums, target } = input;
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) return mid;
    if (nums[mid] < target) left = mid + 1;
    else right = mid - 1;
  }

  return -1;
}`,
    tests: [
      {
        id: "test-7-1",
        description: "Example 1: nums = [-1,0,3,5,9,12], target = 9",
        input: { nums: [-1, 0, 3, 5, 9, 12], target: 9 },
        expectedOutput: 4,
      },
      {
        id: "test-7-2",
        description: "Example 2: nums = [-1,0,3,5,9,12], target = 2",
        input: { nums: [-1, 0, 3, 5, 9, 12], target: 2 },
        expectedOutput: -1,
      },
    ],
    hints: [
      "Binary search works by repeatedly dividing the search space in half.",
      "Keep track of left and right pointers.",
      "Compare the middle element with the target to decide which half to search.",
    ],
  },
  {
    id: "challenge-8",
    title: "Maximum Subarray",
    description:
      "Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum. This is known as Kadane's algorithm.",
    difficulty: "advanced",
    category: "Dynamic Programming",
    points: 150,
    starterCode: `function solution(nums) {
  // Find the maximum sum subarray
  // Return the maximum sum

}`,
    solution: `function solution(nums) {
  let maxSum = nums[0];
  let currentSum = nums[0];

  for (let i = 1; i < nums.length; i++) {
    currentSum = Math.max(nums[i], currentSum + nums[i]);
    maxSum = Math.max(maxSum, currentSum);
  }

  return maxSum;
}`,
    tests: [
      {
        id: "test-8-1",
        description: "Example 1: [-2,1,-3,4,-1,2,1,-5,4]",
        input: [-2, 1, -3, 4, -1, 2, 1, -5, 4],
        expectedOutput: 6,
      },
      {
        id: "test-8-2",
        description: "Example 2: [1]",
        input: [1],
        expectedOutput: 1,
      },
      {
        id: "test-8-3",
        description: "Example 3: [5,4,-1,7,8]",
        input: [5, 4, -1, 7, 8],
        expectedOutput: 23,
      },
    ],
    hints: [
      "This is a classic dynamic programming problem known as Kadane's algorithm.",
      "At each position, decide whether to start a new subarray or extend the existing one.",
      "Keep track of both the current sum and the maximum sum seen so far.",
    ],
  },
];

export const challengeCategories = [
  "Arrays",
  "Strings",
  "Logic",
  "Data Structures",
  "Stacks",
  "Algorithms",
  "Dynamic Programming",
];
