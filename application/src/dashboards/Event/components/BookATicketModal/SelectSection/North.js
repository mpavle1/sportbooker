import React from "react";
import { Button } from "@material-ui/core";
import styled from "styled-components";

const North = ({ handleButtonClick }) => {
  return (
    <StyledNorth>
      <StyledButton onClick={() => handleButtonClick("D")}>D</StyledButton>
      <StyledButton onClick={() => handleButtonClick("E")}>E</StyledButton>
      <StyledButton onClick={() => handleButtonClick("F")}>F</StyledButton>
      <StyledButton onClick={() => handleButtonClick("A")}>A</StyledButton>
      <StyledButton onClick={() => handleButtonClick("B")}>B</StyledButton>
      <StyledButton onClick={() => handleButtonClick("C")}>C</StyledButton>
      <StyledField>Field</StyledField>
    </StyledNorth>
  );
};

export default North;

const StyledButton = styled(Button)`
  width: 160px !important;
  height: 100px !important;
  border: 1px solid #777 !important;
  border-radius: 0 !important;
`;

const StyledNorth = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: space-around;
  gap: 10px;
`;

const StyledField = styled.div`
  border: 1px solid #777 !important;
  border-bottom: none !important;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  background-color: khaki;
`;
