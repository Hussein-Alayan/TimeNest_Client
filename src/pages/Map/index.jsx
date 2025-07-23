import React, { useRef, useEffect, useState } from "react";
import styles from "./Map.module.css";
import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";

// Use API key from environment variable
maptilersdk.config.apiKey = process.env.REACT_APP_MAPTILER_API_KEY;

const MapPage = () => {
  const mapRef = useRef(null);
  const [capsules, setCapsules] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/api/v0.1/capsules")
      .then(res => res.json())
      .then(data => {
        setCapsules(
          (data.payload || []).filter(
            c => c.gps_lat && c.gps_lng
          )
        );
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!mapRef.current || loading) return;
    const map = new maptilersdk.Map({
      container: mapRef.current,
      style: maptilersdk.MapStyle.STREETS,
      center: [35.5, 33.9],
      zoom: 5,
    });

    capsules.forEach(capsule => {
      const marker = new maptilersdk.Marker()
        .setLngLat([parseFloat(capsule.gps_lng), parseFloat(capsule.gps_lat)])
        .setPopup(
          new maptilersdk.Popup().setHTML(
            `<div class="${styles.popupContent}">
              <span>${capsule.emoji || ""}</span>
              <b>${capsule.title || ""}</b>
              ${capsule.tags && capsule.tags.length > 0
                ? `<div class='${styles.popupTags}'>` +
                  capsule.tags.map(t => `#${typeof t === 'string' ? t : t.name}`).join(' ') +
                  '</div>'
                : ''}
            </div>`
          )
        )
        .addTo(map);
    });

    return () => map.remove();
  }, [capsules, loading]);

  return (
    <div className={styles.page}>
      <h2 className={styles.title}>🌍 Public Capsule Map</h2>
      <div className={styles.mapContainer}>
        {loading ? (
          <div className={styles.loading}>Loading map...</div>
        ) : (
          <div ref={mapRef} className={styles.mapDiv}></div>
        )}
      </div>
    </div>
  );
};

export default MapPage; 