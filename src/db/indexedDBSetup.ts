import Dexie, { type EntityTable } from "dexie";

import type { Booking, ChallengeSubmission, Guild, PointsTransaction, User } from "../types";

// Define the database
export class CodeMastersDB extends Dexie {
  users!: EntityTable<User, "id">;
  submissions!: EntityTable<ChallengeSubmission, "id">;
  bookings!: EntityTable<Booking, "id">;
  guilds!: EntityTable<Guild, "id">;
  pointsHistory!: EntityTable<PointsTransaction, "id">;

  constructor() {
    super("CodeMastersDB");

    this.version(1).stores({
      users: "id, email, guildId, level",
      submissions: "id, challengeId, userId, submittedAt",
      bookings: "id, mentorId, date, status",
      guilds: "id, category, totalPoints",
      pointsHistory: "id, userId, type, createdAt",
    });
  }
}

// Create database instance
export const db = new CodeMastersDB();

// Helper functions
export async function getOrCreateUser(): Promise<User> {
  const existingUser = await db.users.toCollection().first();

  if (existingUser) {
    return existingUser;
  }

  const newUser: User = {
    id: "user-1",
    name: "Code Master",
    email: "coder@mlh.io",
    avatar: undefined,
    points: 0,
    level: 1,
    completedChallenges: [],
    completedResources: [],
    achievements: [],
    guildId: undefined,
    bookings: [],
    pathwayProgress: {},
    createdAt: new Date(),
  };

  await db.users.add(newUser);
  return newUser;
}

export async function updateUserPoints(
  userId: string,
  points: number,
  type: PointsTransaction["type"],
  description: string,
): Promise<void> {
  const user = await db.users.get(userId);
  if (!user) return;

  const newPoints = user.points + points;
  const newLevel = calculateLevel(newPoints);

  await db.users.update(userId, {
    points: newPoints,
    level: newLevel,
  });

  await db.pointsHistory.add({
    id: `tx-${Date.now()}`,
    userId,
    amount: points,
    type,
    description,
    createdAt: new Date(),
  });
}

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

export async function markChallengeComplete(
  userId: string,
  challengeId: string,
  points: number,
): Promise<void> {
  const user = await db.users.get(userId);
  if (!user) return;

  if (!user.completedChallenges.includes(challengeId)) {
    await db.users.update(userId, {
      completedChallenges: [...user.completedChallenges, challengeId],
    });

    await updateUserPoints(userId, points, "challenge", `Completed challenge: ${challengeId}`);
  }
}

export async function markResourceComplete(
  userId: string,
  resourceId: string,
  points: number,
): Promise<void> {
  const user = await db.users.get(userId);
  if (!user) return;

  if (!user.completedResources.includes(resourceId)) {
    await db.users.update(userId, {
      completedResources: [...user.completedResources, resourceId],
    });

    await updateUserPoints(userId, points, "resource", `Completed resource: ${resourceId}`);
  }
}
