import React, { memo } from "react";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";

const Map = ({ zoom, center, onClick, children, styles }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
  });

  // const center = useMemo(() => ({ lat: 44.8125, lng: 20.4612 }), []);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <GoogleMap
      zoom={zoom}
      center={center}
      mapContainerStyle={styles}
      onClick={onClick}
    >
      {children}
    </GoogleMap>
  );
};

export default memo(Map);
