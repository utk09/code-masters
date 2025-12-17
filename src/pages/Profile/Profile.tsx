import { FiAward, FiBookOpen, FiCalendar, FiCode, FiStar, FiUser, FiUsers } from "react-icons/fi";
import { Link } from "react-router";

import { Badge } from "../../components/common/Badge/Badge";
import { Button } from "../../components/common/Button/Button";
import { Card, CardBody, CardHeader } from "../../components/common/Card/Card";
import { LevelProgress } from "../../components/common/ProgressBar/ProgressBar";
import { PageHeader } from "../../components/layout/PageLayout/PageLayout";
import { challenges } from "../../data/challenges";
import { resources } from "../../data/resources";
import { useGuildStore } from "../../stores/guildStore";
import { useUserStore } from "../../stores/userStore";
import { formatPoints, getLevelTitle, getPointsForNextLevel } from "../../utils/points";
import styles from "./Profile.module.css";

export function Profile() {
  const { user } = useUserStore();
  const { getGuildById } = useGuildStore();

  if (!user) {
    return (
      <div className={styles.loading}>
        <p>Loading profile...</p>
      </div>
    );
  }

  const userGuild = user.guildId ? getGuildById(user.guildId) : null;
  const completedChallengesList = challenges.filter((c) => user.completedChallenges.includes(c.id));
  const completedResourcesList = resources.filter((r) => user.completedResources.includes(r.id));
  const upcomingBookings = user.bookings.filter((b) => b.status === "confirmed");

  const stats = [
    { label: "Total Points", value: formatPoints(user.points), icon: <FiStar /> },
    { label: "Challenges", value: user.completedChallenges.length, icon: <FiCode /> },
    { label: "Resources", value: user.completedResources.length, icon: <FiBookOpen /> },
    { label: "Achievements", value: user.achievements.length, icon: <FiAward /> },
  ];

  return (
    <div className={styles.profile} data-testid="profile-page">
      <PageHeader title="Your Profile" subtitle="Track your learning progress and achievements" />

      <div className={styles.layout}>
        <div className={styles.sidebar}>
          <Card variant="elevated" padding="lg">
            <CardBody>
              <div className={styles.profileHeader}>
                <div className={styles.avatar}>
                  {user.avatar ? <img src={user.avatar} alt={user.name} /> : <FiUser size={40} />}
                </div>
                <h2 className={styles.userName}>{user.name}</h2>
                <p className={styles.userEmail}>{user.email}</p>
              </div>

              <div className={styles.levelSection}>
                <div className={styles.levelInfo}>
                  <Badge variant="primary" size="lg">
                    Level {user.level}
                  </Badge>
                  <span className={styles.levelTitle}>{getLevelTitle(user.level)}</span>
                </div>
                <LevelProgress
                  currentPoints={user.points}
                  level={user.level}
                  nextLevelPoints={getPointsForNextLevel(user.points)}
                />
              </div>

              {userGuild && (
                <div className={styles.guildSection}>
                  <span className={styles.sectionLabel}>Guild</span>
                  <div className={styles.guildCard}>
                    <span className={styles.guildIcon}>{userGuild.icon}</span>
                    <div>
                      <p className={styles.guildName}>{userGuild.name}</p>
                      <p className={styles.guildMembers}>
                        <FiUsers /> {userGuild.memberCount} members
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </CardBody>
          </Card>
        </div>

        <div className={styles.main}>
          <div className={styles.statsGrid}>
            {stats.map((stat) => (
              <Card key={stat.label} variant="elevated" padding="md">
                <CardBody>
                  <div className={styles.stat}>
                    <div className={styles.statIcon}>{stat.icon}</div>
                    <div className={styles.statContent}>
                      <span className={styles.statValue}>{stat.value}</span>
                      <span className={styles.statLabel}>{stat.label}</span>
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>

          <Card variant="elevated">
            <CardHeader title="Upcoming Sessions" icon={<FiCalendar />} />
            <CardBody>
              {upcomingBookings.length > 0 ? (
                <div className={styles.bookingsList}>
                  {upcomingBookings.map((booking) => (
                    <div key={booking.id} className={styles.bookingItem}>
                      <div className={styles.bookingInfo}>
                        <span className={styles.bookingMentor}>{booking.mentorName}</span>
                        <span className={styles.bookingTime}>
                          {new Date(booking.date).toLocaleDateString("en-US", {
                            weekday: "short",
                            month: "short",
                            day: "numeric",
                          })}{" "}
                          at {booking.time}
                        </span>
                      </div>
                      {booking.topic && (
                        <span className={styles.bookingTopic}>{booking.topic}</span>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className={styles.emptyState}>
                  <p>No upcoming sessions</p>
                  <Link to="/mentorship">
                    <Button variant="outline" size="sm">
                      Book a Session
                    </Button>
                  </Link>
                </div>
              )}
            </CardBody>
          </Card>

          <Card variant="elevated">
            <CardHeader
              title="Completed Challenges"
              icon={<FiCode />}
              action={
                <Link to="/challenges">
                  <Button variant="ghost" size="sm">
                    View All
                  </Button>
                </Link>
              }
            />
            <CardBody>
              {completedChallengesList.length > 0 ? (
                <div className={styles.completedList}>
                  {completedChallengesList.slice(0, 5).map((challenge) => (
                    <Link
                      key={challenge.id}
                      to={`/challenges/${challenge.id}`}
                      className={styles.completedItem}
                    >
                      <span className={styles.completedTitle}>{challenge.title}</span>
                      <Badge variant="success" size="sm">
                        {challenge.points} pts
                      </Badge>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className={styles.emptyState}>
                  <p>No challenges completed yet</p>
                  <Link to="/challenges">
                    <Button variant="outline" size="sm">
                      Start a Challenge
                    </Button>
                  </Link>
                </div>
              )}
            </CardBody>
          </Card>

          <Card variant="elevated">
            <CardHeader
              title="Completed Resources"
              icon={<FiBookOpen />}
              action={
                <Link to="/resources">
                  <Button variant="ghost" size="sm">
                    View All
                  </Button>
                </Link>
              }
            />
            <CardBody>
              {completedResourcesList.length > 0 ? (
                <div className={styles.completedList}>
                  {completedResourcesList.slice(0, 5).map((resource) => (
                    <div key={resource.id} className={styles.completedItem}>
                      <span className={styles.completedTitle}>{resource.title}</span>
                      <Badge variant="info" size="sm">
                        {resource.points} pts
                      </Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <div className={styles.emptyState}>
                  <p>No resources completed yet</p>
                  <Link to="/resources">
                    <Button variant="outline" size="sm">
                      Browse Resources
                    </Button>
                  </Link>
                </div>
              )}
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
