import type { ReactNode } from "react";

import styles from "./Badge.module.css";

type BadgeVariant = "default" | "primary" | "secondary" | "success" | "warning" | "error" | "info";
type BadgeSize = "sm" | "md" | "lg";

type BadgeProps = {
  variant?: BadgeVariant;
  size?: BadgeSize;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
};

export function Badge({
  variant = "default",
  size = "md",
  icon,
  children,
  className = "",
}: BadgeProps) {
  const badgeClasses = [styles.badge, styles[variant], styles[size], className]
    .filter(Boolean)
    .join(" ");

  return (
    <span className={badgeClasses}>
      {icon ? <span className={styles.icon}>{icon}</span> : null}
      {children}
    </span>
  );
}

type DifficultyBadgeProps = {
  difficulty: "beginner" | "intermediate" | "advanced";
  size?: BadgeSize;
};

export function DifficultyBadge({ difficulty, size = "md" }: DifficultyBadgeProps) {
  const variantMap: Record<string, BadgeVariant> = {
    beginner: "success",
    intermediate: "warning",
    advanced: "error",
  };

  const labelMap: Record<string, string> = {
    beginner: "Beginner",
    intermediate: "Intermediate",
    advanced: "Advanced",
  };

  return (
    <Badge variant={variantMap[difficulty]} size={size}>
      {labelMap[difficulty]}
    </Badge>
  );
}

type PointsBadgeProps = {
  points: number;
  size?: BadgeSize;
};

export function PointsBadge({ points, size = "md" }: PointsBadgeProps) {
  return (
    <Badge variant="primary" size={size} icon="⭐">
      {points} pts
    </Badge>
  );
}
