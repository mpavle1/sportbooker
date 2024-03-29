import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchLocations,
  deleteLocation,
  locationsSelectors
} from "../../../redux/features/locations";
import { Button } from "@material-ui/core";
import styled from "styled-components";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import EditLocationModal from "./EditLocationModal";
import AddNewLocationModal from "./AddNewLocation";

import withNavigationContainer from "../withNavigationContainer";

const Locations = () => {
  const dispatch = useDispatch();

  const locations = useSelector(locationsSelectors.selectAll);
  const isLocationsInitialized = useSelector(locationsSelectors.selectIsInitialized);

  const [locationForEditing, setLocationForEditing] = useState(null);
  const [isAddNewLocationVisible, setIsAddNewLocationVisible] = useState(null);

  useEffect(() => {
    if(!isLocationsInitialized) {
      dispatch(fetchLocations());
    }
  }, [isLocationsInitialized]);

  const renderAllLocations = () => (
    <StyledList>
      {locations.map((location) => {
        const coordinates = location.coordinates ? (
          <StyledLatLng>
            <div>lat: {location.coordinates.lat}</div>
            <div>lng: {location.coordinates.lng}</div>
          </StyledLatLng>
        ) : (
          ""
        );

        return (
          <StyledItem key={location.name}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "40px",
              }}
            >
              <div
                style={{
                  display: "inline-block",
                  width: "100px",
                }}
              >
                {location.name}
              </div>{" "}
              {coordinates}
            </div>
            <div>
              <EditIcon
                onClick={() => {
                  setLocationForEditing(location);
                }}
              />
              <StyledIcon
                onClick={() => {
                  if (
                    confirm("Are you sure you want to delete this location?")
                  ) {
                    dispatch(deleteLocation(location));
                  }
                }}
              />
            </div>
          </StyledItem>
        );
      })}
    </StyledList>
  );

  if (!isLocationsInitialized) {
    return null;
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid #777",
          marginBottom: "20px",
        }}
      >
        <h2>Locations</h2>
        <Button
          type="button"
          variant="contained"
          color="primary"
          onClick={() => {
            setIsAddNewLocationVisible(true);
          }}
        >
          Add a new Location
        </Button>
      </div>
      <br />
      <div>{renderAllLocations()}</div>
      <br />
      {locationForEditing && (
        <EditLocationModal
          location={locationForEditing}
          onClose={() => {
            setLocationForEditing(null);
          }}
        />
      )}
      {isAddNewLocationVisible && (
        <AddNewLocationModal
          onClose={() => {
            setIsAddNewLocationVisible(false);
          }}
        />
      )}
    </div>
  );
};

export default withNavigationContainer(Locations);

const StyledList = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledItem = styled.div`
  display: flex;
  justify-content: space-between;
  width: 350px;
  margin: 0 0 20px;
  border-bottom: 1px solid #777;
  padding-bottom: 10px;
`;

const StyledIcon = styled(DeleteIcon)`
  color: darkred;
`;

const StyledLatLng = styled.div`
  display: flex;
  flex-direction: column;
`;
