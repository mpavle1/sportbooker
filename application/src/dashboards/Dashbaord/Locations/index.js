import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  getAllLocations,
  addLocation,
  deleteLocation,
} from "../../../redux/actions/locations";
import { Button, TextField } from "@material-ui/core";
import styled from "styled-components";
import DeleteIcon from "@mui/icons-material/Delete";

import withNavigationContainer from "../withNavigationContainer";

const Locations = ({
  getAllLocations,
  addLocation,
  locations,
  deleteLocation,
}) => {
  const [newLocation, setNewLocation] = useState("");

  useEffect(() => {
    getAllLocations();
  }, []);

  const renderAllLocations = () => {
    return (
      <StyledList>
        {locations.map((location) => (
          <StyledItem key={location.name}>
            {location.name}
            <StyledIcon onClick={() => deleteLocation(location.name)} />
          </StyledItem>
        ))}
      </StyledList>
    );
  };

  return (
    <div>
      <h2>Locations</h2>
      <div>{renderAllLocations()}</div>
      <div>
        <StyledInput
          type="text"
          placeholder="Enter new location name"
          value={newLocation}
          onChange={(event) => setNewLocation(event.target.value)}
        />
        <Button
          type="button"
          onClick={() => {
            if (newLocation !== "") {
              addLocation(newLocation);
              setNewLocation("");
            }
          }}
          disabled={
            locations.find((location) => location.name === newLocation) !==
            undefined
          }
        >
          Add Location
        </Button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  locations: state.locations,
});

export default connect(mapStateToProps, {
  getAllLocations,
  addLocation,
  deleteLocation,
})(withNavigationContainer(Locations));

const StyledInput = styled(TextField)`
  width: 300px;
`;

const StyledList = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledItem = styled.div`
  display: flex;
  justify-content: space-between;
  width: 250px;
  margin: 0 0 10px;
`;

const StyledIcon = styled(DeleteIcon)`
  color: darkred;
`;
