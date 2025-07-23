import LabeledInput from "../../../shared/labeledInput";
import styles from "./TitleSection.module.css";

const TitleSection = ({ title, setTitle, color, setColor, emoji, setEmoji }) => (
  <div className={styles.row}>
    <label className={styles.label}>Enter Title</label>
    <div className={styles.inlineInputs}>
      <LabeledInput
        label=""
        placeholder="Ex: Summer 2025"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <select className={styles.colorSelect} value={color} onChange={e => setColor(e.target.value)}>
        <option value="" disabled>Choose a color...</option>
        <option value="#00adb5">Teal</option>
        <option value="#ff9800">Orange</option>
        <option value="#2196f3">Blue</option>
      </select>
      <select className={styles.emojiSelect} value={emoji} onChange={e => setEmoji(e.target.value)}>
        <option value="">😀</option>
        <option value="🎉">🎉</option>
        <option value="😎">😎</option>
        <option value="🥳">🥳</option>
        <option value="😁">😁</option>
      </select>
    </div>
  </div>
);

export default TitleSection; 