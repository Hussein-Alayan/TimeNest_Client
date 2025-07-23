import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../Components/shared/card";
import Button from "../../Components/shared/button";
import axios from "axios";
import styles from "./MyCapsules.module.css";

const TABS = ["Upcoming", "Revealed", "Unlisted"];

const MyCapsulesPage = () => {
  const [capsules, setCapsules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("Upcoming");
  const navigate = useNavigate();

  const fetchCapsules = async () => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/auth");
        return;
      }
      // Try to get all capsule details in one call
      const res = await axios.get("http://localhost:8000/api/v0.1/user/capsules", {
        headers: { Authorization: `Bearer ${token}` }
      });
      // If payload is already full capsule objects, use it directly
      setCapsules(res.data.payload);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load your capsules.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCapsules();
    // eslint-disable-next-line
  }, []);

  const now = useMemo(() => new Date(), []);
  const filtered = useMemo(() => {
    if (activeTab === "Upcoming") {
      return capsules.filter(c => new Date(c.reveal_at) > now);
    } else if (activeTab === "Revealed") {
      return capsules.filter(c => c.is_revealed);
    } else if (activeTab === "Unlisted") {
      return capsules.filter(c => c.privacy === "unlisted");
    }
    return [];
  }, [capsules, activeTab, now]);

  return (
    <div className={styles.page}>
      <div className={styles.backBtnRow}>
        <Button text="Back to Profile" variant="secondary" onClick={() => navigate("/profile")} />
      </div>
      <h2 className={styles.title}>My Capsules</h2>
      <div className={styles.tabs}>
        {TABS.map(tab => (
          <button
            key={tab}
            className={activeTab === tab ? styles.activeTab : styles.tab}
            onClick={() => setActiveTab(tab)}
            aria-selected={activeTab === tab}
            disabled={loading}
          >
            {tab}
          </button>
        ))}
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div style={{ color: "red" }}>
          {error}
          <Button text="Retry" variant="secondary" onClick={fetchCapsules} style={{ marginLeft: 12 }} />
        </div>
      ) : (
        <div className={styles.capsuleGrid}>
          {filtered.map(capsule => (
            <Card
              key={capsule.id}
              emoji={capsule.emoji}
              title={capsule.title}
              tags={capsule.tags}
              imageSrc={capsule.cover_image}
              status={capsule.privacy}
              revealDate={capsule.reveal_at}
              shareToken={capsule.share_token}
              isRevealed={capsule.is_revealed}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyCapsulesPage; 