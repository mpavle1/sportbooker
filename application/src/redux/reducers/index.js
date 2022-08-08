import { combineReducers } from "redux";

import auth from "./auth";
import error from "./error";
import sports from "./sports";
import locations from "./locations";
import events from "./events";
import tickets from "./tickets";
import search from "./search";

export default combineReducers({
    auth,
    errors: error,
    sports,
    locations,
    events,
    tickets,
    search
});