import { useState, useEffect, useCallback } from "react";
import axios from "axios";

// this custom hook is for fetching all my capsules and handling loading/error
const useUserCapsules = () => {
  const [capsules, setCapsules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // this if i want to refetch capsules (like after creating or deleting)
  const fetchCapsules = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      // this if i want to get my token and fetch my capsules from the backend
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
  }, []);

  // this if i want to fetch capsules on mount
  useEffect(() => {
    fetchCapsules();
  }, [fetchCapsules]);

  return { capsules, loading, error, refetch: fetchCapsules };
};

export default useUserCapsules; 