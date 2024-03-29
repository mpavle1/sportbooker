import React from "react";
import { Button } from "@material-ui/core";
import styled from "styled-components";

const East = ({ stand: { sections, active }, handleOpenModal }) => {
  return (
    <StyledEast>
      <StyledGridColumn>
        <StyledButton onClick={() => handleOpenModal("E", "A")}>
          <div>A</div> r:{sections.A.row} c:{sections.A.column}
        </StyledButton>
        <StyledButton onClick={() => handleOpenModal("E", "B")}>
          <div>B</div> r:{sections.B.row} c:{sections.B.column}
        </StyledButton>
        <StyledButton onClick={() => handleOpenModal("E", "C")}>
          <div>C</div> r:{sections.C.row} c:{sections.C.column}
        </StyledButton>
      </StyledGridColumn>
      <StyledGridColumn>
        <StyledButton onClick={() => handleOpenModal("E", "D")}>
          <div>D</div> r:{sections.D.row} c:{sections.D.column}
        </StyledButton>
        <StyledButton onClick={() => handleOpenModal("E", "E")}>
          <div>E</div> r:{sections.E.row} c:{sections.E.column}
        </StyledButton>
        <StyledButton onClick={() => handleOpenModal("E", "F")}>
          <div>F</div> r:{sections.F.row} c:{sections.F.column}
        </StyledButton>
      </StyledGridColumn>
    </StyledEast>
  );
};

export default East;

const StyledButton = styled(Button)`
  width: 50px !important;
  height: 50px !important;
  border: 1px solid #777 !important;
  border-radius: 0 !important;
`;

const StyledEast = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  gap: 10px;
  margin: auto;
`;

const StyledGridColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
