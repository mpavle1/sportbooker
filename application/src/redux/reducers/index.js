import { combineReducers } from "@reduxjs/toolkit";

import auth from "./auth";
import error from "./error";
import { sportsReducer } from "../features/sports";
import { locationsReducer } from "../features/locations";
import events from "./events";
import tickets from "./tickets";
import search from "./search";
import users from "./users";
import sportCenters from "./sportCenters";
import reviews from "./reviews";

export default combineReducers({
  auth,
  errors: error,
  sports: sportsReducer,
  locations: locationsReducer,
  events,
  tickets,
  search,
  users,
  sportCenters,
  reviews,
});
