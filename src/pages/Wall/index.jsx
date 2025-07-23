import React, { useState, useEffect } from "react";
import axios from "axios";
import TimeCapsuleCard from "../../Components/shared/card";
import CapsuleDetail from "../../Components/shared/capsuleDetail";
import Modal from "../../Components/shared/Modal";
import CapsuleFilter from "../../Components/shared/CapsuleFilter";
import styles from "./Wall.module.css";

const Wall = () => {
  const [capsules, setCapsules] = useState([]);
  const [selectedCapsule, setSelectedCapsule] = useState(null);
  const [filters, setFilters] = useState({});
  const [loading, setLoading] = useState(false);
  const [countryList, setCountryList] = useState([]);
  const [tagList, setTagList] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/api/v0.1/countries")
      .then(res => setCountryList((res.data.payload || []).map(c => c.name)));
    axios.get("http://localhost:8000/api/v0.1/tags")
      .then(res => setTagList((res.data.payload || []).map(t => t.name)));
  }, []);

  const fetchCapsules = async (filters = {}) => {
    setLoading(true);
    const params = new URLSearchParams();
    if (filters.country) params.append("country", filters.country);
    if (filters.tag) params.append("tag", filters.tag);
    if (filters.fromDate) params.append("from_date", filters.fromDate);
    if (filters.toDate) params.append("to_date", filters.toDate);
    const url = `http://127.0.0.1:8000/api/v0.1/capsules?${params.toString()}`;
    const res = await axios.get(url);
    setCapsules(res.data.payload);
    setLoading(false);
  };

  useEffect(() => {
    fetchCapsules(filters);
    // eslint-disable-next-line
  }, [filters]);

  return (
    <div className={styles.wallPage}>
      <div className={styles.wallHeader}>
        <h1 className={styles.pageTitle}><span role="img" aria-label="globe">🌍</span> Explore Time Capsules</h1>
      </div>
      <CapsuleFilter
        countries={countryList}
        tags={tagList}
        onFilterChange={setFilters}
        onReset={() => setFilters({})}
      />
      <p className={styles.subtitle}>Messages from around the world, filtered by mood, time, and place.</p>
      <div className={styles.capsulesList}>
        {loading ? (
          <div>Loading...</div>
        ) : (
          capsules.map((capsule) => (
            <TimeCapsuleCard
              key={capsule.id}
              emoji={capsule.emoji}
              title={capsule.title}
              tags={capsule.tags}
              imageSrc={capsule.cover_image}
              status={capsule.privacy}
              onViewClick={() => setSelectedCapsule(capsule)}
            />
          ))
        )}
      </div>
      {selectedCapsule && (
        <Modal onClose={() => setSelectedCapsule(null)}>
          <CapsuleDetail
            capsule={selectedCapsule}
            onBack={() => setSelectedCapsule(null)}
          />
        </Modal>
      )}
    </div>
  );
};

export default Wall; 