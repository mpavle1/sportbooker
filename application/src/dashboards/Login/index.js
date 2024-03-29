import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import { loginUser, cleanErrors } from "../../redux/actions/auth";

const Login = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const errors = useSelector((state) => state.errors);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  useEffect(() => {
    if (auth.isAuthenticated) {
      history.push("/");
    }
  });

  useEffect(() => {
    if (typeof errors !== "object") {
      alert(`An error occured: ${errors}`);
      dispatch(cleanErrors());
    }
  }, [errors]);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(
      loginUser({
        email,
        password,
      })
    );
  };

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
            error={errors.email !== undefined}
            helperText={errors.email !== undefined ? errors.email : ""}
            onChange={(e) => {
              delete errors["email"];
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
            error={errors.password !== undefined}
            value={password}
            onChange={(e) => {
              delete errors["password"];
              setPassword(e.target.value);
            }}
            helperText={errors.password !== undefined ? errors.password : ""}
          />
        </StyledContainer>
        <div>
          <Button variant="contained" color="primary" type="submit">
            Login
          </Button>
          <StyledLink to="/register">Register now!</StyledLink>
        </div>
      </form>
    </StyledLogin>
  );
};

export default Login;

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
