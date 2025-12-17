import styles from "./ProgressBar.module.css";

type ProgressBarProps = {
  value: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "success" | "warning" | "error" | "gradient";
  showLabel?: boolean;
  label?: string;
  animated?: boolean;
  className?: string;
};

export function ProgressBar({
  value,
  max = 100,
  size = "md",
  variant = "default",
  showLabel = false,
  label,
  animated = true,
  className = "",
}: ProgressBarProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  const progressClasses = [
    styles.container,
    styles[size],
    animated ? styles.animated : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const barClasses = [styles.bar, styles[variant]].filter(Boolean).join(" ");

  return (
    <div className={progressClasses}>
      {(showLabel || label) && (
        <div className={styles.labelContainer}>
          <span className={styles.label}>{label}</span>
          {showLabel && <span className={styles.percentage}>{Math.round(percentage)}%</span>}
        </div>
      )}
      <div className={styles.track}>
        <div className={barClasses} style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
}

type LevelProgressProps = {
  currentPoints: number;
  level: number;
  nextLevelPoints: number;
};

export function LevelProgress({ currentPoints, level, nextLevelPoints }: LevelProgressProps) {
  const thresholds = [0, 100, 300, 600, 1000, 1500, 2500, 4000, 6000, 9000];
  const currentThreshold = thresholds[Math.min(level - 1, thresholds.length - 1)];
  const pointsInLevel = currentPoints - currentThreshold;
  const pointsNeeded = nextLevelPoints - currentThreshold;

  return (
    <div className={styles.levelProgress}>
      <div className={styles.levelInfo}>
        <span className={styles.levelLabel}>Level {level}</span>
        <span className={styles.pointsLabel}>
          {currentPoints} / {nextLevelPoints} pts
        </span>
      </div>
      <ProgressBar value={pointsInLevel} max={pointsNeeded} variant="gradient" size="sm" />
    </div>
  );
}
