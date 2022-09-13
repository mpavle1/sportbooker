import { combineReducers } from "redux";

import auth from "./auth";
import error from "./error";
import sports from "./sports";
import locations from "./locations";
import events from "./events";
import tickets from "./tickets";
import search from "./search";
import users from "./users";

export default combineReducers({
    auth,
    errors: error,
    sports,
    locations,
    events,
    tickets,
    search,
    users
});