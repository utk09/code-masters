import type { Resource } from "../types";

export const resources: Resource[] = [
  // JavaScript Fundamentals
  {
    id: "res-1",
    title: "JavaScript Crash Course for Beginners",
    description:
      "Learn JavaScript fundamentals in this comprehensive crash course. Perfect for beginners starting their coding journey.",
    type: "video",
    url: "https://www.youtube.com/watch?v=hdI2bqOjy3c",
    youtubeId: "hdI2bqOjy3c",
    thumbnail: "https://img.youtube.com/vi/hdI2bqOjy3c/maxresdefault.jpg",
    category: "JavaScript",
    duration: "1h 40m",
    points: 20,
    author: "Traversy Media",
    tags: ["javascript", "beginner", "fundamentals"],
  },
  {
    id: "res-2",
    title: "Modern JavaScript ES6+ Features",
    description:
      "Master modern JavaScript features including arrow functions, destructuring, spread operators, and more.",
    type: "video",
    url: "https://www.youtube.com/watch?v=NCwa_xi0Uuc",
    youtubeId: "NCwa_xi0Uuc",
    thumbnail: "https://img.youtube.com/vi/NCwa_xi0Uuc/maxresdefault.jpg",
    category: "JavaScript",
    duration: "45m",
    points: 15,
    author: "Fireship",
    tags: ["javascript", "es6", "modern"],
  },

  // React
  {
    id: "res-3",
    title: "React Tutorial for Beginners",
    description:
      "Complete React tutorial covering components, state, props, hooks, and building real applications.",
    type: "video",
    url: "https://www.youtube.com/watch?v=SqcY0GlETPk",
    youtubeId: "SqcY0GlETPk",
    thumbnail: "https://img.youtube.com/vi/SqcY0GlETPk/maxresdefault.jpg",
    category: "React",
    duration: "1h 24m",
    points: 25,
    author: "Programming with Mosh",
    tags: ["react", "frontend", "beginner"],
  },
  {
    id: "res-4",
    title: "React Hooks Explained",
    description:
      "Deep dive into React Hooks including useState, useEffect, useContext, useReducer, and custom hooks.",
    type: "video",
    url: "https://www.youtube.com/watch?v=TNhaISOUy6Q",
    youtubeId: "TNhaISOUy6Q",
    thumbnail: "https://img.youtube.com/vi/TNhaISOUy6Q/maxresdefault.jpg",
    category: "React",
    duration: "29m",
    points: 15,
    author: "Fireship",
    tags: ["react", "hooks", "intermediate"],
  },

  // TypeScript
  {
    id: "res-5",
    title: "TypeScript Full Course for Beginners",
    description:
      "Learn TypeScript from scratch. Covers types, interfaces, generics, and integrating with React.",
    type: "video",
    url: "https://www.youtube.com/watch?v=30LWjhZzg50",
    youtubeId: "30LWjhZzg50",
    thumbnail: "https://img.youtube.com/vi/30LWjhZzg50/maxresdefault.jpg",
    category: "TypeScript",
    duration: "5h 30m",
    points: 40,
    author: "Dave Gray",
    tags: ["typescript", "beginner", "static-typing"],
  },

  // Data Structures & Algorithms
  {
    id: "res-6",
    title: "Data Structures Easy to Advanced",
    description:
      "Comprehensive course on data structures from basics to advanced concepts with code implementations.",
    type: "video",
    url: "https://www.youtube.com/watch?v=RBSGKlAvoiM",
    youtubeId: "RBSGKlAvoiM",
    thumbnail: "https://img.youtube.com/vi/RBSGKlAvoiM/maxresdefault.jpg",
    category: "Data Structures",
    duration: "8h",
    points: 50,
    author: "freeCodeCamp",
    tags: ["data-structures", "algorithms", "advanced"],
  },
  {
    id: "res-7",
    title: "Dynamic Programming Tutorial",
    description:
      "Master dynamic programming with clear explanations and problem-solving techniques.",
    type: "video",
    url: "https://www.youtube.com/watch?v=oBt53YbR9Kk",
    youtubeId: "oBt53YbR9Kk",
    thumbnail: "https://img.youtube.com/vi/oBt53YbR9Kk/maxresdefault.jpg",
    category: "Algorithms",
    duration: "5h",
    points: 45,
    author: "freeCodeCamp",
    tags: ["dynamic-programming", "algorithms", "advanced"],
  },

  // Web Development
  {
    id: "res-8",
    title: "CSS Flexbox in 20 Minutes",
    description:
      "Master CSS Flexbox layout with this quick and practical tutorial with real examples.",
    type: "video",
    url: "https://www.youtube.com/watch?v=JJSoEo8JSnc",
    youtubeId: "JJSoEo8JSnc",
    thumbnail: "https://img.youtube.com/vi/JJSoEo8JSnc/maxresdefault.jpg",
    category: "CSS",
    duration: "20m",
    points: 10,
    author: "Traversy Media",
    tags: ["css", "flexbox", "layout"],
  },
  {
    id: "res-9",
    title: "CSS Grid Tutorial",
    description:
      "Learn CSS Grid layout system with practical examples and responsive design techniques.",
    type: "video",
    url: "https://www.youtube.com/watch?v=EFafSYg-PkI",
    youtubeId: "EFafSYg-PkI",
    thumbnail: "https://img.youtube.com/vi/EFafSYg-PkI/maxresdefault.jpg",
    category: "CSS",
    duration: "34m",
    points: 15,
    author: "Dev Ed",
    tags: ["css", "grid", "layout"],
  },

  // Git & GitHub
  {
    id: "res-10",
    title: "Git and GitHub for Beginners",
    description: "Complete guide to version control with Git and collaborating using GitHub.",
    type: "video",
    url: "https://www.youtube.com/watch?v=RGOj5yH7evk",
    youtubeId: "RGOj5yH7evk",
    thumbnail: "https://img.youtube.com/vi/RGOj5yH7evk/maxresdefault.jpg",
    category: "Tools",
    duration: "1h",
    points: 20,
    author: "freeCodeCamp",
    tags: ["git", "github", "version-control"],
  },

  // Node.js
  {
    id: "res-11",
    title: "Node.js Tutorial for Beginners",
    description: "Learn Node.js from scratch including modules, npm, Express, and building APIs.",
    type: "video",
    url: "https://www.youtube.com/watch?v=TlB_eWDSMt4",
    youtubeId: "TlB_eWDSMt4",
    thumbnail: "https://img.youtube.com/vi/TlB_eWDSMt4/maxresdefault.jpg",
    category: "Backend",
    duration: "2h",
    points: 30,
    author: "Programming with Mosh",
    tags: ["nodejs", "backend", "javascript"],
  },

  // Articles
  {
    id: "res-12",
    title: "The Modern JavaScript Tutorial",
    description:
      "Comprehensive JavaScript tutorial covering everything from basics to advanced concepts.",
    type: "article",
    url: "https://javascript.info/",
    category: "JavaScript",
    points: 15,
    author: "JavaScript.info",
    tags: ["javascript", "tutorial", "documentation"],
  },
  {
    id: "res-13",
    title: "React Documentation",
    description: "Official React documentation with guides, API references, and best practices.",
    type: "documentation",
    url: "https://react.dev/",
    category: "React",
    points: 10,
    author: "React Team",
    tags: ["react", "documentation", "official"],
  },
  {
    id: "res-14",
    title: "MDN Web Docs - CSS",
    description:
      "Mozilla Developer Network documentation for CSS with examples and browser compatibility.",
    type: "documentation",
    url: "https://developer.mozilla.org/en-US/docs/Web/CSS",
    category: "CSS",
    points: 10,
    author: "MDN",
    tags: ["css", "documentation", "reference"],
  },

  // System Design
  {
    id: "res-15",
    title: "System Design Interview Guide",
    description: "Learn how to approach system design interviews with real-world examples.",
    type: "video",
    url: "https://www.youtube.com/watch?v=UzLMhqg3_Wc",
    youtubeId: "UzLMhqg3_Wc",
    thumbnail: "https://img.youtube.com/vi/UzLMhqg3_Wc/maxresdefault.jpg",
    category: "System Design",
    duration: "1h 30m",
    points: 35,
    author: "Gaurav Sen",
    tags: ["system-design", "interview", "architecture"],
  },
];

export const resourceCategories = [
  "JavaScript",
  "React",
  "TypeScript",
  "Data Structures",
  "Algorithms",
  "CSS",
  "Tools",
  "Backend",
  "System Design",
];

export const resourceTypes = ["video", "article", "tutorial", "documentation"];
