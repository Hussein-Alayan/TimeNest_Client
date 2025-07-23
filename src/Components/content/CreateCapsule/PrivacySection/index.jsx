import styles from "./PrivacySection.module.css";

const PrivacySection = ({ privacy, setPrivacy, privacyOptions }) => (
  <div className={styles.row}>
    <label className={styles.label}>Select Privacy Setting</label>
    <div className={styles.privacyRadios}>
      {privacyOptions.map(opt => (
        <label key={opt.value} className={styles.radioLabel}>
          <input
            type="radio"
            name="privacy"
            value={opt.value}
            checked={privacy === opt.value}
            onChange={() => setPrivacy(opt.value)}
            className={styles.radioInput}
          />
          {opt.label}
        </label>
      ))}
    </div>
  </div>
);

export default PrivacySection; 