import React, { Fragment, useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { useParams, NavLink, Redirect } from "react-router-dom";
import styled from 'styled-components';
import axios from "axios";
import { Button } from "@material-ui/core";
import { useHistory } from 'react-router-dom'; 

import CardItem from "./components/CardItem";

import { setSearchParameters } from "../../redux/actions/search";

const Search = ({ search }) => {
  const dispatch = useDispatch();
  const [searchResults, setSearchResults] = useState([]);
  const [searchResultObject, setSearchResultObject] = useState(null);
  const { searchType, searchId } = useParams();
  const history = useHistory();

  const hasSearchResults = searchResults.length !== 0 && searchResultObject !== null;

  useEffect(() => {
    dispatch(setSearchParameters(searchType, null, searchId));

    axios
      .get(`/api/search/getObject/${searchType}/${searchId}`)
      .then((response) => {
        setSearchResultObject(response.data);
      });

    if (searchType === "event") {
      return;
    }

    axios.get(`/api/search/${searchType}/${searchId}`).then((response) => {
      setSearchResults(response.data);
    });
  }, []);

  const renderTitle = () => {
    switch (searchType) {
      case "location":
        return `Search results for events for location: ${searchResultObject.name}`;
      case "sport":
        return `Search results for events for sport: ${searchResultObject.name}`;
      case "event":
        return "events";
      case "sportCenter":
        return "Search results for events for sport centers";
    }
  };

  if (searchType === "event") {
    return <Redirect to={`/event/${searchId}`} />;
  }

  return (
    <Fragment>
      {hasSearchResults && <h2>{renderTitle()}</h2>}
      <div>
        {!hasSearchResults && <h2>No Search results for selected parametes</h2>}
        {!hasSearchResults && <Button
            variant="contained"
            color="primary"
            onClick={() => {
              history.push("/");
            }}
          >
            Back to search
          </Button>}
        {hasSearchResults && searchResults.map((searchResult) => (
          <StyledNavLink to={`/event/${searchResult._id}`} key={searchResult._id}>
            <CardItem event={searchResult} />
          </StyledNavLink>
        ))}
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  search: state.search,
});

export default connect(mapStateToProps)(Search);

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: #333;
`;