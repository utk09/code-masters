import { type ReactNode, useEffect, useState } from "react";

import { useUserStore } from "../../../stores/userStore";
import { Navbar } from "../Navbar/Navbar";
import { Sidebar } from "../Sidebar/Sidebar";
import styles from "./PageLayout.module.css";

type PageLayoutProps = {
  children: ReactNode;
};

export function PageLayout({ children }: PageLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { initUser, isLoading } = useUserStore();

  useEffect(() => {
    void initUser();
  }, [initUser]);

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner} />
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className={styles.layout} data-testid="page-layout">
      <Navbar onMenuClick={() => setSidebarOpen(true)} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className={styles.main}>{children}</main>
    </div>
  );
}

type PageHeaderProps = {
  title: string;
  subtitle?: string;
  action?: ReactNode;
};

export function PageHeader({ title, subtitle, action }: PageHeaderProps) {
  return (
    <div className={styles.pageHeader} data-testid="page-header">
      <div className={styles.pageHeaderContent}>
        <h1 className={styles.pageTitle}>{title}</h1>
        {subtitle && <p className={styles.pageSubtitle}>{subtitle}</p>}
      </div>
      {action ? <div className={styles.pageHeaderAction}>{action}</div> : null}
    </div>
  );
}

type PageSectionProps = {
  title?: string;
  children: ReactNode;
  className?: string;
};

export function PageSection({ title, children, className = "" }: PageSectionProps) {
  return (
    <section className={`${styles.section} ${className}`} data-testid="page-section">
      {title && <h2 className={styles.sectionTitle}>{title}</h2>}
      {children}
    </section>
  );
}
