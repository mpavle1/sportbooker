import React, { Fragment } from "react";
import { Button } from "@material-ui/core";
import styled from "styled-components";

import North from "./North";
import South from "./South";
import East from "./East";
import West from "./West";

const SelectSection = ({ isViewModeActive, stadium, onChangeStadium }) => {
  return (
    <Fragment>
      <StyledModalBody>
        <StyledNorthButton>
          <North onChangeStadium={onChangeStadium} stand={stadium.N} />
        </StyledNorthButton>
        <StyledEastButton>
          <East handleButtonClick={onChangeStadium} stand={stadium.E} />
        </StyledEastButton>
        <StyledWestButton>
          <West handleButtonClick={onChangeStadium} stand={stadium.W} />
        </StyledWestButton>
        <StyledSouthButton>
          <South handleButtonClick={onChangeStadium} stand={stadium.S} />
        </StyledSouthButton>
        <StyledImage src="/public/stadion.jpeg" />
      </StyledModalBody>
    </Fragment>
  );
};

export default SelectSection;

const StyledImage = styled.img`
  height: 170px;
  width: 212px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const StyledModalBody = styled.div`
  position: relative;
  height: 500px;
  width: 600px;
`;

const StyledNorthButton = styled.div`
  position: absolute !important;
  left: 50%;
  transform: translate(-50%, 42%);
  width: 212px;
`;

const StyledSouthButton = styled.div`
  position: absolute !important;
  left: 50%;
  transform: translate(-50%, 312%);
  width: 212px;
`;

const StyledEastButton = styled.div`
  height: 170px;
  position: absolute !important;
  transform: translate(299%, -50%);
  top: 50%;
`;

const StyledWestButton = styled.div`
  height: 170px;
  position: absolute !important;
  transform: translate(39%, -50%);
  top: 50%;
`;
