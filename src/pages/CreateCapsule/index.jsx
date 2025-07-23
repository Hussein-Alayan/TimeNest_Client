import React from "react";
import Button from "../../Components/shared/button";
import styles from "./CreateCapsule.module.css";
import TitleSection from "../../Components/content/CreateCapsule/TitleSection";
import MessageSection from "../../Components/content/CreateCapsule/MessageSection";
import DateTimeSection from "../../Components/content/CreateCapsule/DateTimeSection";
import MediaSection from "../../Components/content/CreateCapsule/MediaSection";
import PrivacySection from "../../Components/content/CreateCapsule/PrivacySection";
import TagInput from "../../Components/shared/tagInput";
import useCreateCapsule from "./logic";

const CreateCapsule = () => {
  const {
    title, setTitle,
    color, setColor,
    emoji, setEmoji,
    message, setMessage,
    privacy, setPrivacy,
    surprise, setSurprise,
    revealDate, setRevealDate,
    revealTime, setRevealTime,
    coverPhoto, setCoverPhoto,
    tags, setTags,
    fileInputRef,
    loading,
    error,
    success,
    handleSubmit,
    privacyOptions,
    navigate,
  } = useCreateCapsule();

  return (
    <div className={styles.createCapsulePage}>
      <Button className={styles.backBtn} type="button" variant="secondary" onClick={() => navigate("/profile")}>← Back</Button>
      <h1 className={styles.pageTitle}>Create New Capsule</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <TitleSection
          title={title}
          setTitle={setTitle}
          color={color}
          setColor={setColor}
          emoji={emoji}
          setEmoji={setEmoji}
        />
        <label className={styles.sectionTitle}>Add Tags (optional)</label>
        <TagInput tags={tags} setTags={setTags} placeholder="Add a tag and press Enter" />
        <MessageSection message={message} setMessage={setMessage} />
        <label className={styles.sectionTitle}>Set Capsule Reveal Time</label>
        <DateTimeSection
          revealDate={revealDate}
          setRevealDate={setRevealDate}
          revealTime={revealTime}
          setRevealTime={setRevealTime}
        />
        <label className={styles.sectionTitle}>Attach Media (optional)</label>
        <MediaSection
          coverPhoto={coverPhoto}
          setCoverPhoto={setCoverPhoto}
          fileInputRef={fileInputRef}
        />
        <PrivacySection
          privacy={privacy}
          setPrivacy={setPrivacy}
          privacyOptions={privacyOptions}
        />
        <div className={styles.row}>
          <div className={styles.surpriseMode}>
            <Button text="Seal until reveal" variant="primary" />
            <input
              type="checkbox"
              checked={surprise}
              onChange={e => setSurprise(e.target.checked)}
              className={styles.surpriseCheckbox}
            />
          </div>
        </div>
        {error && <div style={{ color: "#ff4d4f", fontWeight: 500 }}>{error}</div>}
        {success && <div style={{ color: "#4caf50", fontWeight: 500 }}>Capsule created!</div>}
        <div className={styles.actionBtns}>
          <Button text={loading ? "Saving..." : "Save Capsule"} variant="primary" type="submit" disabled={loading} />
          <Button text="Cancel" variant="secondary" onClick={() => navigate("/profile")}/>
        </div>
      </form>
    </div>
  );
};

export default CreateCapsule; 