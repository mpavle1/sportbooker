import React from "react";
import fetch from "isomorphic-fetch";
import styled from "styled-components";
import { connect } from "react-redux";
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
import moment from "moment";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import { DateRangePicker } from '@mui/lab';

import YourUpcomingEvents from './YourUpcomingEvents';
import SportCenterUpcomingEvents from './SportCenterUpcomingEvents';
import UpcomingEvents from './UpcomingEvents';

import { setSearchParameters } from "../../redux/actions/search";
import { getAllSports } from "../../redux/actions/sports";
import { getAllLocations } from "../../redux/actions/locations";
import { getAllUsers } from "../../redux/actions/users";
import { getAllSportCenters } from "../../redux/actions/sportCenters";

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
    dateFrom: null,
    dateTo: null,
    selectedOption: {},
  };

  _cache = {};

  componentDidMount() {
    const { getAllSports, getAllLocations, getAllUsers, getAllSportCenters } =
      this.props;
    getAllSports();
    getAllLocations();
    getAllUsers();
    getAllSportCenters();
  }

  handlePlaceHolder = () => {
    switch (this.state.type) {
      case "location":
        return "Search by location";
      case "event":
        return "Search for event";
      case "sportCenter":
        return "Search by sport center";
      case "sport":
        return "Search by sport";
      default:
        break;
    }
  };

  render() {
    const { isAuthenticated, user, sportCenter } = this.props;
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
            <StyledDateConainer>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Date From"
                  inputFormat="dd/MM/yyyy"
                  value={this.state.dateFrom}
                  onChange={(newValue) => {
                    this.setState({
                      dateFrom: moment(newValue).format("YYYY-MM-DD"),
                    });
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Date To"
                  inputFormat="dd/MM/yyyy"
                  value={this.state.dateTo}
                  onChange={(newValue) => {
                    this.setState({
                      dateTo: moment(newValue).format("YYYY-MM-DD"),
                    });
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </StyledDateConainer>
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
              placeholder={this.handlePlaceHolder()}
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
                this.state.dateFrom,
                this.state.dateTo,
                this.state.selectedOption[0].id
              );
              if (this.state.type === "event") {
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
        <StyledBackgroundWrapper>
          <StyledBackground></StyledBackground>
        </StyledBackgroundWrapper>
        {user?.type === 'user' && <YourUpcomingEvents user={user} />}
        {user?.type === 'sportCenter' && <SportCenterUpcomingEvents sportCenterId={sportCenter._id} />}
        {user?.type !== 'sportCenter' && <UpcomingEvents />}
        <br />
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

export default connect((state) => ({
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated,
  sportCenter: state.auth.sportCenter
}), {
  setSearchParameters,
  getAllSports,
  getAllLocations,
  getAllUsers,
  getAllSportCenters,
})(withRouter(Home));

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
  z-index: 1000;
`;

const StyledSeatchBar = styled(AsyncTypeahead)`
  height: 56px;
`;

const StyledDateConainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 15px;
`;

const StyledBackgroundWrapper = styled.div`
  overflow: hidden;
  position: relative;
  top: 20px;
`;

const StyledBackground = styled.div`
  @keyframes slide {
    0% {
      transform: translate3d(0, 0, 0);
    }
    100% {
      transform: translate3d(-1692px, 0, 0);
    }
  }
  background: url("/public/home_page_banner.jpg") repeat-x;
  height: 500px;
  width: 3960px;
  animation: slide 45s linear infinite;
  background-position: center;
`;
