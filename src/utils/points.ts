import type { DifficultyLevel } from "../types";

export function calculateLevel(points: number): number {
  if (points < 100) return 1;
  if (points < 300) return 2;
  if (points < 600) return 3;
  if (points < 1000) return 4;
  if (points < 1500) return 5;
  if (points < 2500) return 6;
  if (points < 4000) return 7;
  if (points < 6000) return 8;
  if (points < 9000) return 9;
  return 10;
}

export function getPointsForNextLevel(currentPoints: number): number {
  const thresholds = [100, 300, 600, 1000, 1500, 2500, 4000, 6000, 9000];
  for (const threshold of thresholds) {
    if (currentPoints < threshold) {
      return threshold;
    }
  }
  return currentPoints;
}

export function getLevelProgress(points: number): number {
  const currentLevel = calculateLevel(points);
  const thresholds = [0, 100, 300, 600, 1000, 1500, 2500, 4000, 6000, 9000];

  if (currentLevel >= 10) return 100;

  const currentThreshold = thresholds[currentLevel - 1];
  const nextThreshold = thresholds[currentLevel];
  const progress = ((points - currentThreshold) / (nextThreshold - currentThreshold)) * 100;

  return Math.min(100, Math.max(0, progress));
}

export function getDifficultyPoints(difficulty: DifficultyLevel): number {
  switch (difficulty) {
    case "beginner":
      return 50;
    case "intermediate":
      return 100;
    case "advanced":
      return 150;
    default:
      return 50;
  }
}

export function getDifficultyColor(difficulty: DifficultyLevel): string {
  switch (difficulty) {
    case "beginner":
      return "var(--success-color)";
    case "intermediate":
      return "var(--warning-color)";
    case "advanced":
      return "var(--error-color)";
    default:
      return "var(--text-muted)";
  }
}

export function formatPoints(points: number): string {
  if (points >= 1000000) {
    return `${(points / 1000000).toFixed(1)}M`;
  }
  if (points >= 1000) {
    return `${(points / 1000).toFixed(1)}K`;
  }
  return points.toString();
}

export function getLevelTitle(level: number): string {
  const titles = [
    "Newbie Coder",
    "Code Apprentice",
    "Junior Developer",
    "Developer",
    "Senior Developer",
    "Code Master",
    "Tech Lead",
    "Architect",
    "Principal Engineer",
    "Code Legend",
  ];
  return titles[Math.min(level - 1, titles.length - 1)];
}
