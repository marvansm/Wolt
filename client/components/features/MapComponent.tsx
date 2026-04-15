'use client';

import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect } from 'react';

function ChangeView({ center, zoom }: { center: [number, number], zoom: number }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
}

function MapEvents({ onPositionChange }: { onPositionChange?: (coords: [number, number]) => void }) {
  const map = useMap();
  useEffect(() => {
    if (!onPositionChange) return;
    map.on('click', (e) => {
      onPositionChange([e.latlng.lat, e.latlng.lng]);
    });
    return () => {
      map.off('click');
    };
  }, [map, onPositionChange]);
  return null;
}


import { useTheme } from '@/context/ThemeContext';

interface MapComponentProps {
  center?: [number, number];
  zoom?: number;
  courierProgress?: number;
  restaurantCoords?: [number, number];
  destinationCoords?: [number, number];
  restaurantImage?: string;
  onPositionChange?: (coords: [number, number]) => void;
  interactive?: boolean;
}

const createRestaurantIcon = (imageUrl: string) => L.divIcon({
  html: `<div style="
    width: 44px; 
    height: 44px; 
    background-color: white; 
    border-radius: 50%; 
    border: 3px solid #009de0;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    overflow: hidden;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  "><img src="${imageUrl}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.onerror=null;this.src='/logo.png'" /></div>`,
  className: '',
  iconSize: [44, 44],
  iconAnchor: [22, 22],
});

const courierIcon = L.divIcon({
  html: `<div style="
    width: 36px; 
    height: 36px; 
    background-color: #009de0; 
    border-radius: 50%; 
    border: 3px solid white;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    display: flex;
    align-items: center;
    justify-content: center;
  "><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5.5 17.5L2 14l3.5-3.5M22 17.5L18.5 14l3.5-3.5M2 14h20"></path><circle cx="12" cy="7" r="3"></circle></svg></div>`,
  className: '',
  iconSize: [36, 36],
  iconAnchor: [18, 18],
});

const destinationIcon = L.divIcon({
  html: `<div style="
    width: 28px; 
    height: 28px; 
    background-color: #ff9800; 
    border-radius: 50%; 
    border: 3px solid white;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    display: flex;
    align-items: center;
    justify-content: center;
  "><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg></div>`,
  className: '',
  iconSize: [28, 28],
  iconAnchor: [14, 14],
});

export default function MapComponent({ 
  center = [40.4093, 49.8671], 
  zoom = 13,
  courierProgress = 0,
  restaurantCoords = [40.4093, 49.8671],
  destinationCoords = [40.4200, 49.8800],
  restaurantImage = '/logo.png',
  onPositionChange,
  interactive = false
}: MapComponentProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  
  const courierLat = restaurantCoords[0] + (destinationCoords[0] - restaurantCoords[0]) * courierProgress;
  const courierLng = restaurantCoords[1] + (destinationCoords[1] - restaurantCoords[1]) * courierProgress;
  const courierPos: [number, number] = [courierLat, courierLng];

  return (
    <div className="w-full h-full relative z-0">
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={false}
        className="w-full h-full"
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url={isDark 
            ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            : "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          }
        />
        <ChangeView center={center} zoom={zoom} />
        {onPositionChange && <MapEvents onPositionChange={onPositionChange} />}
        
        {!interactive && (
          <>
            <Marker position={restaurantCoords} icon={createRestaurantIcon(restaurantImage)} />
            <Marker position={courierPos} icon={courierIcon} />
          </>
        )}
        
        <Marker 
          position={destinationCoords || center} 
          icon={destinationIcon}
          draggable={interactive}
          eventHandlers={{
            dragend: (e) => {
              const marker = e.target;
              const position = marker.getLatLng();
              if (onPositionChange) onPositionChange([position.lat, position.lng]);
            },
          }}
        />
      </MapContainer>

      <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-b from-black/30 via-transparent to-black/40' : 'bg-gradient-to-b from-white/30 via-transparent to-white/40'} pointer-events-none z-[1000]`} />
    </div>
  );
}
