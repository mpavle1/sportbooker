import { combineReducers } from "redux";

import auth from "./auth";
import error from "./error";
import sports from "./sports";
import locations from "./locations";

export default combineReducers({
    auth,
    errors: error,
    sports,
    locations
});