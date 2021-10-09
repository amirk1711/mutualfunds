import {
	LOGIN_START,
	LOGIN_SUCCESS,
	LOGIN_FAILED,
	LOGOUT_START,
	LOGOUT_SUCCESS,
	LOGOUT_FAILED,
	SIGNUP_START,
	SIGNUP_SUCCESS,
	SIGNUP_FAILED,
	EDIT_USER_START,
	EDIT_USER_SUCCESS,
	EDIT_USER_FAILED,
} from "../actions/actionTypes";

const initialAuthState = {
	user: {},
	error: null,
	isLoggedin: false,
	inProgress: false,
	isUpdating: false,
};

export default function auth(state = initialAuthState, action) {
	switch (action.type) {
		case LOGIN_START:
		case SIGNUP_START:
		case LOGOUT_START:
			return {
				...state,
				inProgress: true,
			};
		case LOGIN_SUCCESS:
		case SIGNUP_SUCCESS:
			return {
				...state,
				user: action.user,
				isLoggedin: true,
				inProgress: false,
				error: null,
			};
		case LOGIN_FAILED:
		case SIGNUP_FAILED:
		case LOGOUT_FAILED:
			return {
				...state,
				inProgress: false,
				error: action.error,
			};
		case LOGOUT_SUCCESS:
			return {
				...state,
				user: {},
				isLoggedin: false,
			};
		case EDIT_USER_START:
			return {
				...state,
				isUpdating: true,
			};
		case EDIT_USER_SUCCESS:
			return {
				...state,
				user: action.user,
				isUpdating: false,
				error: false,
			};
		case EDIT_USER_FAILED:
			return {
				...state,
				error: action.error,
				isUpdating: false,
			};
		default:
			return state;
	}
}
