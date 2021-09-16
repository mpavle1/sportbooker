import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Chip, FormControlLabel, Checkbox, FormGroup } from '@material-ui/core';
import styled from 'styled-components';

import { isSportCenterComplete } from '../../../../utils/validators/sportCenter';

const SportCenter = ({ auth }) => {
    const { user, sportCenter } = auth;

    const isComplete = isSportCenterComplete(sportCenter);
    const [isEditActive, setIsEditActive] = useState(false);

    const sports = ['qwe', 'eqweq', 'eqweqweqwe'];

    const [name, setName] = useState(user.name);
    const [phoneNumber, setPhoneNumber] = useState(sportCenter.phoneNumber);
    const [location, setLocation] = useState(sportCenter.location);
    const [capacity, setCapacity] = useState(sportCenter.capacity);
    const [checkedSports, setCheckedSports] = useState(sports);


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
                    <input type="text" value={location} onChange={(event) => setLocation(event.target.value)} placeholder="Your location is missing, please add it." />
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
                                checkedSports.map((sport) => <FormControlLabel
                                    key={sport}
                                    control={
                                        <Checkbox checked={sports.includes(sport)}
                                            onChange={(event) => setCheckedSports(event.target.value)}
                                            name={sport}
                                        />
                                    }
                                    label={sport}
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
                    <div>{user.phoneNumber}</div>
                </StyledInfoFieldContainer>
                <StyledInfoFieldContainer>
                    <StyledInfoFiledName>Location</StyledInfoFiledName>
                    <div>{sportCenter.location || 'Your location is missing, please add it.'}</div>
                </StyledInfoFieldContainer>
                <StyledInfoFieldContainer>
                    <StyledInfoFiledName>Capacity</StyledInfoFiledName>
                    <div>{sportCenter.capacity || 'Your capacity is missing, please add it.'}</div>
                </StyledInfoFieldContainer>
                <StyledInfoFieldContainer>
                    <StyledInfoFiledName>Sports</StyledInfoFiledName>
                    {
                        checkedSports.length > 0
                            ? (
                                <ul>
                                    {checkedSports.map((sport) => <li key={sport}>{sport}</li>)}
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
                <button type="button" onClick={() => setIsEditActive(false)}>Save</button>
            ) : (
                <button type="button" onClick={() => setIsEditActive(true)}>Edit</button>
            )}

        </Fragment>
    );
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps
)(SportCenter);

const StyledInfoFieldContainer = styled.div`
    margin: 10px 0;
`;

const StyledInfoFiledName = styled.div`
    font-size: 18px;
    font-weight: bold;
`;
