import confetti from "canvas-confetti";
import { useEffect, useRef } from "react";
import { FiArrowLeft, FiCheck, FiHelpCircle, FiPlay, FiRefreshCw, FiX } from "react-icons/fi";
import { Link, useParams } from "react-router";

import { DifficultyBadge, PointsBadge } from "../../components/common/Badge/Badge";
import { Button } from "../../components/common/Button/Button";
import { Card, CardBody } from "../../components/common/Card/Card";
import { CodeEditor } from "../../components/common/CodeEditor/CodeEditor";
import { useChallengeStore } from "../../stores/challengeStore";
import { useUserStore } from "../../stores/userStore";
import styles from "./Challenges.module.css";

export function ChallengeDetail() {
  const { id } = useParams<{ id: string }>();
  const {
    currentChallenge,
    setCurrentChallenge,
    userCode,
    setUserCode,
    testResults,
    isRunning,
    isPassed,
    runTests,
    resetChallenge,
    activeHintIndex,
    showNextHint,
  } = useChallengeStore();
  const { user, completeChallenge } = useUserStore();
  const hasAwarded = useRef(false);

  useEffect(() => {
    if (id) {
      setCurrentChallenge(id);
      hasAwarded.current = false;
    }
  }, [id, setCurrentChallenge]);

  useEffect(() => {
    if (isPassed && !hasAwarded.current && currentChallenge && user) {
      const alreadyCompleted = user.completedChallenges.includes(currentChallenge.id);
      if (!alreadyCompleted) {
        void completeChallenge(currentChallenge.id, currentChallenge.points);
        void confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      }
      hasAwarded.current = true;
    }
  }, [isPassed, currentChallenge, user, completeChallenge]);

  if (!currentChallenge) {
    return (
      <div className={styles.notFound}>
        <h2>Challenge not found</h2>
        <Link to="/challenges">
          <Button variant="outline">Back to Challenges</Button>
        </Link>
      </div>
    );
  }

  const isCompleted = user?.completedChallenges.includes(currentChallenge.id);

  return (
    <div className={styles.detail}>
      <Link to="/challenges" className={styles.backLink}>
        <FiArrowLeft />
        Back to Challenges
      </Link>

      <div className={styles.detailHeader}>
        <div className={styles.detailInfo}>
          <div className={styles.badges}>
            <DifficultyBadge difficulty={currentChallenge.difficulty} />
            <PointsBadge points={currentChallenge.points} />
            {isCompleted && (
              <span className={styles.completedTag}>
                <FiCheck /> Completed
              </span>
            )}
          </div>
          <h1 className={styles.detailTitle}>{currentChallenge.title}</h1>
          <p className={styles.detailDesc}>{currentChallenge.description}</p>
        </div>
      </div>

      <div className={styles.detailLayout}>
        <div className={styles.editorSection}>
          <Card>
            <CardBody>
              <div className={styles.editorHeader}>
                <h3>Your Solution</h3>
                <div className={styles.editorActions}>
                  <Button
                    variant="ghost"
                    size="sm"
                    leftIcon={<FiRefreshCw />}
                    onClick={resetChallenge}
                  >
                    Reset
                  </Button>
                  <Button
                    size="sm"
                    leftIcon={<FiPlay />}
                    onClick={() => void runTests()}
                    isLoading={isRunning}
                  >
                    Run Tests
                  </Button>
                </div>
              </div>
              <CodeEditor value={userCode} onChange={setUserCode} height="400px" />
            </CardBody>
          </Card>

          {testResults.length > 0 && (
            <Card className={styles.resultsCard}>
              <CardBody>
                <h3 className={styles.resultsTitle}>
                  {isPassed ? (
                    <span className={styles.success}>
                      <FiCheck /> All Tests Passed!
                    </span>
                  ) : (
                    <span className={styles.error}>
                      <FiX /> Some Tests Failed
                    </span>
                  )}
                </h3>
                <div className={styles.testList}>
                  {testResults.map((result, index) => {
                    const test = currentChallenge.tests[index];
                    return (
                      <div
                        key={result.testId}
                        className={`${styles.testItem} ${result.passed ? styles.testPassed : styles.testFailed}`}
                      >
                        <span className={styles.testIcon}>
                          {result.passed ? <FiCheck /> : <FiX />}
                        </span>
                        <div className={styles.testInfo}>
                          <span className={styles.testName}>{test.description}</span>
                          {result.error && <span className={styles.testError}>{result.error}</span>}
                          {!result.passed && !result.error && (
                            <span className={styles.testError}>
                              Expected: {JSON.stringify(test.expectedOutput)}, Got:{" "}
                              {JSON.stringify(result.actualOutput)}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardBody>
            </Card>
          )}
        </div>

        <div className={styles.sidePanel}>
          <Card>
            <CardBody>
              <h3 className={styles.panelTitle}>Test Cases</h3>
              <div className={styles.testCases}>
                {currentChallenge.tests.map((test, index) => (
                  <div key={test.id} className={styles.testCase}>
                    <span className={styles.testCaseLabel}>Test {index + 1}</span>
                    <div className={styles.testCaseContent}>
                      <div>
                        <span className={styles.testCaseKey}>Input:</span>
                        <code>{JSON.stringify(test.input)}</code>
                      </div>
                      <div>
                        <span className={styles.testCaseKey}>Expected:</span>
                        <code>{JSON.stringify(test.expectedOutput)}</code>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <div className={styles.hintsHeader}>
                <h3 className={styles.panelTitle}>Hints</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  leftIcon={<FiHelpCircle />}
                  onClick={showNextHint}
                  disabled={activeHintIndex >= currentChallenge.hints.length - 1}
                >
                  Show Hint
                </Button>
              </div>
              <div className={styles.hints}>
                {currentChallenge.hints.map((hint, index) => (
                  <div
                    key={index}
                    className={`${styles.hint} ${index <= activeHintIndex ? styles.hintVisible : styles.hintHidden}`}
                  >
                    <span className={styles.hintNumber}>Hint {index + 1}</span>
                    {index <= activeHintIndex && <p>{hint}</p>}
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
