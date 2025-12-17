import { nanoid } from "nanoid";
import { create } from "zustand";

import { guilds as initialGuilds } from "../data/guilds";
import { db } from "../db/indexedDBSetup";
import type { Guild, GuildMember } from "../types";

type GuildState = {
  guilds: Guild[];
  currentGuild: Guild | null;
  isLoading: boolean;
  filter: {
    category: string | null;
    search: string;
  };

  // Actions
  initGuilds: () => Promise<void>;
  createGuild: (
    name: string,
    description: string,
    category: string,
    userId: string,
    userName: string,
  ) => Promise<Guild>;
  joinGuild: (guildId: string, userId: string, userName: string) => Promise<void>;
  leaveGuild: (guildId: string, userId: string) => Promise<void>;
  setCurrentGuild: (guildId: string) => void;
  setFilter: (filter: Partial<GuildState["filter"]>) => void;
  getFilteredGuilds: () => Guild[];
  getGuildById: (guildId: string) => Guild | undefined;
};

export const useGuildStore = create<GuildState>((set, get) => ({
  guilds: initialGuilds,
  currentGuild: null,
  isLoading: false,
  filter: {
    category: null,
    search: "",
  },

  initGuilds: async () => {
    set({ isLoading: true });

    try {
      const storedGuilds = await db.guilds.toArray();
      if (storedGuilds.length > 0) {
        set({ guilds: storedGuilds, isLoading: false });
      } else {
        // Initialize with default guilds
        for (const guild of initialGuilds) {
          await db.guilds.add(guild);
        }
        set({ guilds: initialGuilds, isLoading: false });
      }
    } catch {
      set({ isLoading: false });
    }
  },

  createGuild: async (
    name: string,
    description: string,
    category: string,
    userId: string,
    userName: string,
  ): Promise<Guild> => {
    const newGuild: Guild = {
      id: nanoid(),
      name,
      description,
      category,
      icon: getCategoryIcon(category),
      memberCount: 1,
      totalPoints: 0,
      members: [
        {
          userId,
          userName,
          points: 0,
          role: "leader",
          joinedAt: new Date(),
        },
      ],
      createdAt: new Date(),
      createdBy: userId,
    };

    await db.guilds.add(newGuild);

    set((state) => ({
      guilds: [...state.guilds, newGuild],
    }));

    return newGuild;
  },

  joinGuild: async (guildId: string, userId: string, userName: string) => {
    const guild = get().guilds.find((g) => g.id === guildId);
    if (!guild) return;

    const alreadyMember = guild.members.some((m) => m.userId === userId);
    if (alreadyMember) return;

    const newMember: GuildMember = {
      userId,
      userName,
      points: 0,
      role: "member",
      joinedAt: new Date(),
    };

    const updatedGuild: Guild = {
      ...guild,
      memberCount: guild.memberCount + 1,
      members: [...guild.members, newMember],
    };

    await db.guilds.update(guildId, updatedGuild);

    set((state) => ({
      guilds: state.guilds.map((g) => (g.id === guildId ? updatedGuild : g)),
      currentGuild: state.currentGuild?.id === guildId ? updatedGuild : state.currentGuild,
    }));
  },

  leaveGuild: async (guildId: string, userId: string) => {
    const guild = get().guilds.find((g) => g.id === guildId);
    if (!guild) return;

    const updatedMembers = guild.members.filter((m) => m.userId !== userId);

    const updatedGuild: Guild = {
      ...guild,
      memberCount: Math.max(0, guild.memberCount - 1),
      members: updatedMembers,
    };

    await db.guilds.update(guildId, updatedGuild);

    set((state) => ({
      guilds: state.guilds.map((g) => (g.id === guildId ? updatedGuild : g)),
      currentGuild: state.currentGuild?.id === guildId ? updatedGuild : state.currentGuild,
    }));
  },

  setCurrentGuild: (guildId: string) => {
    const guild = get().guilds.find((g) => g.id === guildId);
    set({ currentGuild: guild || null });
  },

  setFilter: (filter) => {
    set((state) => ({
      filter: { ...state.filter, ...filter },
    }));
  },

  getFilteredGuilds: () => {
    const { guilds, filter } = get();

    return guilds.filter((guild) => {
      if (filter.category && guild.category !== filter.category) {
        return false;
      }
      if (filter.search !== "") {
        const searchLower = filter.search.toLowerCase();
        return (
          guild.name.toLowerCase().includes(searchLower) ||
          guild.description.toLowerCase().includes(searchLower)
        );
      }
      return true;
    });
  },

  getGuildById: (guildId: string) => {
    return get().guilds.find((g) => g.id === guildId);
  },
}));

function getCategoryIcon(category: string): string {
  const icons: Record<string, string> = {
    frontend: "🎨",
    backend: "⚙️",
    fullstack: "🚀",
    mobile: "📱",
    devops: "🔧",
    ai: "🤖",
    data: "📊",
    security: "🔐",
    gaming: "🎮",
    web3: "⛓️",
  };
  return icons[category.toLowerCase()] || "💻";
}
