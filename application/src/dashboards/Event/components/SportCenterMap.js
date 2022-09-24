import React, { memo } from "react";
import { Marker } from "@react-google-maps/api";

import Map from "../../../components/Map";

const SportCenterMap = ({ scCoordinates }) => {
  return (
    <Map
      onClick={() => {}}
      center={scCoordinates}
      zoom={15}
      styles={{
        width: "332px",
        height: "300px",
        marginBottom: "20px",
        borderRadius: "5px",
      }}
    >
      <Marker position={scCoordinates} />
    </Map>
  );
};

export default memo(SportCenterMap);
