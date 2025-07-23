import React, { useMemo } from "react";
import styles from "./Card.module.css";
import Button from "../button";

const TimeCapsuleCard = ({
  emoji,
  title,
  tags = [],
  imageSrc,
  revealDate,
  status = "locked",
  onViewClick,
  className = "",
  shareToken,
  isRevealed,
}) => {
  const countdown = useMemo(() => {
    if (!revealDate) return "";
    const diff = new Date(revealDate) - new Date();
    if (diff <= 0) return "Now open!";
    const hrs = Math.floor(diff / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hrs}h ${mins}m`;
  }, [revealDate]);

  const isOpen = status === "public" || status === "unlisted";
  const showShareBtn = status === "unlisted" && isRevealed && shareToken;
  const shareUrl = shareToken ? `${window.location.origin}/api/v0.1/capsules/share/${shareToken}` : "";

  return (
    <div className={`${styles.timecard} ${styles[status] || ''} ${className}`}>
      {imageSrc && (
        <div className={styles.timecardImageWrapper}>
          <img src={imageSrc} alt={title} />
        </div>
      )}

      <div className={styles.timecardBody}>
        <div className={styles.infoSection}>
          <h4 className={styles.timecardTitle}>{emoji} {title}</h4>
          <div className={styles.timecardTags}>
            {tags.map((t, i) => (
              <span key={t.id || t} className={styles.timecardTag}>#{typeof t === 'string' ? t : t.name}</span>
            ))}
          </div>
        </div>
        <div className={styles.buttonSection}>
          {isOpen ? (
            <Button text="View Capsule" onClick={onViewClick} className={styles.timecardBtn} />
          ) : (
            <p className={styles.timecardCountdown}>{countdown}</p>
          )}
          {showShareBtn && (
            <Button
              text="Copy Share Link"
              variant="secondary"
              onClick={() => navigator.clipboard.writeText(shareUrl)}
              className={styles.timecardBtn}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default TimeCapsuleCard;