import React from "react";
import Button from "../../Components/shared/button";
import styles from "./Profile.module.css";
import { useNavigate } from "react-router-dom";
import { removeToken } from "../../Components/content/auth/auth";

const username = localStorage.getItem("username") || "User";
const nextCapsule = { title: "2024 Christmas", opensIn: "3 days, 4 hours" };
const upcomingCapsules = [
  { title: "Beirut Memories", status: "Unlocked" },
  { title: "2024 Christmas", status: "Opens in 3 days, 4 hours" },
  { title: "Beirut Memories", status: "Opens in 3 months, 17 days" },
];

const Profile = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    removeToken();
    navigate("/auth");
  };
  return (
    <div className={styles.profilePage}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
        <Button text="Logout" variant="secondary" onClick={handleLogout} />
      </div>
      <div className={styles.welcomeSection}>
        <h2 className={styles.welcomeMsg}>
          <span className={styles.highlight}>Welcome back</span>, {username}!
        </h2>
        <div className={styles.nextCapsuleMsg}>
          Your next capsule opens in {nextCapsule.opensIn}
        </div>
        <Button
          text="+ Create New Capsule"
          variant="primary"
          className={styles.createBtn}
          onClick={() => navigate("/create-capsule")}
        />
      </div>
      <section className={styles.upcomingSection}>
        <h3 className={styles.sectionTitle}>Upcoming Capsules:</h3>
        <div className={styles.capsuleGrid}>
          {upcomingCapsules.map((capsule, idx) => (
            <div key={idx} className={styles.capsuleCard}>
              <div className={styles.capsuleTitle}>🎓 {capsule.title}</div>
              <div className={styles.capsuleStatus}>{capsule.status}</div>
            </div>
          ))}
        </div>
        <Button text="See More" variant="primary" className={styles.seeMoreBtn} />
      </section>
    </div>
  );
};

export default Profile; 