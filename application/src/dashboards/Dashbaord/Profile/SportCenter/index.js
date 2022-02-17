import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  Chip,
  FormControlLabel,
  Checkbox,
  FormGroup,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@material-ui/core";
import styled from "styled-components";

import Stadium from "./components/Stadium";

import { getAllSports } from "../../../../redux/actions/sports";
import { getAllLocations } from "../../../../redux/actions/locations";
import { updateSportCenterProfile } from "../../../../redux/actions/auth";

import { isSportCenterComplete } from "../../../../utils/validators/sportCenter";

const SportCenter = ({
  auth,
  sports,
  locations,
  getAllSports,
  getAllLocations,
  updateSportCenterProfile,
}) => {
  useEffect(() => {
    getAllSports();
    getAllLocations();
  }, []);

  const { user, sportCenter } = auth;

  const isComplete = isSportCenterComplete(sportCenter);
  const [isEditActive, setIsEditActive] = useState(false);

  const [name, setName] = useState(user.name);
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
  const [location, setLocation] = useState(sportCenter.location);
  const [checkedSports, setCheckedSports] = useState(sportCenter.sports);
  const [stadium, setStadium] = useState(
    sportCenter?.stadium || {
      // skloniti ovo ili kada sredis i drugi sport centar
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
    }
  );

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
      active: row || column,
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
        location,
        capacity: calculateCapacity(),
        sports: checkedSports,
      },
    });
  };

  const handleCheckboxChange = (inputSport) => {
    let newArray = [...checkedSports, inputSport];
    if (checkedSports.includes(inputSport)) {
      newArray = newArray.filter((sport) => sport !== inputSport);
    }
    setCheckedSports(newArray);
  };

  const getEditMode = () => {
    return (
      <Fragment>
        <StyledInfoFieldContainer>
          <StyledInfoFiledName>Name</StyledInfoFiledName>
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </StyledInfoFieldContainer>
        <StyledInfoFieldContainer>
          <StyledInfoFiledName>Email</StyledInfoFiledName>
          <div>{user.email}</div>
        </StyledInfoFieldContainer>
        <StyledInfoFieldContainer>
          <StyledInfoFiledName>Phone Number</StyledInfoFiledName>
          <input
            type="text"
            value={phoneNumber}
            onChange={(event) => setPhoneNumber(event.target.value)}
          />
        </StyledInfoFieldContainer>
        <StyledInfoFieldContainer>
          <StyledInfoFiledName>Location</StyledInfoFiledName>
          <select
            value={location}
            onChange={(event) => setLocation(event.target.value)}
          >
            <option value="">Please select a location</option>
            {locations.map((location) => (
              <option value={location.name} key={location.name}>
                {location.name}
              </option>
            ))}
          </select>
        </StyledInfoFieldContainer>
        <StyledInfoFieldContainer>
          <StyledInfoFiledName>Capacity</StyledInfoFiledName>
          <div>{calculateCapacity()}</div>
        </StyledInfoFieldContainer>
        <StyledInfoFieldContainer>
          <Stadium isViewModeActive stadium={stadium} onChangeStadium={handleChangeStadium} />
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
                      checked={checkedSports.includes(sport.name)}
                      onChange={(event) =>
                        handleCheckboxChange(event.target.name)
                      }
                      name={sport.name}
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
          <StyledInfoFiledName>Name</StyledInfoFiledName>
          <div>{name}</div>
        </StyledInfoFieldContainer>
        <StyledInfoFieldContainer>
          <StyledInfoFiledName>Email</StyledInfoFiledName>
          <div>{user.email}</div>
        </StyledInfoFieldContainer>
        <StyledInfoFieldContainer>
          <StyledInfoFiledName>Phone Number</StyledInfoFiledName>
          <div>
            {phoneNumber || "Your phone number is missing, please add it."}
          </div>
        </StyledInfoFieldContainer>
        <StyledInfoFieldContainer>
          <StyledInfoFiledName>Location</StyledInfoFiledName>
          <div>{location || "Your location is missing, please add it."}</div>
        </StyledInfoFieldContainer>
        <StyledInfoFieldContainer>
          <StyledInfoFiledName>Capacity</StyledInfoFiledName>
          <div>
            {calculateCapacity() || "Your capacity is missing, please add it."}
          </div>
        </StyledInfoFieldContainer>
        <StyledInfoFieldContainer>
          <StyledInfoFiledName>Sports</StyledInfoFiledName>
          {checkedSports.length > 0 ? (
            <ul>
              {checkedSports.map((sport) => (
                <li key={`${sport}-checked`}>{sport}</li>
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
    <Fragment>
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
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  locations: state.locations,
  sports: state.sports,
});

export default connect(mapStateToProps, {
  getAllLocations,
  getAllSports,
  updateSportCenterProfile,
})(SportCenter);

const StyledInfoFieldContainer = styled.div`
  margin: 10px 0;
`;

const StyledInfoFiledName = styled.div`
  font-size: 18px;
  font-weight: bold;
`;
