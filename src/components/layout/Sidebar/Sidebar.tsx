import {
  FiAward,
  FiBookOpen,
  FiCalendar,
  FiCode,
  FiHome,
  FiMap,
  FiShoppingBag,
  FiUser,
  FiUsers,
  FiX,
} from "react-icons/fi";
import { NavLink } from "react-router";

import { ThemeToggle } from "../../common/ThemeToggle/ThemeToggle";
import styles from "./Sidebar.module.css";

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

const navItems = [
  { path: "/", label: "Home", icon: FiHome },
  { path: "/pathways", label: "Pathways", icon: FiMap },
  { path: "/challenges", label: "Challenges", icon: FiCode },
  { path: "/resources", label: "Resources", icon: FiBookOpen },
  { path: "/mentorship", label: "Mentorship", icon: FiCalendar },
  { path: "/guilds", label: "Guilds", icon: FiUsers },
  { path: "/profile", label: "Profile", icon: FiUser },
];

const comingSoonItems = [
  { label: "Certifications", icon: FiAward },
  { label: "Rewards Store", icon: FiShoppingBag },
];

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      {isOpen && <div className={styles.overlay} onClick={onClose} />}

      <aside className={`${styles.sidebar} ${isOpen ? styles.open : ""}`} data-testid="sidebar">
        <div className={styles.header}>
          <span className={styles.title}>Navigation</span>
          <button className={styles.closeButton} onClick={onClose} aria-label="Close menu">
            <FiX size={20} />
          </button>
        </div>

        <nav className={styles.nav}>
          <ul className={styles.navList}>
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ""}`}
                  onClick={onClose}
                >
                  <item.icon className={styles.navIcon} />
                  <span>{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>

          <div className={styles.comingSoon}>
            <span className={styles.comingSoonLabel}>Coming Soon</span>
            <ul className={styles.navList}>
              {comingSoonItems.map((item) => (
                <li key={item.label}>
                  <div className={styles.disabledLink}>
                    <item.icon className={styles.navIcon} />
                    <span>{item.label}</span>
                    <span className={styles.badge}>Soon</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <div className={styles.footer}>
          <ThemeToggle />
          <p className={styles.mlhBranding}>
            Powered by <strong>MLH</strong>
          </p>
        </div>
      </aside>
    </>
  );
}
