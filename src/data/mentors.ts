import type { Mentor } from "../types";

// Generate availability slots for the next 7 days
function generateAvailability(): Mentor["availability"] {
  const slots: Mentor["availability"] = [];
  const today = new Date();

  for (let day = 1; day <= 7; day++) {
    const date = new Date(today);
    date.setDate(today.getDate() + day);
    const dateStr = date.toISOString().split("T")[0];

    // Generate 3-4 slots per day
    const times = [
      { start: "09:00", end: "09:30" },
      { start: "11:00", end: "11:30" },
      { start: "14:00", end: "14:30" },
      { start: "16:00", end: "16:30" },
    ];

    times.forEach((time, index) => {
      // Randomly mark some slots as booked
      const isBooked = Math.random() > 0.7;
      slots.push({
        id: `slot-${day}-${index}`,
        date: dateStr,
        startTime: time.start,
        endTime: time.end,
        isBooked,
      });
    });
  }

  return slots;
}

export const mentors: Mentor[] = [
  {
    id: "mentor-1",
    name: "Sarah Chen",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    title: "Senior Software Engineer",
    company: "Google",
    expertise: ["JavaScript", "React", "System Design", "Career Growth"],
    bio: "10+ years of experience in full-stack development. Passionate about mentoring the next generation of developers. Former MLH Fellow mentor.",
    rating: 4.9,
    sessionsCompleted: 156,
    availability: generateAvailability(),
  },
  {
    id: "mentor-2",
    name: "Marcus Johnson",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
    title: "Engineering Manager",
    company: "Meta",
    expertise: ["Python", "Machine Learning", "Data Engineering", "Leadership"],
    bio: "Leading teams at scale while still coding daily. Love helping developers navigate both technical and career challenges.",
    rating: 4.8,
    sessionsCompleted: 89,
    availability: generateAvailability(),
  },
  {
    id: "mentor-3",
    name: "Emily Rodriguez",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
    title: "Staff Engineer",
    company: "Stripe",
    expertise: ["TypeScript", "Node.js", "API Design", "Testing"],
    bio: "Building payment infrastructure at scale. Open source contributor and conference speaker. Happy to help with backend architecture questions.",
    rating: 4.9,
    sessionsCompleted: 203,
    availability: generateAvailability(),
  },
  {
    id: "mentor-4",
    name: "David Kim",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    title: "Principal Engineer",
    company: "Amazon",
    expertise: ["AWS", "Distributed Systems", "Go", "Kubernetes"],
    bio: "Designing cloud-native systems for millions of users. Former startup founder. Ask me about scaling and system reliability.",
    rating: 4.7,
    sessionsCompleted: 67,
    availability: generateAvailability(),
  },
  {
    id: "mentor-5",
    name: "Aisha Patel",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aisha",
    title: "Frontend Architect",
    company: "Airbnb",
    expertise: ["React", "CSS", "Accessibility", "Performance"],
    bio: "Obsessed with building beautiful, accessible, and performant user interfaces. Design systems enthusiast. Speaker at React Conf.",
    rating: 4.95,
    sessionsCompleted: 178,
    availability: generateAvailability(),
  },
  {
    id: "mentor-6",
    name: "James Wilson",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
    title: "Security Engineer",
    company: "GitHub",
    expertise: ["Security", "DevOps", "CI/CD", "Open Source"],
    bio: "Securing the worlds code one commit at a time. Love teaching about security best practices and secure coding.",
    rating: 4.8,
    sessionsCompleted: 45,
    availability: generateAvailability(),
  },
  {
    id: "mentor-7",
    name: "Lisa Wang",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa",
    title: "Mobile Lead",
    company: "Netflix",
    expertise: ["React Native", "iOS", "Android", "Mobile Architecture"],
    bio: "Building the Netflix mobile experience. Cross-platform expert. Can help with mobile development and team leadership.",
    rating: 4.85,
    sessionsCompleted: 112,
    availability: generateAvailability(),
  },
  {
    id: "mentor-8",
    name: "Alex Thompson",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    title: "Data Scientist",
    company: "Spotify",
    expertise: ["Python", "ML/AI", "Data Visualization", "Statistics"],
    bio: "Making music recommendations smarter with ML. PhD in Computer Science. Happy to mentor on data science and breaking into the field.",
    rating: 4.75,
    sessionsCompleted: 78,
    availability: generateAvailability(),
  },
];

export const expertiseAreas = [
  "JavaScript",
  "React",
  "TypeScript",
  "Python",
  "Node.js",
  "System Design",
  "Machine Learning",
  "AWS",
  "Security",
  "Mobile",
  "Career Growth",
  "Leadership",
];
