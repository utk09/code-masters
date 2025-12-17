import type { Guild } from "../types";

export const guilds: Guild[] = [
  {
    id: "guild-1",
    name: "React Rangers",
    description:
      "A community of React enthusiasts building modern web applications. Share components, discuss best practices, and learn together.",
    category: "frontend",
    icon: "⚛️",
    memberCount: 156,
    totalPoints: 45200,
    members: [
      {
        userId: "user-demo-1",
        userName: "Sarah Chen",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
        points: 2500,
        role: "leader",
        joinedAt: new Date("2024-01-15"),
      },
      {
        userId: "user-demo-2",
        userName: "Marcus Johnson",
        points: 1800,
        role: "member",
        joinedAt: new Date("2024-02-01"),
      },
    ],
    createdAt: new Date("2024-01-15"),
    createdBy: "user-demo-1",
  },
  {
    id: "guild-2",
    name: "Backend Builders",
    description:
      "Focused on server-side development, APIs, databases, and system architecture. Node.js, Python, Go, and more!",
    category: "backend",
    icon: "⚙️",
    memberCount: 98,
    totalPoints: 32100,
    members: [
      {
        userId: "user-demo-3",
        userName: "Emily Rodriguez",
        points: 3200,
        role: "leader",
        joinedAt: new Date("2024-01-20"),
      },
    ],
    createdAt: new Date("2024-01-20"),
    createdBy: "user-demo-3",
  },
  {
    id: "guild-3",
    name: "Algorithm Aces",
    description:
      "Master data structures and algorithms together. Daily challenges, interview prep, and competitive programming.",
    category: "algorithms",
    icon: "🧮",
    memberCount: 234,
    totalPoints: 78500,
    members: [
      {
        userId: "user-demo-4",
        userName: "David Kim",
        points: 5600,
        role: "leader",
        joinedAt: new Date("2024-01-10"),
      },
    ],
    createdAt: new Date("2024-01-10"),
    createdBy: "user-demo-4",
  },
  {
    id: "guild-4",
    name: "Cloud Crusaders",
    description:
      "AWS, GCP, Azure - we cover it all. Learn cloud architecture, DevOps practices, and infrastructure as code.",
    category: "devops",
    icon: "☁️",
    memberCount: 67,
    totalPoints: 21800,
    members: [
      {
        userId: "user-demo-5",
        userName: "James Wilson",
        points: 2100,
        role: "leader",
        joinedAt: new Date("2024-02-05"),
      },
    ],
    createdAt: new Date("2024-02-05"),
    createdBy: "user-demo-5",
  },
  {
    id: "guild-5",
    name: "Mobile Mavericks",
    description:
      "iOS, Android, React Native, Flutter - all things mobile. Build apps that people love to use.",
    category: "mobile",
    icon: "📱",
    memberCount: 89,
    totalPoints: 28900,
    members: [
      {
        userId: "user-demo-6",
        userName: "Lisa Wang",
        points: 2900,
        role: "leader",
        joinedAt: new Date("2024-01-25"),
      },
    ],
    createdAt: new Date("2024-01-25"),
    createdBy: "user-demo-6",
  },
  {
    id: "guild-6",
    name: "AI Innovators",
    description:
      "Explore machine learning, deep learning, and AI. From TensorFlow to PyTorch, build intelligent applications.",
    category: "ai",
    icon: "🤖",
    memberCount: 145,
    totalPoints: 52300,
    members: [
      {
        userId: "user-demo-7",
        userName: "Alex Thompson",
        points: 4100,
        role: "leader",
        joinedAt: new Date("2024-01-18"),
      },
    ],
    createdAt: new Date("2024-01-18"),
    createdBy: "user-demo-7",
  },
  {
    id: "guild-7",
    name: "Fullstack Force",
    description:
      "End-to-end developers who do it all. Frontend, backend, databases, and everything in between.",
    category: "fullstack",
    icon: "🚀",
    memberCount: 178,
    totalPoints: 61200,
    members: [
      {
        userId: "user-demo-8",
        userName: "Aisha Patel",
        points: 3800,
        role: "leader",
        joinedAt: new Date("2024-01-12"),
      },
    ],
    createdAt: new Date("2024-01-12"),
    createdBy: "user-demo-8",
  },
  {
    id: "guild-8",
    name: "Security Squad",
    description:
      "White hat hackers and security enthusiasts. Learn about cybersecurity, ethical hacking, and secure coding.",
    category: "security",
    icon: "🔐",
    memberCount: 56,
    totalPoints: 18700,
    members: [
      {
        userId: "user-demo-9",
        userName: "Chris Martinez",
        points: 1900,
        role: "leader",
        joinedAt: new Date("2024-02-10"),
      },
    ],
    createdAt: new Date("2024-02-10"),
    createdBy: "user-demo-9",
  },
];

export const guildCategories = [
  { id: "frontend", name: "Frontend", icon: "🎨" },
  { id: "backend", name: "Backend", icon: "⚙️" },
  { id: "fullstack", name: "Full Stack", icon: "🚀" },
  { id: "mobile", name: "Mobile", icon: "📱" },
  { id: "devops", name: "DevOps", icon: "🔧" },
  { id: "ai", name: "AI/ML", icon: "🤖" },
  { id: "algorithms", name: "Algorithms", icon: "🧮" },
  { id: "security", name: "Security", icon: "🔐" },
];
