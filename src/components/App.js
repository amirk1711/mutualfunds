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

	return (
		<Router>
			<div>
				{isLoggedin && <Redirect to="/" />}
				<Switch>
					<Route
						exact
						path="/"
						render={(props) => {
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
							return <Details isLoggedin={isLoggedin} schemeCode={props.match.params.id} />;
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
