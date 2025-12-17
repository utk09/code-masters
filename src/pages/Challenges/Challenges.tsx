import { useState } from "react";
import { FiFilter, FiSearch } from "react-icons/fi";
import { Link } from "react-router";

import { DifficultyBadge, PointsBadge } from "../../components/common/Badge/Badge";
import { Button } from "../../components/common/Button/Button";
import { Card, CardBody } from "../../components/common/Card/Card";
import { PageHeader } from "../../components/layout/PageLayout/PageLayout";
import { challengeCategories } from "../../data/challenges";
import { useChallengeStore } from "../../stores/challengeStore";
import { useUserStore } from "../../stores/userStore";
import styles from "./Challenges.module.css";

export function Challenges() {
  const { challenges, filter, setFilter, getFilteredChallenges } = useChallengeStore();
  const { user } = useUserStore();
  const [showFilters, setShowFilters] = useState(false);

  const filteredChallenges = getFilteredChallenges();
  const completedIds = user?.completedChallenges || [];

  const difficulties = ["beginner", "intermediate", "advanced"] as const;

  return (
    <div className={styles.challenges}>
      <PageHeader
        title="Coding Challenges"
        subtitle={`${challenges.length} challenges available - Complete them to earn points!`}
      />

      {/* Search and Filters */}
      <div className={styles.controls}>
        <div className={styles.searchBox}>
          <FiSearch className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search challenges..."
            value={filter.search}
            onChange={(e) => setFilter({ search: e.target.value })}
            className={styles.searchInput}
          />
        </div>
        <Button
          variant="outline"
          leftIcon={<FiFilter />}
          onClick={() => setShowFilters(!showFilters)}
        >
          Filters
        </Button>
      </div>

      {showFilters && (
        <Card className={styles.filterCard}>
          <CardBody>
            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Difficulty</label>
              <div className={styles.filterOptions}>
                <button
                  className={`${styles.filterOption} ${filter.difficulty === null ? styles.active : ""}`}
                  onClick={() => setFilter({ difficulty: null })}
                >
                  All
                </button>
                {difficulties.map((diff) => (
                  <button
                    key={diff}
                    className={`${styles.filterOption} ${filter.difficulty === diff ? styles.active : ""}`}
                    onClick={() => setFilter({ difficulty: diff })}
                  >
                    {diff.charAt(0).toUpperCase() + diff.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Category</label>
              <div className={styles.filterOptions}>
                <button
                  className={`${styles.filterOption} ${filter.category === null ? styles.active : ""}`}
                  onClick={() => setFilter({ category: null })}
                >
                  All
                </button>
                {challengeCategories.map((cat) => (
                  <button
                    key={cat}
                    className={`${styles.filterOption} ${filter.category === cat ? styles.active : ""}`}
                    onClick={() => setFilter({ category: cat })}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </CardBody>
        </Card>
      )}

      {/* Challenge List */}
      <div className={styles.grid}>
        {filteredChallenges.map((challenge) => {
          const isCompleted = completedIds.includes(challenge.id);
          return (
            <Link key={challenge.id} to={`/challenges/${challenge.id}`} className={styles.cardLink}>
              <Card
                variant="interactive"
                padding="md"
                className={isCompleted ? styles.completed : ""}
              >
                <CardBody>
                  <div className={styles.cardHeader}>
                    <DifficultyBadge difficulty={challenge.difficulty} size="sm" />
                    <PointsBadge points={challenge.points} size="sm" />
                  </div>
                  <h3 className={styles.cardTitle}>{challenge.title}</h3>
                  <p className={styles.cardDesc}>{challenge.description}</p>
                  <div className={styles.cardFooter}>
                    <span className={styles.category}>{challenge.category}</span>
                    {isCompleted && <span className={styles.completedBadge}>Completed</span>}
                  </div>
                </CardBody>
              </Card>
            </Link>
          );
        })}
      </div>

      {filteredChallenges.length === 0 && (
        <div className={styles.empty}>
          <p>No challenges found matching your criteria.</p>
          <Button
            variant="outline"
            onClick={() => setFilter({ difficulty: null, category: null, search: "" })}
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
}
