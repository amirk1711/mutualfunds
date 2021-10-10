import { useEffect } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Listing from "./Listing";
import Login from "./Login";
import Signup from "./Signup";
import Profile from "./Profile";
import Details from "./Details";

function App(props) {
	const { isLoggedin } = props.auth;
	const { auth } = props;
	console.log("auth: ", auth);

	useEffect(() => {
		console.log("mounted");
	}, []);

	return (
		<Router>
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
					<Route exact path="/login" component={Login} />
					<Route exact path="/signup" component={Signup} />
					<Route exact path="/profile" component={Profile} />
					<Route
						exact
						path="/details/:id"
						render={(props) => {
							console.log("props inside deetails: ", props);
							return <Details schemeCode={props.match.params.id} />;
						}}
					/>
				</Switch>
			</div>
		</Router>
	);
}

function mapStateToProps(state) {
	return {
		auth: state.auth,
	};
}
export default connect(mapStateToProps)(App);
