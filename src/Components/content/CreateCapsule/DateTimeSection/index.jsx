import styles from "./DateTimeSection.module.css";

const DateTimeSection = ({ revealDate, setRevealDate, revealTime, setRevealTime }) => (
  <div className={styles.dateInputs}>
    <input
      type="date"
      className={styles.dateInput}
      value={revealDate}
      onChange={e => setRevealDate(e.target.value)}
    />
    <input
      type="time"
      className={styles.timeInput}
      value={revealTime}
      onChange={e => setRevealTime(e.target.value)}
    />
  </div>
);

export default DateTimeSection; 