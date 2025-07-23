import React from "react";
import styles from "./CapsuleDetail.module.css";
import Button from "../button";

const CapsuleDetail = ({ capsule, onBack }) => {
  if (!capsule) return null;

  // Check if the capsule is in surprise mode and not revealed yet
  const isSurprise = capsule.surprise_mode;
  const isRevealed = new Date(capsule.reveal_date) <= new Date();
  const hasContent = capsule.text_content || (capsule.attachments && capsule.attachments.length > 0);

  const revealDate = capsule.reveal_date || capsule.reveal_at;
  const formattedDate = revealDate && !isNaN(new Date(revealDate)) 
    ? new Date(revealDate).toLocaleString() 
    : "Unknown";

  return (
    <div className={styles.detailContainer}>
      <Button className={styles.backBtn} variant="secondary" onClick={onBack}>← Back</Button>
      <h2 className={styles.title}>{capsule.emoji} {capsule.title}</h2>
      {capsule.tags && capsule.tags.length > 0 && (
        <div className={styles.tagsRow}>
          {capsule.tags.map(tag => (
            <span key={tag.id} className={styles.tag}>#{tag.name}</span>
          ))}
        </div>
      )}
      <div className={styles.revealDate}>Reveal Date: {formattedDate}</div>
      {isSurprise && !isRevealed && !hasContent ? (
        <div className={styles.surpriseMsg}>
          This capsule is sealed in surprise mode.<br />
          The contents will be revealed on {capsule.reveal_date}.
        </div>
      ) : (
        <div className={styles.contentSection}>
          {capsule.attachments && capsule.attachments.length > 0 && capsule.attachments[0].type === 'image' && capsule.attachments[0].url && (
            <div className={styles.imagePreviewWrapper}>
              <img
                src={capsule.attachments[0].url}
                alt="Capsule Attachment"
                className={styles.imagePreview}
              />
            </div>
          )}
          {capsule.text_content && (
            <div className={styles.textContent}>{capsule.text_content}</div>
          )}
          {capsule.attachments && capsule.attachments.length > 0 && (
            <div className={styles.attachmentRow}>
              {capsule.attachments.map((att, i) => {
                if (i === 0 && att.type === 'image' && att.url) return null;
                return (
                  <div key={i} style={{ marginBottom: 8 }}>
                    <a href={att.url} target="_blank" rel="noopener noreferrer">
                      View Attachment {capsule.attachments.length > 1 ? i + 1 : ""}
                    </a>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CapsuleDetail; 