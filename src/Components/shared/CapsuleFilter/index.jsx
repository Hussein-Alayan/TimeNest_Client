import React, { useState } from "react";
import styles from "./CapsuleFilter.module.css";
import Button from "../button";

const CapsuleFilter = ({ countries = [], tags = [], onFilterChange, onReset }) => {
  const [country, setCountry] = useState("");
  const [tag, setTag] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const handleApply = () => {
    onFilterChange({ country, tag, fromDate, toDate });
  };

  return (
    <div className={styles.filterBar}>
      <select value={country} onChange={e => setCountry(e.target.value)} className={styles.select}>
        <option value="">All Countries</option>
        {countries.map(c => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>
      <select value={tag} onChange={e => setTag(e.target.value)} className={styles.select}>
        <option value="">All Tags</option>
        {tags.map(t => (
          <option key={t} value={t}>{t}</option>
        ))}
      </select>
      <input type="date" value={fromDate} onChange={e => setFromDate(e.target.value)} className={styles.dateInput} />
      <input type="date" value={toDate} onChange={e => setToDate(e.target.value)} className={styles.dateInput} />
      <Button onClick={handleApply} variant="primary">Apply</Button>
      {onReset && (
        <Button onClick={onReset} variant="secondary" style={{ marginLeft: 8 }}>Reset</Button>
      )}
    </div>
  );
};

export default CapsuleFilter; 