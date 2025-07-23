import React, { useState, useEffect } from "react";
import Button from "../../Components/shared/button";
import styles from "./Profile.module.css";
import { useNavigate } from "react-router-dom";
import { removeToken } from "../../Components/content/auth/auth";
import UserCapsules from "../../Components/shared/UserCapsules";
import Modal from "../../Components/shared/Modal";
import CapsuleDetail from "../../Components/shared/capsuleDetail";
import NextCapsuleCountdown from "../../Components/shared/NextCapsuleCountdown";
import axios from "axios";
import useUserCapsules from "./logic";

const username = localStorage.getItem("username") || "User";

const Profile = () => {
  const navigate = useNavigate();
  const [selectedCapsule, setSelectedCapsule] = useState(null);
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
        setCapsules(res.data.payload);
      } catch (err) {
        setError("Failed to load your capsules.");
      } finally {
        setLoading(false);
      }
    };
    fetchCapsules();
  }, []);

  const handleLogout = () => {
    removeToken();
    navigate("/auth");
  };

  return (
    <div className={styles.profilePage}>
      <div className={styles.logoutRow}>
        <Button text="Logout" variant="secondary" onClick={handleLogout} />
      </div>
      <div className={styles.welcomeSection}>
        <h2 className={styles.welcomeMsg}>
          <span className={styles.highlight}>Welcome back</span>, {username}!
        </h2>
        <div className={styles.nextCapsuleMsg}>
          {loading ? "Loading..." : error ? error : <NextCapsuleCountdown capsules={capsules} />}
        </div>
        <Button
          text="+ Create New Capsule"
          variant="primary"
          className={styles.createBtn}
          onClick={() => navigate("/create-capsule")}
        />
      </div>
      <section className={styles.upcomingSection}>
        <h3 className={styles.sectionTitle}>Your Public Capsules:</h3>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div style={{ color: "red" }}>{error}</div>
        ) : (
          <UserCapsules filter={c => c.privacy === "public"} onViewClick={setSelectedCapsule} capsules={capsules} />
        )}
        <div className={styles.dashboardBtnContainer}>
          <Button
            text="Go to Dashboard"
            variant="primary"
            onClick={() => navigate("/my-capsules")}
          />
        </div>
      </section>
      {selectedCapsule && (
        <Modal onClose={() => setSelectedCapsule(null)}>
          <CapsuleDetail capsule={selectedCapsule} onBack={() => setSelectedCapsule(null)} />
        </Modal>
      )}
    </div>
  );
};

export default Profile; 