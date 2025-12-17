import { nanoid } from "nanoid";
import { useState } from "react";
import { FiCalendar, FiClock, FiSearch, FiStar } from "react-icons/fi";

import { Badge } from "../../components/common/Badge/Badge";
import { Button } from "../../components/common/Button/Button";
import { Card, CardBody } from "../../components/common/Card/Card";
import { Modal } from "../../components/common/Modal/Modal";
import { PageHeader } from "../../components/layout/PageLayout/PageLayout";
import { expertiseAreas, mentors } from "../../data/mentors";
import { useUserStore } from "../../stores/userStore";
import type { Booking, Mentor, TimeSlot } from "../../types";
import styles from "./Mentorship.module.css";

export function Mentorship() {
  const { user, addBooking } = useUserStore();
  const [search, setSearch] = useState("");
  const [expertiseFilter, setExpertiseFilter] = useState<string | null>(null);
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [bookingTopic, setBookingTopic] = useState("");
  const [showBookingSuccess, setShowBookingSuccess] = useState(false);

  const filteredMentors = mentors.filter((mentor) => {
    if (expertiseFilter !== null && !mentor.expertise.includes(expertiseFilter)) return false;
    if (search.length > 0) {
      const searchLower = search.toLowerCase();
      return (
        mentor.name.toLowerCase().includes(searchLower) ||
        mentor.title.toLowerCase().includes(searchLower) ||
        mentor.expertise.some((e) => e.toLowerCase().includes(searchLower))
      );
    }
    return true;
  });

  const handleBookSession = async () => {
    if (!selectedMentor || !selectedSlot || !user) return;

    const booking: Booking = {
      id: nanoid(),
      mentorId: selectedMentor.id,
      mentorName: selectedMentor.name,
      slotId: selectedSlot.id,
      date: selectedSlot.date,
      time: `${selectedSlot.startTime} - ${selectedSlot.endTime}`,
      topic: bookingTopic,
      status: "confirmed",
      createdAt: new Date(),
    };

    await addBooking(booking);
    setShowBookingSuccess(true);
    setSelectedMentor(null);
    setSelectedSlot(null);
    setBookingTopic("");
  };

  const availableSlots = selectedMentor?.availability.filter((slot) => !slot.isBooked) || [];

  const groupSlotsByDate = (slots: TimeSlot[]) => {
    const grouped: Record<string, TimeSlot[]> = {};
    slots.forEach((slot) => {
      if (grouped[slot.date] === undefined) {
        grouped[slot.date] = [];
      }
      grouped[slot.date].push(slot);
    });
    return grouped;
  };

  const groupedSlots = groupSlotsByDate(availableSlots);

  return (
    <div className={styles.mentorship} data-testid="mentorship-page">
      <PageHeader title="Mentorship" subtitle="Book 1-on-1 sessions with experienced developers" />

      <div className={styles.controls}>
        <div className={styles.searchBox}>
          <FiSearch className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search mentors..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={styles.searchInput}
          />
        </div>
      </div>

      <div className={styles.filters}>
        <span className={styles.filterLabel}>Expertise:</span>
        <div className={styles.filterOptions}>
          <button
            className={`${styles.filterOption} ${expertiseFilter === null ? styles.active : ""}`}
            onClick={() => setExpertiseFilter(null)}
          >
            All
          </button>
          {expertiseAreas.map((area) => (
            <button
              key={area}
              className={`${styles.filterOption} ${expertiseFilter === area ? styles.active : ""}`}
              onClick={() => setExpertiseFilter(area)}
            >
              {area}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.grid}>
        {filteredMentors.map((mentor) => (
          <Card key={mentor.id} variant="elevated" padding="md">
            <CardBody>
              <div className={styles.mentorHeader}>
                <img src={mentor.avatar} alt={mentor.name} className={styles.avatar} />
                <div className={styles.mentorInfo}>
                  <h3 className={styles.mentorName}>{mentor.name}</h3>
                  <p className={styles.mentorTitle}>
                    {mentor.title} {mentor.company && `@ ${mentor.company}`}
                  </p>
                  <div className={styles.rating}>
                    <FiStar className={styles.starIcon} />
                    <span>{mentor.rating.toFixed(1)}</span>
                    <span className={styles.sessions}>({mentor.sessionsCompleted} sessions)</span>
                  </div>
                </div>
              </div>

              <p className={styles.bio}>{mentor.bio}</p>

              <div className={styles.expertise}>
                {mentor.expertise.slice(0, 4).map((skill) => (
                  <Badge key={skill} variant="secondary" size="sm">
                    {skill}
                  </Badge>
                ))}
              </div>

              <Button fullWidth onClick={() => setSelectedMentor(mentor)} leftIcon={<FiCalendar />}>
                View Availability
              </Button>
            </CardBody>
          </Card>
        ))}
      </div>

      {filteredMentors.length === 0 && (
        <div className={styles.empty}>
          <p>No mentors found matching your criteria.</p>
          <Button
            variant="outline"
            onClick={() => {
              setExpertiseFilter(null);
              setSearch("");
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}

      <Modal
        isOpen={selectedMentor !== null}
        onClose={() => {
          setSelectedMentor(null);
          setSelectedSlot(null);
        }}
        title={`Book with ${selectedMentor?.name}`}
        size="lg"
        footer={
          selectedSlot ? (
            <div className={styles.modalFooter}>
              <Button variant="ghost" onClick={() => setSelectedSlot(null)}>
                Back
              </Button>
              <Button
                onClick={() => void handleBookSession()}
                disabled={bookingTopic.trim().length === 0}
              >
                Confirm Booking
              </Button>
            </div>
          ) : undefined
        }
      >
        {selectedMentor && !selectedSlot && (
          <div className={styles.slotsContainer}>
            <p className={styles.slotsTitle}>Available time slots:</p>
            {Object.entries(groupedSlots).length > 0 ? (
              Object.entries(groupedSlots).map(([date, slots]) => (
                <div key={date} className={styles.dateGroup}>
                  <h4 className={styles.dateLabel}>
                    {new Date(date).toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "short",
                      day: "numeric",
                    })}
                  </h4>
                  <div className={styles.slots}>
                    {slots.map((slot) => (
                      <button
                        key={slot.id}
                        className={styles.slot}
                        onClick={() => setSelectedSlot(slot)}
                      >
                        <FiClock />
                        {slot.startTime} - {slot.endTime}
                      </button>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <p className={styles.noSlots}>No available slots at the moment.</p>
            )}
          </div>
        )}

        {selectedSlot && (
          <div className={styles.bookingForm}>
            <div className={styles.selectedSlot}>
              <FiCalendar />
              <span>
                {new Date(selectedSlot.date).toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "short",
                  day: "numeric",
                })}{" "}
                at {selectedSlot.startTime}
              </span>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>What would you like to discuss?</label>
              <textarea
                className={styles.textarea}
                placeholder="e.g., Career advice, code review, system design..."
                value={bookingTopic}
                onChange={(e) => setBookingTopic(e.target.value)}
                rows={4}
              />
            </div>
          </div>
        )}
      </Modal>

      <Modal
        isOpen={showBookingSuccess}
        onClose={() => setShowBookingSuccess(false)}
        title="Booking Confirmed!"
        size="sm"
        footer={
          <Button onClick={() => setShowBookingSuccess(false)} fullWidth>
            Great!
          </Button>
        }
      >
        <div className={styles.successContent}>
          <div className={styles.successIcon}>
            <FiCalendar size={48} />
          </div>
          <p>Your mentorship session has been booked successfully!</p>
          <p className={styles.successNote}>View your upcoming sessions in your profile.</p>
        </div>
      </Modal>
    </div>
  );
}
