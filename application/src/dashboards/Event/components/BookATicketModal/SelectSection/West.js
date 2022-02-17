import React from "react";
import { Button } from "@material-ui/core";
import styled from 'styled-components';

const West = ({ handleButtonClick }) => {
  return (
    <StyledWest>
      <StyledGridColumn>
        <StyledButton onClick={() => handleButtonClick("D")}>D</StyledButton>
        <StyledButton onClick={() => handleButtonClick("E")}>E</StyledButton>
        <StyledButton onClick={() => handleButtonClick("F")}>F</StyledButton>
      </StyledGridColumn>
      <StyledGridColumn>
        <StyledButton onClick={() => handleButtonClick("A")}>A</StyledButton>
        <StyledButton onClick={() => handleButtonClick("B")}>B</StyledButton>
        <StyledButton onClick={() => handleButtonClick("C")}>C</StyledButton>
      </StyledGridColumn>
      <StyledField>Field</StyledField>
    </StyledWest>
  );
};

export default West;

const StyledButton = styled(Button)`
  width: 160px !important;
  height: 100px !important;
  border: 1px solid #777 !important;
  border-radius: 0 !important;
`;

const StyledWest = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  gap: 10px;
  width: 391px;
  margin: auto;
`;

const StyledField = styled.div`
  border: 1px solid #777 !important;
  border-right: none !important;
  height: 100%;
  width: 50px;
  background-color: khaki;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledGridColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
