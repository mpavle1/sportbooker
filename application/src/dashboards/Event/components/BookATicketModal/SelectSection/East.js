import React from "react";
import { Button } from "@material-ui/core";
import styled from "styled-components";
import { isSectionActive } from "../../../../../utils";

const East = ({ handleButtonClick, stadium }) => {
  return (
    <StyledEast>
      <StyledField>Field</StyledField>
      <StyledGridColumn>
        <StyledButton onClick={() => handleButtonClick("A")} disabled={!isSectionActive(stadium, 'E', 'A')}>A</StyledButton>
        <StyledButton onClick={() => handleButtonClick("B")} disabled={!isSectionActive(stadium, 'E', 'B')}>B</StyledButton>
        <StyledButton onClick={() => handleButtonClick("C")} disabled={!isSectionActive(stadium, 'E', 'C')}>C</StyledButton>
      </StyledGridColumn>
      <StyledGridColumn>
        <StyledButton onClick={() => handleButtonClick("D")} disabled={!isSectionActive(stadium, 'E', 'D')}>D</StyledButton>
        <StyledButton onClick={() => handleButtonClick("E")} disabled={!isSectionActive(stadium, 'E', 'E')}>E</StyledButton>
        <StyledButton onClick={() => handleButtonClick("F")} disabled={!isSectionActive(stadium, 'E', 'F')}>F</StyledButton>
      </StyledGridColumn>
    </StyledEast>
  );
};

export default East;

const StyledButton = styled(Button)`
  width: 160px !important;
  height: 100px !important;
  border: 1px solid #777 !important;
  border-radius: 0 !important;
`;

const StyledEast = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  gap: 10px;
  width: 391px;
  margin: auto;
`;

const StyledField = styled.div`
  border: 1px solid #777 !important;
  border-left: none !important;
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
