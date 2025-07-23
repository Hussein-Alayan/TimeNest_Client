import Button from "../../../shared/button";
import styles from "./MediaSection.module.css";

const MediaSection = ({ coverPhoto, setCoverPhoto, fileInputRef }) => (
  <div className={styles.mediaBtns}>
    <Button
      text="Upload Cover Photo"
      variant="secondary"
      onClick={e => {
        e.preventDefault();
        fileInputRef.current && fileInputRef.current.click();
      }}
    />
    <input
      type="file"
      accept="image/*"
      ref={fileInputRef}
      style={{ display: "none" }}
      onChange={e => setCoverPhoto(e.target.files[0])}
    />
    <Button text="Record Audio" variant="secondary" />
    <Button text="+ Add Text Note" variant="secondary" />
    {coverPhoto && (
      <img
        src={URL.createObjectURL(coverPhoto)}
        alt="Cover Preview"
        style={{ marginTop: "1rem", maxWidth: "320px", width: "100%", borderRadius: "var(--radius)", display: "block", objectFit: "cover" }}
      />
    )}
  </div>
);

export default MediaSection; 