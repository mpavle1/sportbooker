import React, { Fragment, useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { useParams, NavLink, Redirect } from "react-router-dom";
import styled from 'styled-components';
import axios from "axios";

import CardItem from "./components/CardItem";

import { setSearchParameters } from "../../redux/actions/search";

const Search = ({ search }) => {
  const dispatch = useDispatch();
  const [searchResults, setSearchResults] = useState([]);
  const [searchResultObject, setSearchResultObject] = useState(null);
  const { searchType, searchId } = useParams();

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

  if (searchResults.length === 0 || searchResultObject === null) {
    return <div>Loading results...</div>;
  }

  return (
    <Fragment>
      <h2>{renderTitle()}</h2>
      <div>
        {/* <Home /> dodati opciju da i na search results stranici pretrazuju se nove stvari */}

        {searchResults.map((searchResult) => (
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