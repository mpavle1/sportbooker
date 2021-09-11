import React, { useState } from "react";
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import styled from "styled-components";

import * as FORM_VALIDATORS from '../../utils/validators/form';

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassoword, setRepeatPassword] = useState("");
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState('1991-01-01');

    const validateForm = () => {
        return FORM_VALIDATORS.validateEmail(email)
            && FORM_VALIDATORS.validateRegistrationPassword(password, repeatPassoword)
            && FORM_VALIDATORS.validateName(name)
            && FORM_VALIDATORS.validateName(lastName);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('submit')
    }

    return (
        <StyledLogin>
            <form onSubmit={handleSubmit}>
                <StyledContainer>
                    <TextField
                        fullWidth
                        label="Email"
                        variant="outlined"
                        autoFocus
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </StyledContainer>
                <StyledContainer>
                    <TextField
                        fullWidth
                        label="Password"
                        variant="outlined"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </StyledContainer>
                <StyledContainer>
                    <TextField
                        fullWidth
                        label="Repeat Passowrd"
                        variant="outlined"
                        type="password"
                        value={repeatPassoword}
                        onChange={(e) => setRepeatPassword(e.target.value)}
                    />
                </StyledContainer>
                <StyledContainer>
                    <TextField
                        fullWidth
                        label="Name"
                        variant="outlined"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </StyledContainer>
                <StyledContainer>
                    <TextField
                        fullWidth
                        label="Last Name"
                        variant="outlined"
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </StyledContainer>
                <TextField
                    fullWidth
                    label="Date of Birth"
                    type="date"
                    variant="outlined"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <StyledContainer>
                </StyledContainer>
                <div>
                    <Button variant="contained" color="primary" type="submit" disabled={!validateForm()}>
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

export default Register;

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

