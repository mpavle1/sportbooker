import React, { useMemo, memo } from "react";
import { Marker } from "@react-google-maps/api";

import Map from "../../../../components/Map";

const MyMap = ({ scPosition, newPostion, onChangePostion }) => {
  const center = useMemo(() => {
    if (scPosition?.lat && scPosition?.lng) {
      return scPosition;
    }
    if (newPostion) {
      return newPostion;
    }

    return { lat: 44.8125, lng: 20.4612 };
  }, [newPostion, scPosition]);

  const renderMarker = () => {
    if (scPosition?.lat && scPosition?.lng) {
      return <Marker position={scPosition} />;
    }
    if (newPostion) {
      return <Marker position={newPostion} />;
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
          onChangePostion({
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
