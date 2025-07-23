import React, { useMemo, useState, useEffect } from "react";

function getTimeDiffString(targetDate) {
  const now = new Date();
  const diffMs = new Date(targetDate) - now;
  if (diffMs <= 0) return "Now open!";
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
  return `${days} days, ${hours} hours`;
}

const NextCapsuleCountdown = ({ capsules }) => {
  const nextCapsule = useMemo(() => {
    const now = new Date();
    return capsules
      .filter(c => new Date(c.reveal_at) > now)
      .sort((a, b) => new Date(a.reveal_at) - new Date(b.reveal_at))[0];
  }, [capsules]);

  const [countdown, setCountdown] = useState(
    nextCapsule ? getTimeDiffString(nextCapsule.reveal_at) : ""
  );

  useEffect(() => {
    if (!nextCapsule) return;
    const interval = setInterval(() => {
      setCountdown(getTimeDiffString(nextCapsule.reveal_at));
    }, 60000);
    setCountdown(getTimeDiffString(nextCapsule.reveal_at));
    return () => clearInterval(interval);
  }, [nextCapsule]);

  if (!nextCapsule) return <div>No upcoming capsules.</div>;

  return (
    <div>
      Your next capsule opens in {countdown}
    </div>
  );
};

export default NextCapsuleCountdown; 