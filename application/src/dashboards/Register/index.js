import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { Link, withRouter, useHistory } from 'react-router-dom';
import { Button, InputLabel, Select, TextField, MenuItem, FormControl } from '@material-ui/core';
import styled from "styled-components";

import { registerUser } from "../../redux/actions/authActions";

const Register = ({ registerUser, auth, errors }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('1991-01-01');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [type, setType] = useState('user');

    const history = useHistory();

    useEffect(() => {
        if (auth.isAuthenticated) {
            history.push("/")
        }
    });

    useEffect(() => {
        console.log(errors)
    }, [errors]);

    const handleSubmit = (event) => {
        event.preventDefault();
        registerUser({
            email,
            password,
            password2: confirmPassword,
            name: type !== 'admin' ? name : '',
            lastName: type === 'user' ? lastName : '',
            dateOfBirth: type === 'user' ? dateOfBirth : '',
            phoneNumber: type !== 'admin' ? dateOfBirth : '',
            type
        }, history);
    }

    return (
        <StyledLogin>
            <form onSubmit={handleSubmit}>
                <StyledContainer>
                    <FormControl variant="outlined" fullWidth>
                        <InputLabel id="demo-simple-select-label">Type</InputLabel>
                        <Select
                            label="Type"
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                        >
                            <MenuItem value="user">User</MenuItem>
                            <MenuItem value="sportCenter">Sport center</MenuItem>
                            <MenuItem value="admin">Admin</MenuItem>
                        </Select>
                    </FormControl>
                </StyledContainer>
                <StyledContainer>
                    <TextField
                        fullWidth
                        label="Email"
                        variant="outlined"
                        autoFocus
                        type="email"
                        value={email}
                        error={errors.email !== undefined}
                        helperText={errors.email !== undefined ? errors.email : ''}
                        onChange={(e) => {
                            delete errors['email'];
                            setEmail(e.target.value);
                        }}
                    />
                </StyledContainer>
                <StyledContainer>
                    <TextField
                        fullWidth
                        label="Password"
                        variant="outlined"
                        type="password"
                        value={password}
                        error={errors.password !== undefined}
                        helperText={errors.password !== undefined ? errors.password : ''}
                        onChange={(e) => {
                            delete errors['password'];
                            setPassword(e.target.value);
                        }}
                    />
                </StyledContainer>
                <StyledContainer>
                    <TextField
                        fullWidth
                        label="Confirm Passowrd"
                        variant="outlined"
                        type="password"
                        value={confirmPassword}
                        error={errors.password2 !== undefined}
                        helperText={errors.password2 !== undefined ? errors.password2 : ''}
                        onChange={(e) => {
                            delete errors['password2'];
                            setConfirmPassword(e.target.value);
                        }}
                    />
                </StyledContainer>
                <StyledContainer>
                    <TextField
                        fullWidth
                        label="Name"
                        variant="outlined"
                        type="text"
                        value={name}
                        error={errors.name !== undefined}
                        helperText={errors.name !== undefined ? errors.name : ''}
                        onChange={(e) => {
                            delete errors['name'];
                            setName(e.target.value);
                        }}
                    />
                </StyledContainer>
                {type === 'user' && (
                    <Fragment>

                        <StyledContainer>
                            <TextField
                                fullWidth
                                label="Last Name"
                                variant="outlined"
                                type="text"
                                value={lastName}
                                error={errors.lastName !== undefined}
                                helperText={errors.lastName !== undefined ? errors.lastName : ''}
                                onChange={(e) => {
                                    delete errors['lastName'];
                                    setLastName(e.target.value);
                                }}
                            />
                        </StyledContainer>
                        <StyledContainer>
                            <TextField
                                fullWidth
                                label="Date of Birth"
                                type="date"
                                variant="outlined"
                                value={dateOfBirth}
                                error={errors.dateOfBirth !== undefined}
                                helperText={errors.dateOfBirth !== undefined ? errors.dateOfBirth : ''}
                                onChange={(e) => {
                                    delete errors['dateOfBirth'];
                                    setDateOfBirth(e.target.value);
                                }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </StyledContainer>
                    </Fragment>
                )}
                {type !== 'admin' && (
                    <StyledContainer>
                        <TextField
                            fullWidth
                            label="Phone Number"
                            type="phone"
                            variant="outlined"
                            value={phoneNumber}
                            error={errors.phoneNumber !== undefined}
                            helperText={errors.phoneNumber !== undefined ? errors.phoneNumber : ''}
                            onChange={(e) => {
                                delete errors['phoneNumber'];
                                setPhoneNumber(e.target.value);
                            }}
                        />
                    </StyledContainer>
                )}
                <div>
                    <Button variant="contained" color="primary" type="submit">
                        Register
                    </Button>
                    <StyledLink to="/login">
                        Login now!
                    </StyledLink>
                </div>
            </form>
        </StyledLogin>
    );
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { registerUser }
)(withRouter(Register));

const StyledContainer = styled.div`
    margin-bottom: 10px;
`;

const StyledLogin = styled.div`
    width: 250px;
    display: block;
    margin: 100px auto;
    border: 1px solid #777;
    border-radius: 5px;
    padding: 10px;
`;

const StyledLink = styled(Link)`
    float: right;
    line-height: 36px !important;
    color: darkblue;
    text-decoration: none;
`;
