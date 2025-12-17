import { FiAward, FiCheckCircle, FiCode, FiFileText, FiLock, FiPlay } from "react-icons/fi";
import { Link, useParams } from "react-router";

import { Badge } from "../../components/common/Badge/Badge";
import { Button } from "../../components/common/Button/Button";
import { Card, CardBody } from "../../components/common/Card/Card";
import { PageHeader } from "../../components/layout/PageLayout/PageLayout";
import { pathways } from "../../data/pathways";
import { useUserStore } from "../../stores/userStore";
import styles from "./PathwayDetail.module.css";

export function PathwayDetail() {
  const { id } = useParams<{ id: string }>();
  const { user, resetPathway } = useUserStore();

  const pathway = pathways.find((p) => p.id === id);

  if (!pathway) {
    return <div>Pathway not found</div>;
  }

  const completedSteps = user?.pathwayProgress[pathway.id] || [];
  const isPathwayComplete = completedSteps.length === pathway.steps.length;

  const getStepIcon = (type: string) => {
    switch (type) {
      case "video":
        return <FiPlay />;
      case "code":
        return <FiCode />;
      case "quiz":
        return <FiFileText />;
      case "capstone":
        return <FiAward />;
      default:
        return <FiFileText />;
    }
  };

  return (
    <div className={styles.detail} data-testid="pathway-detail-page">
      <Link to="/pathways" className={styles.backLink}>
        ← Back to Pathways
      </Link>

      <PageHeader
        title={pathway.title}
        subtitle={pathway.description}
        action={
          <div className={styles.headerStats}>
            <Badge variant="primary">{pathway.totalPoints} pts</Badge>
            <span className={styles.progress}>
              {completedSteps.length}/{pathway.steps.length} Steps
            </span>
            {isPathwayComplete && (
              <>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => alert("Certificate generation is coming soon!")}
                  data-testid="generate-certificate-button"
                >
                  Generate Certificate (Coming Soon)
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => {
                    if (confirm("Are you sure you want to reset your progress for this pathway?")) {
                      void resetPathway(pathway.id);
                    }
                  }}
                  data-testid="reset-pathway-button"
                >
                  Reset Pathway
                </Button>
              </>
            )}
          </div>
        }
      />

      <div className={styles.steps}>
        {pathway.steps.map((step, index) => {
          const isCompleted = completedSteps.includes(step.id);
          const isLocked = index > 0 && !completedSteps.includes(pathway.steps[index - 1].id);
          const isNext = !isLocked && !isCompleted;

          return (
            <Card
              key={step.id}
              className={`${styles.stepCard} ${isLocked ? styles.locked : ""} ${isCompleted ? styles.completed : ""} ${isNext ? styles.next : ""}`}
            >
              <CardBody className={styles.stepBody}>
                <div className={styles.stepIcon}>{getStepIcon(step.type)}</div>
                <div className={styles.stepInfo}>
                  <div className={styles.stepHeader}>
                    <span className={styles.stepType}>{step.type.toUpperCase()}</span>
                    <span className={styles.stepPoints}>{step.points} pts</span>
                  </div>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                </div>
                <div className={styles.stepAction}>
                  {(() => {
                    if (isCompleted) {
                      return (
                        <div className={styles.completedBadge}>
                          <FiCheckCircle /> Completed
                        </div>
                      );
                    }
                    if (isLocked) {
                      return (
                        <div className={styles.lockedBadge}>
                          <FiLock /> Locked
                        </div>
                      );
                    }
                    return (
                      <Link to={`/pathways/${pathway.id}/step/${step.id}`}>
                        <Button size="sm">Start</Button>
                      </Link>
                    );
                  })()}
                </div>
              </CardBody>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
