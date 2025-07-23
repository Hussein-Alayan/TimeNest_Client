import React, { useEffect, useState } from "react";
import Card from "../card";
import axios from "axios";
import styles from "./UserCapsules.module.css";

const UserCapsules = ({ filter, onViewClick }) => {
  const [capsules, setCapsules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCapsules = async () => {
      setLoading(true);
      setError("");
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:8000/api/v0.1/user/capsules", {
          headers: { Authorization: `Bearer ${token}` }
        });
        const ids = res.data.payload.map(c => c.id);
        const capsulePromises = ids.map(id =>
          axios.get(`http://localhost:8000/api/v0.1/capsules/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
          }).then(res => res.data.payload)
            .catch(() => null)
        );
        const capsuleData = await Promise.all(capsulePromises);
        setCapsules(capsuleData.filter(Boolean));
      } catch {
        setError("Failed to load your capsules.");
      } finally {
        setLoading(false);
      }
    };
    fetchCapsules();
  }, []);

  let filteredCapsules = capsules;
  if (filter) {
    filteredCapsules = capsules.filter(filter);
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <div className={styles.capsuleGrid}>
      {filteredCapsules.map(capsule => (
        <Card
          key={capsule.id}
          emoji={capsule.emoji}
          title={capsule.title}
          tags={capsule.tags}
          imageSrc={capsule.cover_image}
          status={capsule.privacy}
          revealDate={capsule.reveal_at}
          onViewClick={onViewClick ? () => onViewClick(capsule) : undefined}
        />
      ))}
    </div>
  );
};

export default UserCapsules; 