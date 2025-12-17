import { useState } from "react";
import { FiCheck, FiExternalLink, FiPlay, FiSearch } from "react-icons/fi";

import { Badge, PointsBadge } from "../../components/common/Badge/Badge";
import { Button } from "../../components/common/Button/Button";
import { Card } from "../../components/common/Card/Card";
import { Modal } from "../../components/common/Modal/Modal";
import { PageHeader } from "../../components/layout/PageLayout/PageLayout";
import { resourceCategories, resources, resourceTypes } from "../../data/resources";
import { useUserStore } from "../../stores/userStore";
import type { Resource } from "../../types";
import styles from "./Resources.module.css";

export function Resources() {
  const { user, completeResource } = useUserStore();
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);

  const completedIds = user?.completedResources || [];

  const filteredResources = resources.filter((resource) => {
    if (categoryFilter !== null && resource.category !== categoryFilter) return false;
    if (typeFilter !== null && resource.type !== typeFilter) return false;
    if (search.length > 0) {
      const searchLower = search.toLowerCase();
      return (
        resource.title.toLowerCase().includes(searchLower) ||
        resource.description.toLowerCase().includes(searchLower) ||
        resource.tags.some((tag) => tag.toLowerCase().includes(searchLower))
      );
    }
    return true;
  });

  const handleMarkComplete = async (resource: Resource) => {
    if (!completedIds.includes(resource.id)) {
      await completeResource(resource.id, resource.points);
    }
    setSelectedResource(null);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "video":
        return <FiPlay />;
      default:
        return <FiExternalLink />;
    }
  };

  const getTypeVariant = (type: string) => {
    switch (type) {
      case "video":
        return "error" as const;
      case "article":
        return "info" as const;
      case "tutorial":
        return "success" as const;
      default:
        return "secondary" as const;
    }
  };

  return (
    <div className={styles.resources}>
      <PageHeader
        title="Resource Library"
        subtitle="Curated tutorials, videos, and articles to accelerate your learning"
      />

      <div className={styles.controls}>
        <div className={styles.searchBox}>
          <FiSearch className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search resources..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={styles.searchInput}
          />
        </div>
      </div>

      <div className={styles.filters}>
        <div className={styles.filterGroup}>
          <span className={styles.filterLabel}>Category:</span>
          <div className={styles.filterOptions}>
            <button
              className={`${styles.filterOption} ${categoryFilter === null ? styles.active : ""}`}
              onClick={() => setCategoryFilter(null)}
            >
              All
            </button>
            {resourceCategories.map((cat) => (
              <button
                key={cat}
                className={`${styles.filterOption} ${categoryFilter === cat ? styles.active : ""}`}
                onClick={() => setCategoryFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.filterGroup}>
          <span className={styles.filterLabel}>Type:</span>
          <div className={styles.filterOptions}>
            <button
              className={`${styles.filterOption} ${typeFilter === null ? styles.active : ""}`}
              onClick={() => setTypeFilter(null)}
            >
              All
            </button>
            {resourceTypes.map((type) => (
              <button
                key={type}
                className={`${styles.filterOption} ${typeFilter === type ? styles.active : ""}`}
                onClick={() => setTypeFilter(type)}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.grid}>
        {filteredResources.map((resource) => {
          const isCompleted = completedIds.includes(resource.id);
          return (
            <Card
              key={resource.id}
              variant="interactive"
              padding="none"
              className={isCompleted ? styles.completed : ""}
              onClick={() => setSelectedResource(resource)}
            >
              {resource.thumbnail && (
                <div className={styles.thumbnail}>
                  <img src={resource.thumbnail} alt={resource.title} />
                  {resource.duration && (
                    <span className={styles.duration}>{resource.duration}</span>
                  )}
                  {isCompleted && (
                    <div className={styles.completedOverlay}>
                      <FiCheck size={24} />
                    </div>
                  )}
                </div>
              )}
              <div className={styles.content}>
                <div className={styles.meta}>
                  <Badge
                    variant={getTypeVariant(resource.type)}
                    size="sm"
                    icon={getTypeIcon(resource.type)}
                  >
                    {resource.type}
                  </Badge>
                  <PointsBadge points={resource.points} size="sm" />
                </div>
                <h2 className={styles.title}>{resource.title}</h2>
                <p className={styles.description}>{resource.description}</p>
                <div className={styles.footer}>
                  <span className={styles.category}>{resource.category}</span>
                  {resource.author && <span className={styles.author}>by {resource.author}</span>}
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {filteredResources.length === 0 && (
        <div className={styles.empty}>
          <p>No resources found matching your criteria.</p>
          <Button
            variant="outline"
            onClick={() => {
              setCategoryFilter(null);
              setTypeFilter(null);
              setSearch("");
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}

      <Modal
        isOpen={selectedResource !== null}
        onClose={() => setSelectedResource(null)}
        title={selectedResource?.title}
        size="lg"
        footer={
          <div className={styles.modalFooter}>
            <Button variant="ghost" onClick={() => setSelectedResource(null)}>
              Close
            </Button>
            <a
              href={selectedResource?.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                if (selectedResource) {
                  void handleMarkComplete(selectedResource);
                }
              }}
            >
              <Button rightIcon={<FiExternalLink />}>
                {completedIds.includes(selectedResource?.id || "")
                  ? "View Again"
                  : "Start Learning"}
              </Button>
            </a>
          </div>
        }
      >
        {selectedResource && (
          <div className={styles.modalContent}>
            {selectedResource.youtubeId && (
              <div className={styles.videoContainer}>
                <iframe
                  src={`https://www.youtube.com/embed/${selectedResource.youtubeId}`}
                  title={selectedResource.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            )}
            <div className={styles.modalMeta}>
              <Badge
                variant={getTypeVariant(selectedResource.type)}
                icon={getTypeIcon(selectedResource.type)}
              >
                {selectedResource.type}
              </Badge>
              <span>{selectedResource.category}</span>
              {selectedResource.duration && <span>{selectedResource.duration}</span>}
              <PointsBadge points={selectedResource.points} />
            </div>
            <p className={styles.modalDescription}>{selectedResource.description}</p>
            {selectedResource.tags.length > 0 && (
              <div className={styles.tags}>
                {selectedResource.tags.map((tag) => (
                  <Badge key={tag} variant="default" size="sm">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}
