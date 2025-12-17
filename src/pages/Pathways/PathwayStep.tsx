import { useState } from "react";
import { FiArrowLeft, FiCheck } from "react-icons/fi";
import { Link, useNavigate, useParams } from "react-router";

import { Button } from "../../components/common/Button/Button";
import { Card, CardBody } from "../../components/common/Card/Card";
import { CodeEditor } from "../../components/common/CodeEditor/CodeEditor";
import { PageHeader } from "../../components/layout/PageLayout/PageLayout";
import { pathways } from "../../data/pathways";
import { useUserStore } from "../../stores/userStore";
import type { CapstoneContent, CodeContent, QuizContent } from "../../types";
import styles from "./PathwayStep.module.css";

export function PathwayStep() {
  const { pathwayId, stepId } = useParams<{ pathwayId: string; stepId: string }>();
  const navigate = useNavigate();
  const { user, completePathwayStep } = useUserStore();
  const [userCode, setUserCode] = useState("");
  const [quizSelection, setQuizSelection] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const pathway = pathways.find((p) => p.id === pathwayId);
  const step = pathway?.steps.find((s) => s.id === stepId);
  const stepIndex = pathway?.steps.findIndex((s) => s.id === stepId) ?? -1;
  const nextStep = pathway?.steps[stepIndex + 1];

  if (!pathway || !step) {
    return <div>Step not found</div>;
  }

  const isCompleted = user?.pathwayProgress[pathway.id]?.includes(step.id);

  const handleComplete = async () => {
    setIsSubmitting(true);
    setError(null);

    try {
      // Validation based on type
      if (step.type === "quiz") {
        const content = step.content as QuizContent;
        if (quizSelection !== content.correctAnswer) {
          throw new Error("Incorrect answer. Please try again.");
        }
      } else if (step.type === "code") {
        // Simple validation: check if code changed from starter
        // Real implementation would run tests
        const content = step.content as CodeContent;
        if (userCode.trim() === content.starterCode.trim()) {
          throw new Error("Please solve the challenge before continuing.");
        }
      }

      await completePathwayStep(pathway.id, step.id, step.points);

      if (nextStep) {
        void navigate(`/pathways/${pathway.id}/step/${nextStep.id}`);
      } else {
        void navigate(`/pathways/${pathway.id}`);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to complete step");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.stepPage} data-testid="pathway-step-page">
      <Link to={`/pathways/${pathway.id}`} className={styles.backLink}>
        <FiArrowLeft /> Back to Pathway
      </Link>

      <PageHeader title={step.title} subtitle={`${step.points} points`} />

      <div className={styles.content}>
        {step.type === "text" && (
          <Card>
            <CardBody>
              <div className={styles.textContent}>{step.content as string}</div>
            </CardBody>
          </Card>
        )}

        {step.type === "video" && (
          <div className={styles.videoContainer}>
            <iframe
              src={step.content as string}
              title={step.title}
              allowFullScreen
              className={styles.iframe}
            />
          </div>
        )}

        {step.type === "quiz" && (
          <Card>
            <CardBody>
              <h3 className={styles.question}>{(step.content as QuizContent).question}</h3>
              <div className={styles.options}>
                {(step.content as QuizContent).options.map((option, index) => (
                  <button
                    key={index}
                    className={`${styles.option} ${quizSelection === index ? styles.selected : ""}`}
                    onClick={() => setQuizSelection(index)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </CardBody>
          </Card>
        )}

        {step.type === "code" && (
          <Card>
            <CardBody>
              <p className={styles.codeDesc}>{(step.content as CodeContent).description}</p>
              <CodeEditor
                value={userCode || (step.content as CodeContent).starterCode}
                onChange={setUserCode}
                height="300px"
              />
            </CardBody>
          </Card>
        )}

        {step.type === "capstone" && (
          <Card>
            <CardBody>
              <h3>Capstone Project</h3>
              <p>{(step.content as CapstoneContent).description}</p>
              <h4>Requirements:</h4>
              <ul>
                {(step.content as CapstoneContent).requirements.map((req: string, i: number) => (
                  <li key={i}>{req}</li>
                ))}
              </ul>
              <div className={styles.capstoneSubmit}>
                <label>Project URL (GitHub/Demo):</label>
                <input type="text" className={styles.input} placeholder="https://..." />
              </div>
            </CardBody>
          </Card>
        )}

        <div className={styles.actions}>
          {error && <p className={styles.error}>{error}</p>}
          <Button
            size="lg"
            onClick={() => void handleComplete()}
            isLoading={isSubmitting}
            disabled={isCompleted}
            rightIcon={isCompleted ? <FiCheck /> : undefined}
          >
            {isCompleted ? "Completed" : "Complete & Continue"}
          </Button>
        </div>
      </div>
    </div>
  );
}
