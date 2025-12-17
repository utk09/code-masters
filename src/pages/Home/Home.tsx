import { FiArrowRight, FiBookOpen, FiCalendar, FiCode, FiStar, FiUsers } from "react-icons/fi";
import { Link } from "react-router";

import { DifficultyBadge, PointsBadge } from "../../components/common/Badge/Badge";
import { Button } from "../../components/common/Button/Button";
import { Card, CardBody } from "../../components/common/Card/Card";
import { LevelProgress } from "../../components/common/ProgressBar/ProgressBar";
import { challenges } from "../../data/challenges";
import { resources } from "../../data/resources";
import { useUserStore } from "../../stores/userStore";
import { getLevelTitle, getPointsForNextLevel } from "../../utils/points";
import styles from "./Home.module.css";

export function Home() {
  const { user } = useUserStore();

  const featuredChallenges = challenges.slice(0, 3);
  const featuredResources = resources.filter((r) => r.type === "video").slice(0, 4);

  return (
    <div className={styles.home}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Welcome back, <span className={styles.highlight}>{user?.name || "Coder"}</span>!
          </h1>
          <p className={styles.heroSubtitle}>
            Ready to level up your coding skills? Complete challenges, learn from resources, and
            earn points!
          </p>
          <div className={styles.heroActions}>
            <Link to="/challenges">
              <Button size="lg" rightIcon={<FiArrowRight />}>
                Start Coding
              </Button>
            </Link>
            <Link to="/resources">
              <Button variant="outline" size="lg">
                Browse Resources
              </Button>
            </Link>
          </div>
        </div>

        {user && (
          <Card variant="elevated" className={styles.statsCard}>
            <CardBody>
              <div className={styles.userLevel}>
                <div className={styles.levelBadge}>
                  <FiStar className={styles.levelIcon} />
                  <span>Level {user.level}</span>
                </div>
                <span className={styles.levelTitle}>{getLevelTitle(user.level)}</span>
              </div>
              <LevelProgress
                currentPoints={user.points}
                level={user.level}
                nextLevelPoints={getPointsForNextLevel(user.points)}
              />
              <div className={styles.statsGrid}>
                <div className={styles.stat}>
                  <span className={styles.statValue}>{user.points}</span>
                  <span className={styles.statLabel}>Total Points</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statValue}>{user.completedChallenges.length}</span>
                  <span className={styles.statLabel}>Challenges</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statValue}>{user.completedResources.length}</span>
                  <span className={styles.statLabel}>Resources</span>
                </div>
              </div>
            </CardBody>
          </Card>
        )}
      </section>

      {/* Quick Actions */}
      <section className={styles.quickActions}>
        <Link to="/challenges" className={styles.actionCard}>
          <div className={styles.actionIcon} style={{ background: "rgba(247, 75, 3, 0.1)" }}>
            <FiCode size={24} color="var(--primary-color-red)" />
          </div>
          <div className={styles.actionContent}>
            <h3>Coding Challenges</h3>
            <p>Test your skills with real problems</p>
          </div>
          <FiArrowRight className={styles.actionArrow} />
        </Link>

        <Link to="/resources" className={styles.actionCard}>
          <div className={styles.actionIcon} style={{ background: "rgba(49, 115, 183, 0.1)" }}>
            <FiBookOpen size={24} color="var(--primary-color-blue)" />
          </div>
          <div className={styles.actionContent}>
            <h3>Resource Library</h3>
            <p>Learn from curated tutorials</p>
          </div>
          <FiArrowRight className={styles.actionArrow} />
        </Link>

        <Link to="/mentorship" className={styles.actionCard}>
          <div className={styles.actionIcon} style={{ background: "rgba(16, 185, 129, 0.1)" }}>
            <FiCalendar size={24} color="var(--success-color)" />
          </div>
          <div className={styles.actionContent}>
            <h3>Mentorship</h3>
            <p>Book sessions with experts</p>
          </div>
          <FiArrowRight className={styles.actionArrow} />
        </Link>

        <Link to="/guilds" className={styles.actionCard}>
          <div className={styles.actionIcon} style={{ background: "rgba(255, 220, 32, 0.1)" }}>
            <FiUsers size={24} color="var(--primary-color-yellow-dark)" />
          </div>
          <div className={styles.actionContent}>
            <h3>Guilds</h3>
            <p>Join a community of coders</p>
          </div>
          <FiArrowRight className={styles.actionArrow} />
        </Link>
      </section>

      {/* Featured Challenges */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2>Featured Challenges</h2>
          <Link to="/challenges" className={styles.seeAll}>
            See all <FiArrowRight />
          </Link>
        </div>
        <div className={styles.challengeGrid}>
          {featuredChallenges.map((challenge) => (
            <Link
              key={challenge.id}
              to={`/challenges/${challenge.id}`}
              className={styles.challengeCard}
            >
              <Card variant="interactive" padding="md">
                <CardBody>
                  <div className={styles.challengeHeader}>
                    <DifficultyBadge difficulty={challenge.difficulty} size="sm" />
                    <PointsBadge points={challenge.points} size="sm" />
                  </div>
                  <h3 className={styles.challengeTitle}>{challenge.title}</h3>
                  <p className={styles.challengeDesc}>{challenge.description}</p>
                  <span className={styles.challengeCategory}>{challenge.category}</span>
                </CardBody>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Resources */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2>Popular Resources</h2>
          <Link to="/resources" className={styles.seeAll}>
            See all <FiArrowRight />
          </Link>
        </div>
        <div className={styles.resourceGrid}>
          {featuredResources.map((resource) => (
            <Card key={resource.id} variant="interactive" padding="none">
              <div className={styles.resourceThumbnail}>
                <img src={resource.thumbnail} alt={resource.title} />
                {resource.duration && <span className={styles.duration}>{resource.duration}</span>}
              </div>
              <div className={styles.resourceContent}>
                <h3 className={styles.resourceTitle}>{resource.title}</h3>
                <div className={styles.resourceMeta}>
                  <span>{resource.category}</span>
                  <PointsBadge points={resource.points} size="sm" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
