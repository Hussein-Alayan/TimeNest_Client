import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const privacyOptions = [
  { label: "Private", value: "private" },
  { label: "Unlisted", value: "unlisted" },
  { label: "Public", value: "public" },
];

// this custom hook is for handling all the create capsule logic and state
const useCreateCapsule = () => {
  const [title, setTitle] = useState("");
  const [color, setColor] = useState("");
  const [emoji, setEmoji] = useState("");
  const [message, setMessage] = useState("");
  const [privacy, setPrivacy] = useState("private");
  const [surprise, setSurprise] = useState(false);
  const [revealDate, setRevealDate] = useState("");
  const [revealTime, setRevealTime] = useState("");
  const [coverPhoto, setCoverPhoto] = useState(null);
  const [tags, setTags] = useState([]);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // this if i want to convert a file to base64 for uploading images
  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  // this if i want to combine date and time into a single string for the backend
  const getRevealAt = () => {
    if (!revealDate || !revealTime) return "";
    const date = new Date(`${revealDate}T${revealTime}`);
    const pad = n => n.toString().padStart(2, '0');
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
  };

  // this if i want to handle the form submit and send the capsule to the backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    if (!privacy || !revealDate || !revealTime) {
      setError("Privacy, date, and time are required.");
      return;
    }
    if (!message) {
      setError("Message is required.");
      return;
    }
    setLoading(true);
    let attachments = [];
    try {
      if (coverPhoto) {
        const base64 = await fileToBase64(coverPhoto);
        attachments.push({ type: "image", data: base64 });
      }
      const payload = {
        title,
        emoji,
        color,
        text_content: message,
        privacy,
        reveal_at: getRevealAt(),
        surprise_mode: surprise,
        attachments,
        tags,
      };
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:8000/api/v0.1/capsules",
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccess(true);
      setTimeout(() => navigate("/profile"), 1200);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to create capsule. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    title, setTitle,
    color, setColor,
    emoji, setEmoji,
    message, setMessage,
    privacy, setPrivacy,
    surprise, setSurprise,
    revealDate, setRevealDate,
    revealTime, setRevealTime,
    coverPhoto, setCoverPhoto,
    tags, setTags,
    fileInputRef,
    loading,
    error,
    success,
    handleSubmit,
    privacyOptions,
    navigate,
  };
};

export default useCreateCapsule; 