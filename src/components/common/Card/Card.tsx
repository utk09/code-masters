import type { HTMLAttributes, ReactNode } from "react";

import styles from "./Card.module.css";

type CardProps = {
  variant?: "default" | "elevated" | "outlined" | "interactive";
  padding?: "none" | "sm" | "md" | "lg";
  children: ReactNode;
} & HTMLAttributes<HTMLDivElement>;

export function Card({
  variant = "default",
  padding = "md",
  children,
  className = "",
  ...props
}: CardProps) {
  const cardClasses = [styles.card, styles[variant], styles[`padding-${padding}`], className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={cardClasses} data-testid="card" {...props}>
      {children}
    </div>
  );
}

type CardHeaderProps = {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  icon?: ReactNode;
};

export function CardHeader({ title, subtitle, action, icon }: CardHeaderProps) {
  return (
    <div className={styles.header} data-testid="card-header">
      <div className={styles.headerContent}>
        {icon ? <div className={styles.headerIcon}>{icon}</div> : null}
        <div className={styles.headerText}>
          <h3 className={styles.title}>{title}</h3>
          {subtitle ? <p className={styles.subtitle}>{subtitle}</p> : null}
        </div>
      </div>
      {action ? <div className={styles.headerAction}>{action}</div> : null}
    </div>
  );
}

type CardBodyProps = {
  children: ReactNode;
  className?: string;
};

export function CardBody({ children, className = "" }: CardBodyProps) {
  return (
    <div className={`${styles.body} ${className}`} data-testid="card-body">
      {children}
    </div>
  );
}

type CardFooterProps = {
  children: ReactNode;
  align?: "left" | "center" | "right" | "between";
};

export function CardFooter({ children, align = "right" }: CardFooterProps) {
  return (
    <div className={`${styles.footer} ${styles[`align-${align}`]}`} data-testid="card-footer">
      {children}
    </div>
  );
}
