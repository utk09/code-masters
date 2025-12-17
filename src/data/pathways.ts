import type { Pathway } from "../types";

export const pathways: Pathway[] = [
  {
    id: "path-js",
    title: "JavaScript Pathway",
    description: "Master the fundamentals of JavaScript, the language of the web.",
    category: "JavaScript",
    totalPoints: 500,
    steps: [
      {
        id: "step-js-1",
        title: "Introduction to JavaScript",
        type: "text",
        points: 50,
        content:
          "JavaScript is a lightweight, interpreted, or just-in-time compiled programming language with first-class functions. While it is most well-known as the scripting language for Web pages, many non-browser environments also use it, such as Node.js, Apache CouchDB and Adobe Acrobat. JavaScript is a prototype-based, multi-paradigm, single-threaded, dynamic language, supporting object-oriented, imperative, and declarative (e.g. functional programming) styles.",
      },
      {
        id: "step-js-2",
        title: "Variables and Data Types",
        type: "video",
        points: 50,
        content: "https://www.youtube.com/embed/hdI2bqOjy3c",
      },
      {
        id: "step-js-3",
        title: "JS Fundamentals Quiz",
        type: "quiz",
        points: 100,
        content: {
          question: "Which keyword is used to declare a constant variable?",
          options: ["var", "let", "const", "static"],
          correctAnswer: 2,
        },
      },
      {
        id: "step-js-4",
        title: "Coding Challenge: Array Sum",
        type: "code",
        points: 150,
        content: {
          description: "Write a function that calculates the sum of an array of numbers.",
          starterCode: "function sum(numbers) {\n  // Your code here\n  return 0;\n}",
          solution: "function sum(numbers) {\n  return numbers.reduce((a, b) => a + b, 0);\n}",
          testCase: { input: [1, 2, 3, 4], expected: 10 },
        },
      },
      {
        id: "step-js-5",
        title: "Capstone: To-Do List App",
        type: "capstone",
        points: 150,
        content: {
          description: "Build a fully functional To-Do List application using vanilla JavaScript.",
          requirements: [
            "Add new tasks via an input field",
            "Mark tasks as completed (strikethrough)",
            "Delete tasks",
            "Persist data to localStorage so tasks remain after refresh",
          ],
        },
      },
    ],
  },
  {
    id: "path-react",
    title: "React Pathway",
    description: "Learn React from scratch and build modern user interfaces.",
    category: "React",
    totalPoints: 500,
    steps: [
      {
        id: "step-react-1",
        title: "What is React?",
        type: "text",
        points: 50,
        content:
          "React is a JavaScript library for building user interfaces. It lets you compose complex UIs from small and isolated pieces of code called 'components'. React has a few different kinds of components, but we'll start with React.Component subclasses: HelloMessage. We pass data into a component as props.",
      },
      {
        id: "step-react-2",
        title: "React Components and Props",
        type: "video",
        points: 50,
        content: "https://www.youtube.com/embed/SqcY0GlETPk",
      },
      {
        id: "step-react-3",
        title: "React Basics Quiz",
        type: "quiz",
        points: 100,
        content: {
          question: "What is the primary method used to update state in a functional component?",
          options: ["this.setState", "updateState", "useState hook", "redux"],
          correctAnswer: 2,
        },
      },
      {
        id: "step-react-4",
        title: "Coding Challenge: Simple Counter",
        type: "code",
        points: 150,
        content: {
          description:
            "Write a function that simulates a counter hook. It should return an object with `count` and `increment` function.",
          starterCode:
            "function useCounter() {\n  let count = 0;\n  // Implement logic\n  return { count, increment: () => {} };\n}",
          solution:
            "function useCounter() {\n  let count = 0;\n  return { count, increment: () => { count++; } };\n}",
          testCase: { input: null, expected: null }, // Handled differently for logic tests
        },
      },
      {
        id: "step-react-5",
        title: "Capstone: Movie Search App",
        type: "capstone",
        points: 150,
        content: {
          description:
            "Build a Movie Search application using React and an external API (like OMDB).",
          requirements: [
            "Search bar to enter movie title",
            "Display list of matching movies",
            "Show movie details (poster, title, year)",
            "Handle loading and error states",
          ],
        },
      },
    ],
  },
];
