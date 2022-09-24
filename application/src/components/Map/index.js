import React, { memo } from "react";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";

const Map = ({ zoom, center, onClick, children, styles }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyBWZ0KxaKxe3Vz44o9He8SNq4xB_XQBgrc",
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
