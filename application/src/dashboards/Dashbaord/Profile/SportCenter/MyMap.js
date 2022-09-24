import React, { useMemo, memo } from "react";
import { Marker } from "@react-google-maps/api";

import Map from "../../../../components/Map";

const MyMap = ({ coordinates, changeCoordinates, location }) => {
  const center = useMemo(() => {
    if (coordinates?.lat && coordinates?.lng) {
      return coordinates;
    }
    if (location?.coordinates?.lat && location?.coordinates?.lng) {
      return location.coordinates;
    }

    return { lat: 44.8125, lng: 20.4612 };
  }, [coordinates]);

  const renderMarker = () => {
    if (coordinates?.lat && coordinates?.lng) {
      return <Marker position={coordinates} />;
    }
    return null;
  };

  return (
    <div>
      <div
        style={{
          margin: "10px 0",
          fontSize: "18px",
        }}
      >
        <b>Directions:</b>
      </div>
      <Map
        onClick={(ev) => {
          changeCoordinates({
            lat: ev.latLng.lat(),
            lng: ev.latLng.lng(),
          });
        }}
        center={center}
        zoom={15}
        styles={{ width: "500px", height: "500px", borderRadius: "5px" }}
      >
        {renderMarker()}
      </Map>
    </div>
  );
};

export default memo(MyMap);
