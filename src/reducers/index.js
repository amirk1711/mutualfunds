import { combineReducers } from "redux";
import auth from "./auth";

// combine all these reducers and export it by default
export default combineReducers({
	auth,
});
