import { FiChevronRight } from "react-icons/fi";
import { Link } from "react-router";

import { Badge } from "../../components/common/Badge/Badge";
import { Button } from "../../components/common/Button/Button";
import { Card, CardBody } from "../../components/common/Card/Card";
import { PageHeader } from "../../components/layout/PageLayout/PageLayout";
import { pathways } from "../../data/pathways";
import { useUserStore } from "../../stores/userStore";
import styles from "./Pathways.module.css";

export function Pathways() {
  const { user } = useUserStore();

  return (
    <div className={styles.pathways} data-testid="pathways-page">
      <PageHeader
        title="Learning Pathways"
        subtitle="Structured learning paths to master specific skills"
      />

      <div className={styles.grid}>
        {pathways.map((pathway) => {
          const progress = user?.pathwayProgress[pathway.id] || [];
          const completedCount = progress.length;
          const totalSteps = pathway.steps.length;
          const percentage = Math.round((completedCount / totalSteps) * 100);

          return (
            <Card key={pathway.id} className={styles.card}>
              <CardBody>
                <div className={styles.header}>
                  <Badge variant="primary">{pathway.category}</Badge>
                  <span className={styles.points}>{pathway.totalPoints} pts</span>
                </div>
                <h2 className={styles.title}>{pathway.title}</h2>
                <p className={styles.description}>{pathway.description}</p>

                <div className={styles.progress}>
                  <div className={styles.progressBar}>
                    <div className={styles.progressFill} style={{ width: `${percentage}%` }} />
                  </div>
                  <span className={styles.progressText}>
                    {completedCount}/{totalSteps} Steps
                  </span>
                </div>

                <Link to={`/pathways/${pathway.id}`}>
                  <Button fullWidth rightIcon={<FiChevronRight />}>
                    {completedCount > 0 ? "Continue Pathway" : "Start Pathway"}
                  </Button>
                </Link>
              </CardBody>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
