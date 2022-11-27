import React from "react";
import { Button } from "@material-ui/core";
import styled from "styled-components";
import { isSectionActive } from "../../../../../../../utils";

const South = ({ handleButtonClick, stadium }) => {
  return (
    <StyledSouth>
      <StyledField>Field</StyledField>
      <StyledButton
        onClick={() => handleButtonClick("A")}
        disabled={!isSectionActive(stadium, "S", "A")}
      >
        A
      </StyledButton>
      <StyledButton
        onClick={() => handleButtonClick("B")}
        disabled={!isSectionActive(stadium, "S", "B")}
      >
        B
      </StyledButton>
      <StyledButton
        onClick={() => handleButtonClick("C")}
        disabled={!isSectionActive(stadium, "S", "C")}
      >
        C
      </StyledButton>
      <StyledButton
        onClick={() => handleButtonClick("D")}
        disabled={!isSectionActive(stadium, "S", "D")}
      >
        D
      </StyledButton>
      <StyledButton
        onClick={() => handleButtonClick("E")}
        disabled={!isSectionActive(stadium, "S", "E")}
      >
        E
      </StyledButton>
      <StyledButton
        onClick={() => handleButtonClick("F")}
        disabled={!isSectionActive(stadium, "S", "F")}
      >
        F
      </StyledButton>
    </StyledSouth>
  );
};

export default South;

const StyledButton = styled(Button)`
  width: 160px !important;
  height: 100px !important;
  border: 1px solid #777 !important;
  border-radius: 0 !important;
`;

const StyledSouth = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: space-around;
  gap: 10px;
`;

const StyledField = styled.div`
  border: 1px solid #777 !important;
  border-top: none !important;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  background-color: khaki;
`;
