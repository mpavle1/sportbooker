import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  Chip,
  FormControlLabel,
  Checkbox,
  FormGroup,
  Button,
  TextField,
  Select,
  MenuItem,
} from "@material-ui/core";
import styled from "styled-components";

import Stadium from "../../../../components/Stadium";

import { getAllSports } from "../../../../redux/actions/sports";
import { getAllLocations } from "../../../../redux/actions/locations";
import { updateSportCenterProfile } from "../../../../redux/actions/auth";

import { isSportCenterComplete } from "../../../../utils/validators/sportCenter";

const DEFAULT_STADIUM = {
  N: {
    active: false,
    sections: {
      A: { active: false, row: 0, column: 0 },
      B: { active: false, row: 0, column: 0 },
      C: { active: false, row: 0, column: 0 },
      D: { active: false, row: 0, column: 0 },
      E: { active: false, row: 0, column: 0 },
      F: { active: false, row: 0, column: 0 },
    },
  },
  E: {
    active: false,
    sections: {
      A: { active: false, row: 0, column: 0 },
      B: { active: false, row: 0, column: 0 },
      C: { active: false, row: 0, column: 0 },
      D: { active: false, row: 0, column: 0 },
      E: { active: false, row: 0, column: 0 },
      F: { active: false, row: 0, column: 0 },
    },
  },
  W: {
    active: false,
    sections: {
      A: { active: false, row: 0, column: 0 },
      B: { active: false, row: 0, column: 0 },
      C: { active: false, row: 0, column: 0 },
      D: { active: false, row: 0, column: 0 },
      E: { active: false, row: 0, column: 0 },
      F: { active: false, row: 0, column: 0 },
    },
  },
  S: {
    active: false,
    sections: {
      A: { active: false, row: 0, column: 0 },
      B: { active: false, row: 0, column: 0 },
      C: { active: false, row: 0, column: 0 },
      D: { active: false, row: 0, column: 0 },
      E: { active: false, row: 0, column: 0 },
      F: { active: false, row: 0, column: 0 },
    },
  },
};

const SportCenter = ({
  user,
  sportCenter,
  sports,
  locations,
  getAllSports,
  getAllLocations,
  updateSportCenterProfile,
}) => {
  const [isEditActive, setIsEditActive] = useState(false);
  const [name, setName] = useState(user.name);
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
  const [locationId, setLocationId] = useState(sportCenter.locationId || null);
  const [checkedSportIds, setCheckedSportIds] = useState(
    sportCenter.sportIds || []
  );
  const [stadium, setStadium] = useState(
    sportCenter?.stadium || DEFAULT_STADIUM
  );

  useEffect(() => {
    getAllSports();
    getAllLocations();
  }, []);

  if (sports.length === 0 && locations.length === 0) {
    return null;
  }

  const isComplete = isSportCenterComplete(sportCenter);

  const calculateCapacity = () => {
    let sum = 0;
    Object.values(stadium).forEach((stand) => {
      let tempSum = 0;

      Object.values(stand.sections).forEach((section) => {
        tempSum += +section.active ? section.row * section.column : 0;
      });

      sum += tempSum;
    });

    return sum;
  };

  const handleChangeStadium = (stand, section, row, column) => {
    const newStadium = JSON.parse(JSON.stringify(stadium));
    newStadium[stand].sections[section] = {
      active: !!(row || column),
      row,
      column,
    };
    setStadium(JSON.parse(JSON.stringify(newStadium)));
  };

  const updateProfile = () => {
    updateSportCenterProfile({
      user: {
        ...user,
        phoneNumber,
        name,
      },
      sportCenter: {
        ...sportCenter,
        locationId,
        capacity: calculateCapacity(),
        sportIds: checkedSportIds,
        stadium,
      },
    });
  };

  const handleCheckboxChange = (inputSportId) => {
    let newArray = [...checkedSportIds, inputSportId];
    if (checkedSportIds.includes(inputSportId)) {
      newArray = newArray.filter((sportId) => sportId !== inputSportId);
    }
    setCheckedSportIds(newArray);
  };

  const getEditMode = () => {
    return (
      <Fragment>
        <StyledInfoFieldContainer>
          <StyledInfoFiledName>Email</StyledInfoFiledName>
          <div>{user.email}</div>
        </StyledInfoFieldContainer>
        <StyledInfoFieldContainer>
          <TextField
            label="Name"
            variant="outlined"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </StyledInfoFieldContainer>
        <StyledInfoFieldContainer>
          <TextField
            label="Phone Number"
            variant="outlined"
            type="number"
            value={phoneNumber}
            onChange={(event) => setPhoneNumber(event.target.value)}
          />
        </StyledInfoFieldContainer>
        <StyledInfoFieldContainer>
          <StyledInfoFiledName>Location</StyledInfoFiledName>
          <Select
            label="Location"
            value={locationId}
            onChange={(event) => setLocationId(event.target.value)}
          >
            <MenuItem value="">Please select a location</MenuItem>
            {locations.map((location) => (
              <MenuItem value={location._id} key={location.name}>
                {location.name}
              </MenuItem>
            ))}
          </Select>
        </StyledInfoFieldContainer>
        <StyledInfoFieldContainer>
          <StyledInfoFiledName>Capacity</StyledInfoFiledName>
          <div>{calculateCapacity()}</div>
        </StyledInfoFieldContainer>
        <StyledInfoFieldContainer>
          <Stadium
            isViewModeActive={false}
            stadium={stadium}
            onChangeStadium={handleChangeStadium}
          />
        </StyledInfoFieldContainer>
        <StyledInfoFieldContainer>
          <StyledInfoFiledName>Sports</StyledInfoFiledName>
          {
            <FormGroup>
              {sports.map((sport) => (
                <FormControlLabel
                  key={sport.name}
                  control={
                    <Checkbox
                      checked={checkedSportIds.includes(sport._id)}
                      onChange={(event) => {
                        handleCheckboxChange(event.target.id);
                      }}
                      name={sport.name}
                      id={sport._id}
                    />
                  }
                  label={sport.name}
                />
              ))}
            </FormGroup>
          }
        </StyledInfoFieldContainer>
      </Fragment>
    );
  };

  const getViewMode = () => {
    return (
      <Fragment>
        <StyledInfoFieldContainer>
          <StyledInfoFiledName>Email</StyledInfoFiledName>
          <div>{user.email}</div>
        </StyledInfoFieldContainer>
        <StyledInfoFieldContainer>
          <StyledInfoFiledName>Name</StyledInfoFiledName>
          <div>{name}</div>
        </StyledInfoFieldContainer>
        <StyledInfoFieldContainer>
          <StyledInfoFiledName>Phone Number</StyledInfoFiledName>
          <div>
            {phoneNumber || "Your phone number is missing, please add it."}
          </div>
        </StyledInfoFieldContainer>
        <StyledInfoFieldContainer>
          <StyledInfoFiledName>Location</StyledInfoFiledName>
          <div>
            {locations.find((location) => location._id === locationId)?.name ||
              "Your location is missing, please add it."}
          </div>
        </StyledInfoFieldContainer>
        <StyledInfoFieldContainer>
          <StyledInfoFiledName>Capacity</StyledInfoFiledName>
          <div>
            {calculateCapacity() || "Your capacity is missing, please add it."}
          </div>
        </StyledInfoFieldContainer>
        <StyledInfoFieldContainer>
          <Stadium isViewModeActive stadium={stadium} />
        </StyledInfoFieldContainer>
        <StyledInfoFieldContainer>
          <StyledInfoFiledName>Sports</StyledInfoFiledName>
          {checkedSportIds.length > 0 ? (
            <ul>
              {checkedSportIds.map((sportId) => (
                <li key={sportId}>
                  {sports.find((sport) => sport._id === sportId).name}
                </li>
              ))}
            </ul>
          ) : (
            "Sports that are available for viewing in you center are missing, please add them."
          )}
        </StyledInfoFieldContainer>
      </Fragment>
    );
  };

  return (
    <div style={{ paddingBottom: "30px" }}>
      <h1>Profile</h1>
      {!isComplete && (
        <Chip
          color="secondary"
          label="You havent finished you profile yet. Please fill in the missing information if you want to be able to create events."
        />
      )}
      {isEditActive ? getEditMode() : getViewMode()}
      {isEditActive ? (
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setIsEditActive(false);
            updateProfile();
          }}
        >
          Save
        </Button>
      ) : (
        <Button
          variant="contained"
          color="primary"
          onClick={() => setIsEditActive(true)}
        >
          Edit
        </Button>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  sportCenter: state.auth.sportCenter,
  locations: state.locations,
  sports: state.sports,
});

export default connect(mapStateToProps, {
  getAllLocations,
  getAllSports,
  updateSportCenterProfile,
})(SportCenter);

const StyledInfoFieldContainer = styled.div`
  margin: 20px 0;
`;

const StyledInfoFiledName = styled.div`
  font-size: 18px;
  font-weight: bold;
`;
