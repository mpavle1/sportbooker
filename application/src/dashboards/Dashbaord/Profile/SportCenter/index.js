import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Chip, FormControlLabel, Checkbox, FormGroup, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import styled from 'styled-components';

import { getAllSports } from "../../../../redux/actions/sports";
import { getAllLocations } from "../../../../redux/actions/locations";
import { updateSportCenterProfile } from "../../../../redux/actions/authActions";

import { isSportCenterComplete } from '../../../../utils/validators/sportCenter';

const SportCenter = ({ auth, sports, locations, getAllSports, getAllLocations, updateSportCenterProfile }) => {
    useEffect(() => {
        getAllSports();
        getAllLocations();
    }, []);

    const { user, sportCenter } = auth;

    const isComplete = isSportCenterComplete(sportCenter);
    const [isEditActive, setIsEditActive] = useState(false);

    const [name, setName] = useState(user.name);
    const [phoneNumber, setPhoneNumber] = useState(sportCenter.phoneNumber);
    const [location, setLocation] = useState(sportCenter.location);
    const [capacity, setCapacity] = useState(sportCenter.capacity);
    const [checkedSports, setCheckedSports] = useState(sportCenter.sports);

    const updateProfile = () => {
        updateSportCenterProfile({
            user: {
                ...user,
                phoneNumber
            },
            sportCenter: {
                ...sportCenter,
                location,
                capacity,
                sports: checkedSports
            }
        })
    };

    const handleCheckboxChange = (inputSport) => {
        let newArray = [...checkedSports, inputSport];
        if (checkedSports.includes(inputSport)) {
            newArray = newArray.filter(sport => sport !== inputSport);
        }
        setCheckedSports(newArray);
    };

    const getEditMode = () => {
        return (
            <Fragment>
                <StyledInfoFieldContainer>
                    <StyledInfoFiledName>Name</StyledInfoFiledName>
                    <input type="text" value={name} onChange={(event) => setName(event.target.value)} />
                </StyledInfoFieldContainer>
                <StyledInfoFieldContainer>
                    <StyledInfoFiledName>Email</StyledInfoFiledName>
                    <div>{user.email}</div>
                </StyledInfoFieldContainer>
                <StyledInfoFieldContainer>
                    <StyledInfoFiledName>Phone Number</StyledInfoFiledName>
                    <input type="text" value={phoneNumber} onChange={(event) => setPhoneNumber(event.target.value)} />
                </StyledInfoFieldContainer>
                <StyledInfoFieldContainer>
                    <StyledInfoFiledName>Location</StyledInfoFiledName>
                    <select value={location} onChange={(event) => setLocation(event.target.value)}>
                        <option value="">Please select a location</option>
                        {locations.map((location) => <option value={location.name} key={location.name}>{location.name}</option>)}
                    </select>
                </StyledInfoFieldContainer>
                <StyledInfoFieldContainer>
                    <StyledInfoFiledName>Capacity</StyledInfoFiledName>
                    <input type="number" value={capacity} onChange={(event) => setCapacity(event.target.value)} placeholder="Your capacity is missing, please add it." />
                </StyledInfoFieldContainer>
                <StyledInfoFieldContainer>
                    <StyledInfoFiledName>Sports</StyledInfoFiledName>
                    {
                        <FormGroup>
                            {
                                sports.map((sport) => <FormControlLabel
                                    key={sport.name}
                                    control={
                                        <Checkbox checked={checkedSports.includes(sport.name)}
                                            onChange={(event) => handleCheckboxChange(event.target.name)}
                                            name={sport.name}
                                        />
                                    }
                                    label={sport.name}
                                />)
                            }
                        </FormGroup>
                    }
                </StyledInfoFieldContainer>
            </Fragment>
        );
    }

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
                    <div>{phoneNumber || 'Your phone number is missing, please add it.'}</div>
                </StyledInfoFieldContainer>
                <StyledInfoFieldContainer>
                    <StyledInfoFiledName>Location</StyledInfoFiledName>
                    <div>{location || 'Your location is missing, please add it.'}</div>
                </StyledInfoFieldContainer>
                <StyledInfoFieldContainer>
                    <StyledInfoFiledName>Capacity</StyledInfoFiledName>
                    <div>{capacity || 'Your capacity is missing, please add it.'}</div>
                </StyledInfoFieldContainer>
                <StyledInfoFieldContainer>
                    <StyledInfoFiledName>Sports</StyledInfoFiledName>
                    {
                        checkedSports.length > 0
                            ? (
                                <ul>
                                    {checkedSports.map((sport) => <li key={`${sport}-checked`}>{sport}</li>)}
                                </ul>
                            )
                            : 'Sports that are available for viewing in you center are missing, please add them.'
                    }
                </StyledInfoFieldContainer>
            </Fragment>
        );
    }

    return (
        <Fragment>
            {!isComplete && <Chip color="secondary" label="You havent finished you profile yet. Please fill in the missing information if you want to be able to create events." />}
            {isEditActive ? getEditMode() : getViewMode()}
            {isEditActive ? (
                <button type="button" onClick={() => {
                    setIsEditActive(false);
                    updateProfile();
                }}
                >
                    Save
                </button>
            ) : (
                <button type="button" onClick={() => setIsEditActive(true)}>Edit</button>
            )}

        </Fragment>
    );
}

const mapStateToProps = state => ({
    auth: state.auth,
    locations: state.locations,
    sports: state.sports
});

export default connect(
    mapStateToProps,
    {
        getAllLocations,
        getAllSports,
        updateSportCenterProfile
    }
)(SportCenter);

const StyledInfoFieldContainer = styled.div`
    margin: 10px 0;
`;

const StyledInfoFiledName = styled.div`
    font-size: 18px;
    font-weight: bold;
`;
