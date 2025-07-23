import React, { useState, useEffect } from "react";
import Button from "../../Components/shared/button";
import TimeCapsuleCard from "../../Components/shared/card";
import CapsuleDetail from "../../Components/shared/capsuleDetail";
import Modal from "../../Components/shared/Modal";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css";
import { getToken } from "../../Components/content/auth/auth";

const features = [
  { icon: "✏️", color: "var(--feature-1-color)", text: "Write messages to your future self" },
  { icon: "🌐", color: "var(--feature-2-color)", text: "Explore others messages on a public wall" },
  { icon: "💾", color: "var(--feature-3-color)", text: "Save your thoughts to revisit later" },
];

const Home = () => {
  const [publicCapsules, setPublicCapsules] = useState([]);
  const [selectedCapsule, setSelectedCapsule] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/v0.1/capsules")
      .then(res => setPublicCapsules(res.data.payload))
      .catch(err => console.error("Failed to fetch capsules", err));
  }, []);

  return (
    <div className={styles.homePageContainer}>
      <main className={styles.homeMain}>
        <section className={styles.heroSection}>
          <h1>
            Send Messages to the <span className={styles.highlight}>Future</span>
          </h1>
          <p className={styles.subtitle}>
            Write messages, attach media, choose reveal dates, and share memories.
          </p>
          <div className={styles.heroButtons}>
            <Button 
              text="Create your time capsule now" 
              variant="primary" 
              onClick={() => {
                const token = getToken();
                if (token) {
                  navigate("/profile");
                } else {
                  navigate("/auth");
                }
              }}
            />
          </div>
        </section>
        <section className={styles.featuresSection}>
          <h2>Features</h2>
          <div className={styles.featuresContent}>
            <ul className={styles.featuresList}>
              {features.map((f, i) => (
                <li key={i}>
                  <span className={styles.icon} style={{ color: f.color }}>{f.icon}</span>
                  {f.text}
                </li>
              ))}
            </ul>
            <div className={styles.featuresImage}>
              <img src="/photos/Hero-section.jpeg" alt="Feature illustration" />
            </div>
          </div>
        </section>
        <section className={styles.publicCapsulesSection}>
          <h2>Explore Public Capsules</h2>
          <div className={styles.capsulesList}>
            {publicCapsules.slice(0, 3).map((capsule) => (
              <TimeCapsuleCard
                key={capsule.id}
                emoji={capsule.emoji}
                title={capsule.title}
                tags={capsule.tags}
                imageSrc={capsule.cover_image}
                status={capsule.privacy}
                onViewClick={() => setSelectedCapsule(capsule)}
              />
            ))}
          </div>
          {publicCapsules.length > 3 && (
            <div className={styles.exploreMoreBtnContainer}>
              <Button text="Explore More" variant="primary" onClick={() => navigate("/wall")}/>
            </div>
          )}
        </section>
        {selectedCapsule && (
          <Modal onClose={() => setSelectedCapsule(null)}>
            <CapsuleDetail
              capsule={selectedCapsule}
              onBack={() => setSelectedCapsule(null)}
            />
          </Modal>
        )}
      </main>
    </div>
  );
};

export default Home;
