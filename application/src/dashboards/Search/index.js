import React, { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, Redirect } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import moment from "moment";

import CardItem from "./CardItem";
import Filters from "./Filters";
import SearchBox from "../../components/SearchBox";

import { setSearchParameters } from "../../redux/actions/search";
import { fetchLocations } from "../../redux/features/locations";

import { fetchSports } from "../../redux/features/sports";

const Search = () => {
  const dispatch = useDispatch();

  const [searchResults, setSearchResults] = useState([]);
  const [searchResultObject, setSearchResultObject] = useState(null);
  const [filterCheckedOptions, setFilterCheckedOptions] = useState([]);
  const [filterType, setFilterType] = useState("sportId");
  const { searchType, searchId } = useParams();

  useEffect(() => {
    dispatch(setSearchParameters(searchType, null, searchId));
    dispatch(fetchSports());
    dispatch(fetchLocations());

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

  useEffect(() => {
    const path = window.location.pathname.split("/")[2];
    switch (path) {
      case "sportCenter":
      case "location":
        setFilterType("sportId");
        break;
      case "sportCenter":
      case "sport":
        setFilterType("locationId");
        break;
      default:
        break;
    }
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

  const getSearchResults = () => {
    return searchResults.filter((event) => {
      const today = moment().format(`YYYY-MM-DD HH:mm`);
      const eventDate = moment(new Date(event.date).toString()).format(
        "YYYY-MM-DD"
      );
      const eventDateTime = moment(`${eventDate} ${event.endTime}`).format(
        `YYYY-MM-DD HH:mm`
      );

      if (filterCheckedOptions.length !== 0) {
        return (
          moment(today).isBefore(eventDateTime) &&
          filterCheckedOptions.includes(event[filterType])
        );
      }

      return moment(today).isBefore(eventDateTime);
    });
  };

  const hasSearchResults =
    getSearchResults().length !== 0 && searchResultObject !== null;

  return (
    <Fragment>
      <StyledTitle>
        {hasSearchResults ? (
          renderTitle()
        ) : (
          <Fragment>
            No Search results for selected parametes, please change your seatch
            options
          </Fragment>
        )}
      </StyledTitle>
      <StyledContent>
        <div>
          <SearchBox />
          <br />
          <Filters
            type={filterType}
            filterCheckedOptions={filterCheckedOptions}
            setFilterCheckedOptions={setFilterCheckedOptions}
          />
        </div>
        <StyledResults>
          {getSearchResults().map((searchResult) => (
            <CardItem event={searchResult} key={searchResult._id} />
          ))}
        </StyledResults>
      </StyledContent>
      <br />
    </Fragment>
  );
};

export default Search;

const StyledContent = styled.div`
  display: flex;
`;

const StyledResults = styled.div`
  width: calc(100% - 300px);
  display: flex;
  justify-content: center;

  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const StyledTitle = styled.div`
  font-size: 30px;
  margin: 25px 0;
  font-weight: bold;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;
