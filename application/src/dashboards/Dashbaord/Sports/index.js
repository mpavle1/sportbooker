import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Button, TextField } from "@material-ui/core";
import DeleteIcon from "@mui/icons-material/Delete";

import withNavigationContainer from "../withNavigationContainer";

import { fetchSports, addSport, deleteSport, sportsSelectors } from "../../../redux/features/sports";

const Sports = () => {
  const dispatch = useDispatch();

  const sports = useSelector(sportsSelectors.selectAll);
  const isSportsInitialized = useSelector(sportsSelectors.selectIsInitialized);

  const [newSport, setNewSport] = useState("");

  useEffect(() => {
    if (!isSportsInitialized) {
      dispatch(fetchSports());
    }
  }, [isSportsInitialized]);

  const renderAllSports = () => {
    return (
      <StyledList>
        {sports.map((sport) => (
          <StyledItem key={sport.name}>
            {sport.name}
            <StyledIcon onClick={() => dispatch(deleteSport(sport))} />
          </StyledItem>
        ))}
      </StyledList>
    );
  };

  if (!isSportsInitialized) {
    return null;
  }

  return (
    <div>
      <h2>Sports</h2>
      <div>{renderAllSports()}</div>
      <div style={{
          display: 'flex',
          alignItems: 'flex-end'
      }}>
        <StyledInput
          type="text"
          label="Enter new sport name"
          value={newSport}
          onChange={(event) => setNewSport(event.target.value)}
        />
        <Button
          type="button"
          onClick={() => {
            if (newSport !== "") {
              dispatch(addSport(newSport));
              setNewSport("");
            }
          }}
          disabled={
            sports.find((sport) => sport.name === newSport) !== undefined
          }
        >
          Add Sport
        </Button>
      </div>
    </div>
  );
};

export default withNavigationContainer(Sports);

const StyledInput = styled(TextField)`
  width: 300px;
`;

const StyledList = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledItem = styled.div`
  display: flex;
  justify-content: space-between;
  width: 250px;
  margin: 0 0 10px;
`;

const StyledIcon = styled(DeleteIcon)`
  color: darkred;
`;
