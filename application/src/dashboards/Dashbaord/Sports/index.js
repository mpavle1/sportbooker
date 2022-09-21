import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  getAllSports,
  addSport,
  deleteSport,
} from "../../../redux/actions/sports";
import { Button, TextField } from "@material-ui/core";
import styled from "styled-components";
import DeleteIcon from "@mui/icons-material/Delete";

import withNavigationContainer from "../withNavigationContainer";

const Sports = ({ getAllSports, addSport, sports, deleteSport }) => {
  const [newSport, setNewSport] = useState("");

  useEffect(() => {
    getAllSports();
  }, []);

  const renderAllSports = () => {
    return (
      <StyledList>
        {sports.map((sport) => (
          <StyledItem key={sport.name}>
            {sport.name}
            <StyledIcon onClick={() => deleteSport(sport.name)} />
          </StyledItem>
        ))}
      </StyledList>
    );
  };

  return (
    <div>
      <h2>Sports</h2>
      <div>{renderAllSports()}</div>
      <div>
        <StyledInput
          type="text"
          placeholder="Enter new sport name"
          value={newSport}
          onChange={(event) => setNewSport(event.target.value)}
        />
        <Button
          type="button"
          onClick={() => {
            if (newSport !== "") {
              addSport(newSport);
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

const mapStateToProps = (state) => ({
  sports: state.sports,
});

export default connect(mapStateToProps, {
  getAllSports,
  addSport,
  deleteSport,
})(withNavigationContainer(Sports));

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
