import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  getAllLocations,
  deleteLocation,
} from "../../../redux/actions/locations";
import { Button, TextField } from "@material-ui/core";
import styled from "styled-components";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import EditLocationModal from "./EditLocationModal";
import AddNewLocationModal from "./AddNewLocation";

import withNavigationContainer from "../withNavigationContainer";

const Locations = ({ getAllLocations, locations, deleteLocation }) => {
  const [locationForEditing, setLocationForEditing] = useState(null);
  const [isAddNewLocationVisible, setIsAddNewLocationVisible] = useState(null);

  useEffect(() => {
    getAllLocations();
  }, []);

  const renderAllLocations = () => {
    return (
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
                    width: "100px"
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
                      deleteLocation(location.name);
                    }
                  }}
                />
              </div>
            </StyledItem>
          );
        })}
      </StyledList>
    );
  };

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

const mapStateToProps = (state) => ({
  locations: state.locations,
});

export default connect(mapStateToProps, {
  getAllLocations,
  deleteLocation,
})(withNavigationContainer(Locations));

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
