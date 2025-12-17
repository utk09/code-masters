import { useState } from "react";
import { FiLogIn, FiLogOut, FiPlus, FiSearch, FiStar, FiUsers } from "react-icons/fi";

import { Badge } from "../../components/common/Badge/Badge";
import { Button } from "../../components/common/Button/Button";
import { Card, CardBody } from "../../components/common/Card/Card";
import { Modal } from "../../components/common/Modal/Modal";
import { PageHeader } from "../../components/layout/PageLayout/PageLayout";
import { guildCategories } from "../../data/guilds";
import { useGuildStore } from "../../stores/guildStore";
import { useUserStore } from "../../stores/userStore";
import { formatPoints } from "../../utils/points";
import styles from "./Guilds.module.css";

export function Guilds() {
  const { filter, setFilter, getFilteredGuilds, createGuild, joinGuild, leaveGuild } =
    useGuildStore();
  const { user, joinGuild: userJoinGuild, leaveGuild: userLeaveGuild } = useUserStore();

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newGuildName, setNewGuildName] = useState("");
  const [newGuildDesc, setNewGuildDesc] = useState("");
  const [newGuildCategory, setNewGuildCategory] = useState("frontend");

  const filteredGuilds = getFilteredGuilds();

  const handleCreateGuild = async () => {
    if (!user || newGuildName.trim().length === 0) return;

    const guild = await createGuild(
      newGuildName,
      newGuildDesc,
      newGuildCategory,
      user.id,
      user.name,
    );
    await userJoinGuild(guild.id);
    setShowCreateModal(false);
    setNewGuildName("");
    setNewGuildDesc("");
    setNewGuildCategory("frontend");
  };

  const handleJoinGuild = async (guildId: string) => {
    if (!user) return;
    await joinGuild(guildId, user.id, user.name);
    await userJoinGuild(guildId);
  };

  const handleLeaveGuild = async (guildId: string) => {
    if (!user) return;
    await leaveGuild(guildId, user.id);
    await userLeaveGuild();
  };

  return (
    <div className={styles.guilds} data-testid="guilds-page">
      <PageHeader
        title="Guilds"
        subtitle="Join communities of developers with shared interests"
        action={
          <Button leftIcon={<FiPlus />} onClick={() => setShowCreateModal(true)}>
            Create Guild
          </Button>
        }
      />

      <div className={styles.controls}>
        <div className={styles.searchBox}>
          <FiSearch className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search guilds..."
            value={filter.search}
            onChange={(e) => setFilter({ search: e.target.value })}
            className={styles.searchInput}
          />
        </div>
      </div>

      <div className={styles.categories}>
        <button
          className={`${styles.categoryBtn} ${filter.category === null ? styles.active : ""}`}
          onClick={() => setFilter({ category: null })}
        >
          All
        </button>
        {guildCategories.map((cat) => (
          <button
            key={cat.id}
            className={`${styles.categoryBtn} ${filter.category === cat.id ? styles.active : ""}`}
            onClick={() => setFilter({ category: cat.id })}
          >
            <span className={styles.categoryIcon}>{cat.icon}</span>
            {cat.name}
          </button>
        ))}
      </div>

      <div className={styles.grid}>
        {filteredGuilds.map((guild) => {
          const isMember = user?.guildId === guild.id;
          return (
            <Card key={guild.id} variant="elevated" padding="md">
              <CardBody>
                <div className={styles.guildHeader}>
                  <div className={styles.guildIcon}>{guild.icon}</div>
                  <div className={styles.guildInfo}>
                    <h3 className={styles.guildName}>{guild.name}</h3>
                    <div className={styles.guildStats}>
                      <span>
                        <FiUsers /> {guild.memberCount} members
                      </span>
                      <span>
                        <FiStar /> {formatPoints(guild.totalPoints)} pts
                      </span>
                    </div>
                  </div>
                </div>

                <p className={styles.guildDesc}>{guild.description}</p>

                <div className={styles.guildMeta}>
                  <Badge variant="secondary" size="sm">
                    {guildCategories.find((c) => c.id === guild.category)?.name || guild.category}
                  </Badge>
                  {isMember && (
                    <Badge variant="success" size="sm">
                      Member
                    </Badge>
                  )}
                </div>

                {isMember ? (
                  <Button
                    variant="outline"
                    fullWidth
                    leftIcon={<FiLogOut />}
                    onClick={() => void handleLeaveGuild(guild.id)}
                  >
                    Leave Guild
                  </Button>
                ) : (
                  <Button
                    fullWidth
                    leftIcon={<FiLogIn />}
                    onClick={() => void handleJoinGuild(guild.id)}
                    disabled={user?.guildId !== undefined}
                  >
                    {user?.guildId ? "Leave current guild first" : "Join Guild"}
                  </Button>
                )}
              </CardBody>
            </Card>
          );
        })}
      </div>

      {filteredGuilds.length === 0 && (
        <div className={styles.empty}>
          <p>No guilds found matching your criteria.</p>
          <Button variant="outline" onClick={() => setFilter({ category: null, search: "" })}>
            Clear Filters
          </Button>
        </div>
      )}

      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Create a New Guild"
        size="md"
        footer={
          <div className={styles.modalFooter}>
            <Button variant="ghost" onClick={() => setShowCreateModal(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => void handleCreateGuild()}
              disabled={newGuildName.trim().length === 0}
            >
              Create Guild
            </Button>
          </div>
        }
      >
        <div className={styles.createForm}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Guild Name</label>
            <input
              type="text"
              className={styles.formInput}
              placeholder="e.g., React Rangers"
              value={newGuildName}
              onChange={(e) => setNewGuildName(e.target.value)}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Description</label>
            <textarea
              className={styles.formTextarea}
              placeholder="What is your guild about?"
              value={newGuildDesc}
              onChange={(e) => setNewGuildDesc(e.target.value)}
              rows={3}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Category</label>
            <div className={styles.categorySelect}>
              {guildCategories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  className={`${styles.categoryOption} ${newGuildCategory === cat.id ? styles.selected : ""}`}
                  onClick={() => setNewGuildCategory(cat.id)}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
