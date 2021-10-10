import {
	LOGIN_START,
	LOGIN_FAILED,
	LOGIN_SUCCESS,
	SIGNUP_START,
	SIGNUP_FAILED,
	SIGNUP_SUCCESS,
	EDIT_USER_START,
	EDIT_USER_FAILED,
	EDIT_USER_SUCCESS,
} from "./actionTypes";

export function loginStart() {
	return {
		type: LOGIN_START,
	};
}

export function loginFailed(errorMessage) {
	return {
		type: LOGIN_FAILED,
		error: errorMessage,
	};
}

export function loginSuccess(user) {
	return {
		type: LOGIN_SUCCESS,
		user,
	};
}

export function login() {}

export function signupStart() {
	return {
		type: SIGNUP_START,
	};
}

export function signupFailed(errorMessage) {
	return {
		type: SIGNUP_FAILED,
		error: errorMessage,
	};
}

export function signupSuccess(user) {
	return {
		type: SIGNUP_SUCCESS,
		user,
	};
}

export function signup(name, email, password) {
	return (dispatch) => {
		let user = {
			name: name,
			email: email,
			password: password,
		};
		dispatch(signupSuccess(user));

		// if there is some error in signup
		// dispatch(signupFailed("Error messages here"));
	};
}

export function editUser(name, email, password, confirmPassword, newPassword) {
	return (dispatch) => {
		if (password === confirmPassword) {
			let user = {
				name: name,
				email: email,
			};
			newPassword === "" ? (user.password = password) : (user.password = newPassword);
			dispatch(editUserSuccess(user));
		} else {
			dispatch(editUserFailed("Passwords do not match."));
		}
	};
}

export function editUserStart() {
	return {
		type: EDIT_USER_START,
	};
}
export function editUserSuccess(user) {
	return {
		type: EDIT_USER_SUCCESS,
		user,
	};
}
export function editUserFailed(errorMessage) {
	return {
		type: EDIT_USER_FAILED,
		error: errorMessage,
	};
}
