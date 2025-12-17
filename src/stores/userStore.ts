import { create } from "zustand";
import { persist } from "zustand/middleware";

import {
  db,
  getOrCreateUser,
  markChallengeComplete,
  markResourceComplete,
  updateUserPoints,
} from "../db/indexedDBSetup";
import type { Achievement, Booking, User } from "../types";

type UserState = {
  user: User | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  initUser: () => Promise<void>;
  addPoints: (points: number) => void;
  completeChallenge: (challengeId: string, points: number) => Promise<void>;
  completeResource: (resourceId: string, points: number) => Promise<void>;
  addBooking: (booking: Booking) => Promise<void>;
  cancelBooking: (bookingId: string) => Promise<void>;
  joinGuild: (guildId: string) => Promise<void>;
  leaveGuild: () => Promise<void>;
  addAchievement: (achievement: Achievement) => Promise<void>;
  updateProfile: (name: string, avatar?: string) => Promise<void>;
  completePathwayStep: (pathwayId: string, stepId: string, points: number) => Promise<void>;
  resetPathway: (pathwayId: string) => Promise<void>;
};

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      isLoading: true,
      error: null,

      initUser: async () => {
        try {
          set({ isLoading: true, error: null });
          const user = await getOrCreateUser();
          set({ user, isLoading: false });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : "Failed to init user",
            isLoading: false,
          });
        }
      },

      addPoints: (points: number) => {
        const { user } = get();
        if (!user) return;

        const newPoints = user.points + points;
        const newLevel = calculateLevel(newPoints);

        set({
          user: {
            ...user,
            points: newPoints,
            level: newLevel,
          },
        });
      },

      completeChallenge: async (challengeId: string, points: number) => {
        const { user } = get();
        if (!user) return;

        if (user.completedChallenges.includes(challengeId)) return;

        await markChallengeComplete(user.id, challengeId, points);

        const newPoints = user.points + points;
        set({
          user: {
            ...user,
            points: newPoints,
            level: calculateLevel(newPoints),
            completedChallenges: [...user.completedChallenges, challengeId],
          },
        });
      },

      completeResource: async (resourceId: string, points: number) => {
        const { user } = get();
        if (!user) return;

        if (user.completedResources.includes(resourceId)) return;

        await markResourceComplete(user.id, resourceId, points);

        const newPoints = user.points + points;
        set({
          user: {
            ...user,
            points: newPoints,
            level: calculateLevel(newPoints),
            completedResources: [...user.completedResources, resourceId],
          },
        });
      },

      addBooking: async (booking: Booking) => {
        const { user } = get();
        if (!user) return;

        await db.bookings.add(booking);

        set({
          user: {
            ...user,
            bookings: [...user.bookings, booking],
          },
        });
      },

      cancelBooking: async (bookingId: string) => {
        const { user } = get();
        if (!user) return;

        await db.bookings.update(bookingId, { status: "cancelled" });

        set({
          user: {
            ...user,
            bookings: user.bookings.map((b) =>
              b.id === bookingId ? { ...b, status: "cancelled" as const } : b,
            ),
          },
        });
      },

      joinGuild: async (guildId: string) => {
        const { user } = get();
        if (!user) return;

        await db.users.update(user.id, { guildId });

        set({
          user: {
            ...user,
            guildId,
          },
        });
      },

      leaveGuild: async () => {
        const { user } = get();
        if (!user) return;

        await db.users.update(user.id, { guildId: undefined });

        set({
          user: {
            ...user,
            guildId: undefined,
          },
        });
      },

      addAchievement: async (achievement: Achievement) => {
        const { user } = get();
        if (!user) return;

        const hasAchievement = user.achievements.some((a) => a.id === achievement.id);
        if (hasAchievement) return;

        await db.users.update(user.id, {
          achievements: [...user.achievements, achievement],
        });

        set({
          user: {
            ...user,
            achievements: [...user.achievements, achievement],
          },
        });
      },

      updateProfile: async (name: string, avatar?: string) => {
        const { user } = get();
        if (!user) return;

        await db.users.update(user.id, { name, avatar });

        set({
          user: {
            ...user,
            name,
            avatar,
          },
        });
      },

      completePathwayStep: async (pathwayId: string, stepId: string, points: number) => {
        const { user } = get();
        if (!user) return;

        const currentProgress = user.pathwayProgress;
        const pathwaySteps = currentProgress[pathwayId] ?? [];

        if (pathwaySteps.includes(stepId)) return;

        const newPathwaySteps = [...pathwaySteps, stepId];
        const newProgress = { ...currentProgress, [pathwayId]: newPathwaySteps };

        await db.users.update(user.id, {
          pathwayProgress: newProgress,
        });

        await updateUserPoints(user.id, points, "pathway", `Completed step: ${stepId}`);

        const newPoints = user.points + points;
        set({
          user: {
            ...user,
            points: newPoints,
            level: calculateLevel(newPoints),
            pathwayProgress: newProgress,
          },
        });
      },

      resetPathway: async (pathwayId: string) => {
        const { user } = get();
        if (!user) return;

        const currentProgress = user.pathwayProgress;
        const newProgress = { ...currentProgress, [pathwayId]: [] };

        await db.users.update(user.id, {
          pathwayProgress: newProgress,
        });

        set({
          user: {
            ...user,
            pathwayProgress: newProgress,
          },
        });
      },
    }),
    {
      name: "user-storage",
      partialize: (state) => ({ user: state.user }),
    },
  ),
);

function calculateLevel(points: number): number {
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
