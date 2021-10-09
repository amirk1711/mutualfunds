import { useEffect } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Listing from "./Listing";
import Login from "./Login";
import Signup from "./Signup";
import Profile from "./Profile";

function App(props) {
	const { isLoggedin } = props.auth;
	const { auth } = props;
	console.log("auth: ", auth);

	useEffect(() => {
		console.log("mounted");
	}, []);

	// useEffect(() => {
	// 	console.log("isLoggedIn changed", isLoggedin);
	// 	if (isLoggedin) {
	// 		console.log("redirecting to home");
	// 		// <Redirect to="/" />;
	// 	}
	// }, [isLoggedin]);

	return (
		<Router>
			{console.log("running")}
			<div>
				{isLoggedin && <Redirect to="/" />}
				<Switch>
					<Route
						exact
						path="/"
						render={(props) => {
							console.log("Here");
							return <Listing {...props} isLoggedin={isLoggedin} user={auth.user} />;
						}}
					/>
					<Route path="/login" component={Login} />
					<Route path="/signup" component={Signup} />
					<Route path="/profile" component={Profile} />
					{/* private route : settings component is accessible only when user is logged in */}
					{/* <PrivateRoute
						path="/settings"
						component={Settings}
						isLoggedin={auth.isLoggedin}
					/>
					<PrivateRoute
						path="/user/:userId"
						component={Profile}
						isLoggedin={auth.isLoggedin}
					/>
					<Route component={Page404} /> */}
				</Switch>
			</div>
		</Router>
	);
}

function mapStateToProps(state) {
	return {
		auth: state.auth,
		// suggestions: state.suggestions,
	};
}
export default connect(mapStateToProps)(App);
