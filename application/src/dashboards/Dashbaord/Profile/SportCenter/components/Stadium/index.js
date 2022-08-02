import React, { Fragment, useState } from "react";
import styled from "styled-components";

import North from "./North";
import South from "./South";
import East from "./East";
import West from "./West";
import SetRowColumnModal from "./SetRowColumnModal";

const SelectSection = ({ isViewModeActive, stadium, onChangeStadium }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [standAndSection, setStandAndSection] = useState({
    stand: "N",
    section: "A",
  });

  const handleOpenModal = (stand, section) => {
    if (!isViewModeActive) {
      setStandAndSection({ stand, section });
      setIsModalVisible(true);
    }
  };

  const updateStadium = (stand, section, row, column) => {
    setIsModalVisible(false);
    if (!isViewModeActive) {
      onChangeStadium(stand, section, row, column);
    }
  };

  return (
    <Fragment>
      <StyledSelectSection>
        <StyledNorthButton>
          <North stand={stadium.N} handleOpenModal={handleOpenModal} />
        </StyledNorthButton>
        <StyledEastButton>
          <East stand={stadium.E} handleOpenModal={handleOpenModal} />
        </StyledEastButton>
        <StyledWestButton>
          <West stand={stadium.W} handleOpenModal={handleOpenModal} />
        </StyledWestButton>
        <StyledSouthButton>
          <South stand={stadium.S} handleOpenModal={handleOpenModal} />
        </StyledSouthButton>
        <StyledImage src="/public/stadion.jpeg" />
      </StyledSelectSection>
      <SetRowColumnModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        stadium={stadium}
        standAndSection={standAndSection}
        updateStadium={updateStadium}
      />
    </Fragment>
  );
};

SelectSection.defaultProps = {
  isViewModeActive: false,
  onChangeStadium: () => {}
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

const StyledSelectSection = styled.div`
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
