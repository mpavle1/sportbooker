import React from "react";
import { Button } from "@material-ui/core";
import styled from "styled-components";

const South = ({ stand: { sections, active }, handleOpenModal }) => {
  return (
    <StyledSouth>
      <StyledButton onClick={() => handleOpenModal("S", "A")}>
        <div>A</div> r:{sections.A.row} c:{sections.A.column}
      </StyledButton>
      <StyledButton onClick={() => handleOpenModal("S", "B")}>
        <div>B</div> r:{sections.B.row} c:{sections.B.column}
      </StyledButton>
      <StyledButton onClick={() => handleOpenModal("S", "C")}>
        <div>C</div> r:{sections.C.row} c:{sections.C.column}
      </StyledButton>
      <StyledButton onClick={() => handleOpenModal("S", "D")}>
        <div>D</div> r:{sections.D.row} c:{sections.D.column}
      </StyledButton>
      <StyledButton onClick={() => handleOpenModal("S", "E")}>
        <div>E</div> r:{sections.E.row} c:{sections.E.column}
      </StyledButton>
      <StyledButton onClick={() => handleOpenModal("S", "F")}>
        <div>F</div> r:{sections.F.row} c:{sections.F.column}
      </StyledButton>
    </StyledSouth>
  );
};

export default South;

const StyledButton = styled(Button)`
  width: 50px !important;
  height: 50px !important;
  border: 1px solid #777 !important;
  border-radius: 0 !important;
`;

const StyledSouth = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: space-around;
  gap: 10px;
`;
