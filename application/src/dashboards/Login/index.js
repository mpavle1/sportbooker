import React, { useState } from "react";
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import styled from "styled-components";

import * as FORM_VALIDATORS from '../../utils/validators/form';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const validateForm = () => {
        return FORM_VALIDATORS.validateEmail(email) && FORM_VALIDATORS.validatePassword(password);
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
                        label="Password"
                        variant="outlined"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </StyledContainer>
                <div>
                    <Button variant="contained" color="primary" type="submit" disabled={!validateForm()}>
                        Login
                    </Button>
                    <StyledLink to="/register">
                        Register now!
                    </StyledLink>
                </div>
            </form>
        </StyledLogin>
    );
}

export default Login;

const StyledContainer = styled.div`
    margin-bottom: 10px;
`;

const StyledLogin = styled.div`
    width: 195px;
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
