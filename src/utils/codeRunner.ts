import type { TestCase, TestResult } from "../types";

export type RunResult = {
  results: TestResult[];
  allPassed: boolean;
  executionTime: number;
};

export async function runTests(code: string, tests: TestCase[]): Promise<RunResult> {
  const startTime = performance.now();
  const results: TestResult[] = [];

  for (const test of tests) {
    const result = await runSingleTest(code, test);
    results.push(result);
  }

  const executionTime = performance.now() - startTime;
  const allPassed = results.every((r) => r.passed);

  return { results, allPassed, executionTime };
}

async function runSingleTest(code: string, test: TestCase): Promise<TestResult> {
  try {
    const wrappedCode = `
      ${code}
      return solution(${JSON.stringify(test.input)});
    `;

    // eslint-disable-next-line @typescript-eslint/no-implied-eval
    const func = new Function(wrappedCode);
    const actualOutput = func();

    const passed = JSON.stringify(actualOutput) === JSON.stringify(test.expectedOutput);

    return {
      testId: test.id,
      passed,
      actualOutput,
    };
  } catch (error) {
    return {
      testId: test.id,
      passed: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}

export function formatOutput(output: unknown): string {
  if (output === undefined) return "undefined";
  if (output === null) return "null";
  if (typeof output === "string") return `"${output}"`;
  return JSON.stringify(output, null, 2);
}

export function getTestStatusIcon(passed: boolean): string {
  return passed ? "✓" : "✗";
}

export function getTestStatusColor(passed: boolean): string {
  return passed ? "var(--success-color)" : "var(--error-color)";
}
