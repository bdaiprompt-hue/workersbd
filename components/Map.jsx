// components/Map.jsx - Simple map component for district job locations
import { useEffect, useRef } from 'react';

/**
 * Map component - Shows job locations on a district map
 * Uses a simple embedded map approach (no external map library required)
 * For production, replace with Leaflet.js or Google Maps
 */
export default function Map({ district, jobs = [] }) {
  const mapRef = useRef(null);

  // Simple placeholder map using a static iframe embed
  // In production, integrate Leaflet.js or OpenStreetMap
  const districtName = district?.name || 'Bangladesh';
  const mapsQuery = encodeURIComponent(`${districtName}, Bangladesh`);

  return (
    <div
      ref={mapRef}
      style={{
        width: '100%',
        height: '300px',
        borderRadius: '12px',
        overflow: 'hidden',
        background: '#e8f0fe',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '1rem',
        border: '2px solid #0066cc',
      }}
      aria-label={`Map showing job locations in ${districtName}`}
    >
      {/* Job count pins */}
      <div style={{ fontSize: '3rem' }}>📍</div>
      <div style={{ textAlign: 'center', padding: '0 1rem' }}>
        <p style={{ fontWeight: '600', color: '#0066cc', fontSize: '1.1rem', margin: 0 }}>
          {jobs.length}+ Jobs in {districtName}
        </p>
        <p style={{ color: '#555', fontSize: '0.875rem', marginTop: '0.25rem' }}>
          Interactive map coming soon
        </p>
      </div>
      <a
        href={`https://www.google.com/maps/search/?api=1&query=${mapsQuery}`}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          padding: '0.5rem 1.25rem',
          background: '#0066cc',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '6px',
          fontSize: '0.875rem',
          fontWeight: '600',
        }}
      >
        View on Google Maps
      </a>
    </div>
  );
}
