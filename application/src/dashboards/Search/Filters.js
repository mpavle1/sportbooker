import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { FormControlLabel, Checkbox, FormGroup } from "@material-ui/core";

const Filters = ({ type, filterCheckedOptions, setFilterCheckedOptions }) => {
  const sports = useSelector((state) => state.sports);
  const locations = useSelector((state) => state.locations);

  const renderTitle = () => {
    if (type === "sportId") {
      return <div>Filter results by sport</div>;
    }
    return <div>Filter results by location</div>;
  };

  const renderCheckOptions = () => {
    let options = locations;
    if (type === "sportId") {
      options = sports;
    }

    return (
      <FormGroup>
        {options.map((option) => (
          <FormControlLabel
            key={option.name}
            control={
              <Checkbox
                checked={filterCheckedOptions.includes(option._id)}
                onChange={(event) => {
                  const value = event.target.id;
                  let newArray = [...filterCheckedOptions, value];
                  if (filterCheckedOptions.includes(value)) {
                    newArray = newArray.filter((sportId) => sportId !== value);
                  }
                  setFilterCheckedOptions([...newArray]);
                }}
                name={option.name}
                id={option._id}
              />
            }
            label={option.name}
          />
        ))}
      </FormGroup>
    );
  };

  return (
    <StyledFilterConteiner>
      {renderTitle()}
      <br />
      <div>{renderCheckOptions()}</div>
    </StyledFilterConteiner>
  );
};

export default Filters;

const StyledFilterConteiner = styled.div`
  width: 300px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 15px;
  background-color: white;
`;
