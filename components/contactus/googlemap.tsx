"use client"
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api"

const containerStyle = {
  width: "100%",
  height: "100%",
}

// Default center for the map (e.g., Vercel HQ)
const defaultCenter = {
  lat: 37.7749, // San Francisco latitude
  lng: -122.4194, // San Francisco longitude
}

interface GoogleMapComponentProps {
  center?: { lat: number; lng: number }
  zoom?: number
}

export default function GoogleMapComponent({ center = defaultCenter, zoom = 10 }: GoogleMapComponentProps) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "YOUR_GOOGLE_MAPS_API_KEY", // Replace with your actual API key
    libraries: ["places"], // Optional: Add libraries if needed, e.g., "places"
  })

  if (loadError) return <div>Error loading maps</div>
  if (!isLoaded) return <div>Loading Maps...</div>

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={zoom}
      options={{
        disableDefaultUI: true, // Disable default UI controls for a minimalistic look
        zoomControl: true,
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
      }}
    >
      {/* You can add a marker for your office location */}
      <MarkerF position={center} />
    </GoogleMap>
  )
}
