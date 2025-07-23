import styles from "./MessageSection.module.css";

const MessageSection = ({ message, setMessage, children }) => (
  <div className={styles.row}>
    <label className={styles.label}>Write your message</label>
    <div className={styles.messageArea}>
      <textarea
        className={styles.textarea}
        placeholder="What do you want to say to your future self?"
        value={message}
        onChange={e => setMessage(e.target.value)}
      />
      {children}
    </div>
  </div>
);

export default MessageSection; 