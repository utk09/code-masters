// User Types
export type User = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  points: number;
  level: number;
  completedChallenges: string[];
  completedResources: string[];
  achievements: Achievement[];
  guildId?: string;
  bookings: Booking[];
  createdAt: Date;
};

export type Achievement = {
  id: string;
  title: string;
  description: string;
  icon: string;
  earnedAt: Date;
};

// Challenge Types
export type Challenge = {
  id: string;
  title: string;
  description: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  category: string;
  points: number;
  starterCode: string;
  solution?: string;
  tests: TestCase[];
  hints: string[];
  timeLimit?: number;
};

export type TestCase = {
  id: string;
  description: string;
  input: unknown;
  expectedOutput: unknown;
  isHidden?: boolean;
};

export type ChallengeSubmission = {
  id: string;
  challengeId: string;
  userId: string;
  code: string;
  passed: boolean;
  testResults: TestResult[];
  submittedAt: Date;
};

export type TestResult = {
  testId: string;
  passed: boolean;
  actualOutput?: unknown;
  error?: string;
};

// Resource Types
export type Resource = {
  id: string;
  title: string;
  description: string;
  type: "video" | "article" | "tutorial" | "documentation";
  url: string;
  youtubeId?: string;
  thumbnail?: string;
  category: string;
  duration?: string;
  points: number;
  author?: string;
  tags: string[];
};

// Mentor Types
export type Mentor = {
  id: string;
  name: string;
  avatar: string;
  title: string;
  company?: string;
  expertise: string[];
  bio: string;
  rating: number;
  sessionsCompleted: number;
  availability: TimeSlot[];
};

export type TimeSlot = {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  isBooked: boolean;
};

export type Booking = {
  id: string;
  mentorId: string;
  mentorName: string;
  slotId: string;
  date: string;
  time: string;
  topic?: string;
  status: "confirmed" | "cancelled" | "completed";
  createdAt: Date;
};

// Guild Types
export type Guild = {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  memberCount: number;
  totalPoints: number;
  members: GuildMember[];
  createdAt: Date;
  createdBy: string;
};

export type GuildMember = {
  userId: string;
  userName: string;
  avatar?: string;
  points: number;
  role: "leader" | "member";
  joinedAt: Date;
};

// Points & Rewards
export type PointsTransaction = {
  id: string;
  userId: string;
  amount: number;
  type: "challenge" | "resource" | "achievement" | "guild" | "mentorship";
  description: string;
  createdAt: Date;
};

// UI State Types
export type NavItem = {
  id: string;
  label: string;
  path: string;
  icon: string;
  badge?: number;
};

export type DifficultyLevel = "beginner" | "intermediate" | "advanced";
export type ResourceType = "video" | "article" | "tutorial" | "documentation";
export type BookingStatus = "confirmed" | "cancelled" | "completed";
