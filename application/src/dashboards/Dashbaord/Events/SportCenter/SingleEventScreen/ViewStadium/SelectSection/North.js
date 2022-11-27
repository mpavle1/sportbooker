import React from "react";
import { Button } from "@material-ui/core";
import styled from "styled-components";
import { isSectionActive } from "../../../../../../../utils";

const North = ({ handleButtonClick, stadium }) => {
  return (
    <StyledNorth>
      <StyledButton
        onClick={() => handleButtonClick("D")}
        disabled={!isSectionActive(stadium, "N", "D")}
      >
        D
      </StyledButton>
      <StyledButton
        onClick={() => handleButtonClick("E")}
        disabled={!isSectionActive(stadium, "N", "E")}
      >
        E
      </StyledButton>
      <StyledButton
        onClick={() => handleButtonClick("F")}
        disabled={!isSectionActive(stadium, "N", "F")}
      >
        F
      </StyledButton>
      <StyledButton
        onClick={() => handleButtonClick("A")}
        disabled={!isSectionActive(stadium, "N", "A")}
      >
        A
      </StyledButton>
      <StyledButton
        onClick={() => handleButtonClick("B")}
        disabled={!isSectionActive(stadium, "N", "B")}
      >
        B
      </StyledButton>
      <StyledButton
        onClick={() => handleButtonClick("C")}
        disabled={!isSectionActive(stadium, "N", "C")}
      >
        C
      </StyledButton>
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
