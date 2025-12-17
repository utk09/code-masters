import { FiMenu, FiStar, FiUser } from "react-icons/fi";
import { Link } from "react-router";

import { useUserStore } from "../../../stores/userStore";
import { formatPoints, getLevelTitle } from "../../../utils/points";
import styles from "./Navbar.module.css";

type NavbarProps = {
  onMenuClick: () => void;
};

export function Navbar({ onMenuClick }: NavbarProps) {
  const { user } = useUserStore();

  return (
    <nav className={styles.navbar} data-testid="navbar">
      <div className={styles.left}>
        <button className={styles.menuButton} onClick={onMenuClick} aria-label="Open menu">
          <FiMenu size={24} />
        </button>
        <Link to="/" className={styles.logo}>
          <img src="/logo.png" alt="MLH Code Masters" className={styles.logoImage} />
          <span className={styles.logoText}>Code Masters</span>
        </Link>
      </div>

      <div className={styles.right}>
        {user && (
          <>
            <div className={styles.points}>
              <FiStar className={styles.pointsIcon} />
              <span className={styles.pointsValue}>{formatPoints(user.points)}</span>
              <span className={styles.pointsLabel}>pts</span>
            </div>

            <Link to="/profile" className={styles.profile}>
              <div className={styles.profileInfo}>
                <span className={styles.profileName}>{user.name}</span>
                <span className={styles.profileLevel}>
                  Level {user.level} - {getLevelTitle(user.level)}
                </span>
              </div>
              <div className={styles.avatar}>
                {user.avatar ? <img src={user.avatar} alt={user.name} /> : <FiUser size={20} />}
              </div>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
