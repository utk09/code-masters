import { create } from "zustand";

import { challenges } from "../data/challenges";
import type { Challenge, TestResult } from "../types";

type ChallengeState = {
  challenges: Challenge[];
  currentChallenge: Challenge | null;
  userCode: string;
  testResults: TestResult[];
  isRunning: boolean;
  isPassed: boolean;
  activeHintIndex: number;
  filter: {
    difficulty: string | null;
    category: string | null;
    search: string;
  };

  // Actions
  setCurrentChallenge: (challengeId: string) => void;
  setUserCode: (code: string) => void;
  runTests: () => Promise<void>;
  resetChallenge: () => void;
  showNextHint: () => void;
  setFilter: (filter: Partial<ChallengeState["filter"]>) => void;
  getFilteredChallenges: () => Challenge[];
};

export const useChallengeStore = create<ChallengeState>((set, get) => ({
  challenges,
  currentChallenge: null,
  userCode: "",
  testResults: [],
  isRunning: false,
  isPassed: false,
  activeHintIndex: -1,
  filter: {
    difficulty: null,
    category: null,
    search: "",
  },

  setCurrentChallenge: (challengeId: string) => {
    const challenge = challenges.find((c) => c.id === challengeId);
    if (challenge) {
      set({
        currentChallenge: challenge,
        userCode: challenge.starterCode,
        testResults: [],
        isPassed: false,
        activeHintIndex: -1,
      });
    }
  },

  setUserCode: (code: string) => {
    set({ userCode: code });
  },

  runTests: async () => {
    const { currentChallenge, userCode } = get();
    if (!currentChallenge) return;

    set({ isRunning: true, testResults: [] });

    const results: TestResult[] = [];

    for (const test of currentChallenge.tests) {
      try {
        // Create a safe execution environment
        const wrappedCode = `
          ${userCode}
          return solution(${JSON.stringify(test.input)});
        `;

        // eslint-disable-next-line @typescript-eslint/no-implied-eval
        const func = new Function(wrappedCode);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
        const actualOutput = func();

        const passed = JSON.stringify(actualOutput) === JSON.stringify(test.expectedOutput);

        results.push({
          testId: test.id,
          passed,
          actualOutput,
        });
      } catch (error) {
        results.push({
          testId: test.id,
          passed: false,
          error: error instanceof Error ? error.message : "Execution error",
        });
      }
    }

    const allPassed = results.every((r) => r.passed);

    // Simulate a small delay for UX
    await new Promise((resolve) => setTimeout(resolve, 500));

    set({
      testResults: results,
      isRunning: false,
      isPassed: allPassed,
    });
  },

  resetChallenge: () => {
    const { currentChallenge } = get();
    if (currentChallenge) {
      set({
        userCode: currentChallenge.starterCode,
        testResults: [],
        isPassed: false,
        activeHintIndex: -1,
      });
    }
  },

  showNextHint: () => {
    const { currentChallenge, activeHintIndex } = get();
    if (!currentChallenge) return;

    const maxIndex = currentChallenge.hints.length - 1;
    if (activeHintIndex < maxIndex) {
      set({ activeHintIndex: activeHintIndex + 1 });
    }
  },

  setFilter: (filter) => {
    set((state) => ({
      filter: { ...state.filter, ...filter },
    }));
  },

  getFilteredChallenges: () => {
    const { challenges, filter } = get();

    return challenges.filter((challenge) => {
      if (filter.difficulty && challenge.difficulty !== filter.difficulty) {
        return false;
      }
      if (filter.category && challenge.category !== filter.category) {
        return false;
      }
      if (filter.search !== "") {
        const searchLower = filter.search.toLowerCase();
        return (
          challenge.title.toLowerCase().includes(searchLower) ||
          challenge.description.toLowerCase().includes(searchLower)
        );
      }
      return true;
    });
  },
}));
