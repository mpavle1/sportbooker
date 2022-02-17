import "react-bootstrap-typeahead/css/Typeahead.css";
// import "bootstrap/dist/css/bootstrap.min.css";

import React from "react";
import fetch from "isomorphic-fetch";
import styled from "styled-components";
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Button,
  TextField,
} from "@material-ui/core";

import { setSearchParameters } from '../../redux/actions/search';

const PER_PAGE = 50;

function makeAndHandleRequest(query, type) {
  return fetch(
    `${"http://localhost:5000/api/search"}?param=${query}&type=${type}`
  )
    .then((resp) => resp.json())
    .then((result) => {
      let options = [];
      switch (type) {
        case "location":
          options = result.map((i) => ({
            id: i._id,
            name: i.name,
          }));
          break;
        case "event":
          options = result.map((i) => ({
            id: i._id,
            name: i.title,
          }));
          break;
        case "sport":
          options = result.map((i) => ({
            id: i._id,
            name: i.name,
          }));
          break;
        case "sportCenter":
          options = result.map((i) => ({
            id: i._id,
            name: i.name,
          }));
          break;
      }

      return { options };
    });
}

class Home extends React.Component {
  state = {
    isLoading: false,
    options: [],
    query: "",
    type: "location",
    date: null,
    selectedOption: {},
  };

  componentDidMount() {
    var cssId = "myCss"; // you could encode the css path itself to generate id..
    if (!document.getElementById(cssId)) {
      var head = document.getElementsByTagName("head")[0];
      var link = document.createElement("link");
      link.id = cssId;
      link.rel = "stylesheet";
      link.type = "text/css";
      link.crossOrigin = "anonymous"
      link.integrity = "sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
      link.href = "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css";
      link.media = "all";
      head.appendChild(link);
    }
  }

  componentWillUnmount() {
    var cssId = "myCss";
    if (document.getElementById(cssId)) {
      document.getElementById("myCss").remove();
    }
  }

  _cache = {};

  render() {
    return (
      <div style={{ position: "relative" }}>
        <StyledSearchBarContainer>
          <FormControl component="fieldset">
            <FormLabel component="legend">Select search option</FormLabel>
            <RadioGroup
              row
              aria-label="option"
              name="row-radio-buttons-group"
              value={this.state.type}
              onChange={(event) => {
                this.setState({ type: event.target.value });
              }}
            >
              <FormControlLabel
                value="location"
                control={<Radio color="primary" />}
                label="Location"
              />
              <FormControlLabel
                value="event"
                control={<Radio color="primary" />}
                label="Event"
              />
              <FormControlLabel
                value="sport"
                control={<Radio color="primary" />}
                label="Sport"
              />
              <FormControlLabel
                value="sportCenter"
                control={<Radio color="primary" />}
                label="Sport Center"
              />
            </RadioGroup>
          </FormControl>
          <div style={{ marginTop: "15px" }}>
            <TextField
              fullWidth
              label=""
              type="date"
              variant="outlined"
              value={this.state.date}
              onChange={(event) => this.setState({ date: event.target.value })}
              InputLabelProps={{
                shrink: true,
              }}
              placeholder="Event date"
            />
          </div>
          <div style={{ margin: "20px 0 20px" }}>
            <StyledSeatchBar
              {...this.state}
              id="async-pagination-example"
              labelKey="name"
              maxResults={PER_PAGE - 1}
              minLength={2}
              onInputChange={(query) => this.setState({ query })}
              onChange={(event) => this.setState({ selectedOption: event })}
              onPaginate={this._handlePagination}
              onSearch={this._handleSearch}
              paginate
              placeholder="Search for location"
              renderMenuItemChildren={(option) => (
                <div key={option.id}>
                  <span>{option.name}</span>
                </div>
              )}
              useCache={false}
            />
          </div>
          <Button
            variant="contained"
            color="primary"
            disabled={Object.keys(this.state.selectedOption).length === 0}
            onClick={() => {
              this.props.setSearchParameters(
                this.state.type,
                this.state.date,
                this.state.selectedOption[0].id
              );
              if (this.state.type === 'event') {
                this.props.history.push({
                  pathname: `/${this.state.type}/${this.state.selectedOption[0].id}`,
                });
              }
              this.props.history.push({
                pathname: `/search/${this.state.type}/${this.state.selectedOption[0].id}`,
              });
            }}
          >
            Search
          </Button>
        </StyledSearchBarContainer>
      </div>
    );
  }

  _handlePagination = (e, shownResults) => {
    const { query } = this.state;
    const cachedQuery = this._cache[query];

    // Don't make another request if:
    // - the cached results exceed the shown results
    // - we've already fetched all possible results
    if (
      cachedQuery.options.length > shownResults ||
      cachedQuery.options.length === cachedQuery.total_count
    ) {
      return;
    }

    this.setState({ isLoading: true });

    makeAndHandleRequest(query, this.state.type).then((resp) => {
      const options = cachedQuery.options.concat(resp.options);
      const type = this.state.type;
      this._cache[query] = { ...cachedQuery, options, type };
      this.setState({
        isLoading: false,
        options,
      });
    });
  };

  _handleSearch = (query) => {
    if (this._cache[query]) {
      this.setState({ options: this._cache[query].options });
      return;
    }

    this.setState({ isLoading: true });
    makeAndHandleRequest(query, this.state.type).then((resp) => {
      this._cache[query] = { ...resp, type: "location" };
      this.setState({
        isLoading: false,
        options: resp.options,
      });
    });
  };
}

export default connect(
  () => ({}),
  {
    setSearchParameters
  }
)(withRouter(Home));

const StyledSearchBarContainer = styled.div`
  width: 500px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 25px;
  position: absolute;
  top: 100px;
  left: 50%;
  transform: translate(-50%);
  background-color: white;
`;

const StyledSeatchBar = styled(AsyncTypeahead)`
  height: 56px;
`;
