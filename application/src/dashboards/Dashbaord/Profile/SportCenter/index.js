import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  FormControlLabel,
  Checkbox,
  FormGroup,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@material-ui/core";
import styled from "styled-components";
import Alert from "@mui/material/Alert";

import Stadium from "../../../../components/Stadium";
import MyMap from "./MyMap";

import { fetchSports } from "../../../../redux/features/sports";
import { getAllLocations } from "../../../../redux/actions/locations";
import { updateSportCenterProfile } from "../../../../redux/actions/auth";
import { updateProfilePhoto } from "../../../../redux/actions/auth";

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
  getAllLocations,
  updateSportCenterProfile,
  updateProfilePhoto,
  fetchSports
}) => {
  const [isEditActive, setIsEditActive] = useState(false);
  const [name, setName] = useState(user.name);
  const [profilePhotoUrl, setProfilePhotoUrl] = useState(null);
  const [coordinates, setCoordinates] = useState(sportCenter.coordinates);
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
  const [locationId, setLocationId] = useState(sportCenter.locationId || null);
  const [checkedSportIds, setCheckedSportIds] = useState(
    sportCenter.sportIds || []
  );
  const [stadium, setStadium] = useState(
    sportCenter?.stadium || DEFAULT_STADIUM
  );

  useEffect(() => {
    fetchSports();
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
        coordinates,
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
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div
          style={{ display: "flex", flexDirection: "column", width: "600px" }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <div
              style={{
                width: "50%",
                display: "flex",
                flexDirection: "column",
                gap: "15px",
              }}
            >
              <div style={{ height: "56px" }}>
                <StyledInfoFiledName>Email</StyledInfoFiledName>
                <div>{user.email}</div>
              </div>
              <TextField
                fullWidth
                label="Name"
                variant="outlined"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>
            <div
              style={{
                width: "50%",
                display: "flex",
                flexDirection: "column",
                gap: "15px",
              }}
            >
              <TextField
                fullWidth
                label="Phone Number"
                variant="outlined"
                type="number"
                value={phoneNumber}
                onChange={(event) => setPhoneNumber(event.target.value)}
              />
              <FormControl variant="outlined" fullWidth>
                <InputLabel id="demo-simple-select-label">Location</InputLabel>
                <Select
                  label="Location"
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
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
              </FormControl>
            </div>
          </div>
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
          <StyledInfoFiledName
            style={{
              width: "100%",
            }}
          >
            Profile photo
          </StyledInfoFiledName>
          <StyledProfilePhoto
            alt="profile photo"
            src={
              profilePhotoUrl ||
              sportCenter.profilePhoto ||
              "/public/placeholder.png"
            }
            height={300}
            width={500}
          />
          <div>
            <Button component="label">
              Upload Profile Image
              <input
                type="file"
                hidden
                onInput={(event) => {
                  setProfilePhotoUrl(
                    URL.createObjectURL(event.target.files[0])
                  );
                  updateProfilePhoto(
                    sportCenter._id,
                    event.target.files[0]
                  ).then(() => {
                    setProfilePhotoUrl(null);
                  });
                }}
                accept="image/jpeg, image/jpg, image/png"
                multiple={false}
              />
            </Button>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <div>
              <MyMap
                coordinates={coordinates}
                changeCoordinates={setCoordinates}
                location={locations?.find(
                  (loc) => loc._id === sportCenter.locatinId
                )}
              />
            </div>
          </div>
          <StyledInfoFieldContainer>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <StyledInfoFiledName>Stadium design</StyledInfoFiledName>
              <Stadium
                isViewModeActive={false}
                stadium={stadium}
                onChangeStadium={handleChangeStadium}
              />
            </div>
          </StyledInfoFieldContainer>
        </div>
      </div>
    );
  };

  const getViewMode = () => {
    return (
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div
          style={{ display: "flex", flexDirection: "column", width: "600px" }}
        >
          <div
            style={{
              display: "flex",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                width: "50%",

                gap: "15px",
              }}
            >
              <div
                style={{
                  height: "56px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <StyledInfoFiledName>Email</StyledInfoFiledName>
                <div>{user.email}</div>
              </div>
              <div
                style={{
                  height: "56px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <StyledInfoFiledName>Name</StyledInfoFiledName>
                <div>{name}</div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                width: "50%",
                gap: "15px",
              }}
            >
              <div
                style={{
                  height: "56px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <StyledInfoFiledName>Phone Number</StyledInfoFiledName>
                <div>
                  {phoneNumber ||
                    "Your phone number is missing, please add it."}
                </div>
              </div>
              <div
                style={{
                  height: "56px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <StyledInfoFiledName>Location</StyledInfoFiledName>
                <div>
                  {locations.find((location) => location._id === locationId)
                    ?.name || "Your location is missing, please add it."}
                </div>
              </div>
            </div>
          </div>
          <div>
            <StyledInfoFiledName>Sports</StyledInfoFiledName>
            {checkedSportIds.length > 0 ? (
              <ul>
                {checkedSportIds.map((sportId) => (
                  <li key={sportId}>
                    {sports.find((sport) => sport._id === sportId)?.name}
                  </li>
                ))}
              </ul>
            ) : (
              "Sports that are available for viewing in you center are missing, please add them."
            )}
          </div>
          <div
            style={{
              display: "inline-block",
              margin: "20px 0",
            }}
          >
            <StyledInfoFiledName>Profile photo</StyledInfoFiledName>
            <StyledProfilePhoto
              alt="profile photo"
              src={
                profilePhotoUrl ||
                sportCenter.profilePhoto ||
                "/public/placeholder.png"
              }
              height={300}
              width={500}
            />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div>
            <MyMap
              coordinates={coordinates}
              changeCoordinates={() => {}}
              location={locations?.find(
                (loc) => loc._id === sportCenter.locatinId
              )}
            />
          </div>
          <StyledInfoFieldContainer>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <StyledInfoFiledName>
                {`Current capacity: ${calculateCapacity()}` ||
                  "Your capacity is missing, please seats."}
              </StyledInfoFiledName>
              <Stadium isViewModeActive stadium={stadium} />
            </div>
          </StyledInfoFieldContainer>
        </div>
      </div>
    );
  };

  return (
    <div style={{ paddingBottom: "30px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        {isEditActive ? (
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setIsEditActive(false);
              updateProfile();
            }}
          >
            Save Changes
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={() => setIsEditActive(true)}
          >
            Edit Profile
          </Button>
        )}
        {!isComplete && (
          <Alert severity="error">
            You havent finished you profile yet. Please fill in the missing
            information if you want to be able to create events.
          </Alert>
        )}
      </div>
      {isEditActive ? getEditMode() : getViewMode()}
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
  fetchSports,
  getAllLocations,
  updateSportCenterProfile,
  updateProfilePhoto,
})(SportCenter);

const StyledInfoFieldContainer = styled.div`
  margin: 20px 0;
  display: inline-block;
`;

const StyledInfoFiledName = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

const StyledProfilePhoto = styled.img`
  border: 1px solid #777;
  border-radius: 5px;
`;
