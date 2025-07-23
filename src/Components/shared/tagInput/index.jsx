import React, { useState } from "react";
import styles from "./TagInput.module.css";
import Button from "../button";

const TagInput = ({ tags, setTags, placeholder = "Add a tag" }) => {
  const [input, setInput] = useState("");

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && input.trim()) {
      e.preventDefault();
      const newTag = input.trim();
      if (!tags.includes(newTag)) {
        setTags([...tags, newTag]);
      }
      setInput("");
    }
  };

  const handleAddTag = () => {
    if (input.trim() && !tags.includes(input.trim())) {
      setTags([...tags, input.trim()]);
      setInput("");
    }
  };

  const removeTag = (idx) => {
    setTags(tags.filter((_, i) => i !== idx));
  };

  return (
    <div className={styles.tagInputWrapper}>
      <div className={styles.tagsRow}>
        {tags.map((tag, idx) => (
          <span className={styles.tagChip} key={tag}>
            {tag}
            <button
              type="button"
              className={styles.removeBtn}
              onClick={() => removeTag(idx)}
              aria-label={`Remove tag ${tag}`}
            >
              ×
            </button>
          </span>
        ))}
        <input
          className={styles.input}
          type="text"
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
        />
        <Button type="button" className={styles.addBtn} onClick={handleAddTag}>+</Button>
      </div>
    </div>
  );
};

export default TagInput; 