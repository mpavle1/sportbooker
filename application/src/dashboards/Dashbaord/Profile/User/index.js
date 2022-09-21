import React, { Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Chip, Button } from "@material-ui/core";
import styled from "styled-components";

import { updateUser } from "../../../../redux/actions/users";

const User = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const [isEditActive, setIsEditActive] = useState(false);
  const [name, setName] = useState(user.name);
  const [lastName, setLastName] = useState(user.lastName);
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);

  const updateProfile = () => {
    dispatch(updateUser({
      ...user,
      name,
      lastName,
      phoneNumber
    }));
  };

  const isComplete = user.name && user.lastName && user.phoneNumber;

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
          <StyledInfoFiledName>Last Name</StyledInfoFiledName>
          <input
            type="text"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
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
          <StyledInfoFiledName>Last Name</StyledInfoFiledName>
          <div>{lastName}</div>
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
      </Fragment>
    );
  };

  return (
    <div style={{ paddingBottom: "30px" }}>
      <h1>Profile</h1>
      {!isComplete && (
        <Chip
          color="secondary"
          label="You havent finished you profile yet. Please fill in the missing information if you want to be able to book tickets."
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

export default User;

const StyledInfoFieldContainer = styled.div`
  margin: 10px 0;
`;

const StyledInfoFiledName = styled.div`
  font-size: 18px;
  font-weight: bold;
`;
