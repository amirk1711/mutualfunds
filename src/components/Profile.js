import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { deepOrange, deepPurple, grey } from "@mui/material/colors";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { editUser, editUserStart } from "../actions/auth";

function Profile(props) {
	console.log("props in Profile", props);
	const { user, isLoggedin } = props.auth;
	const [name, setName] = useState(user.name);
	const [email, setEmail] = useState(user.email);
	const [password, setPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [editMode, setEditMode] = useState(false);
	const dispatch = useDispatch();

	if (!isLoggedin) {
		console.log("redirecting...");
		return <Redirect pathname="/signup" />;
	}

	const handleSave = () => {
		// const {password, confirmPassword, name} = this.state;
		// const { user } = this.props.auth;
		// dispatch(editUser(name, password, confirmPassword));
		dispatch(editUserStart());
		dispatch(editUser(name, email, password, user.password, newPassword));
	};

	return (
		<div>
			<Box
				sx={{
					width: "100%",
					maxWidth: 500,
					padding: 3,
					bgcolor: "primary.dark",
				}}
			>
				<Avatar sx={{ bgcolor: deepOrange[600] }}>{user.name[0]}</Avatar>
			</Box>

			<div className="settings">
				<div className="field">
					<div classname="field-label">Email</div>
					{editMode ? (
						<input
							type="text"
							onChange={(e) => setEmail(e.target.value)}
							value={email}
						/>
					) : (
						<div classname="field-value">{user.email}</div>
					)}
				</div>

				<div className="field">
					<div classname="field-label">Name</div>
					{editMode ? (
						<input type="text" onChange={(e) => setName(e.target.value)} value={name} />
					) : (
						<div classname="field-value">{user.name}</div>
					)}
				</div>

				{editMode && (
					<div className="field">
						<div classname="field-label">Your Password</div>

						<input type="password" onChange={(e) => setPassword(e.target.value)} />
					</div>
				)}

				{editMode && (
					<div className="field">
						<div classname="field-label">
							New password
							<span style={{ fontSize: 12, color: grey }}>
								(Only if you want to change your password)
							</span>
						</div>

						<input type="password" onChange={(e) => setNewPassword(e.target.value)} />
					</div>
				)}

				<div className="btn-grp">
					{editMode ? (
						<button className="button save-btn" onClick={() => handleSave()}>
							Save
						</button>
					) : (
						<button className="button edit-btn" onClick={() => setEditMode(true)}>
							Edit profile
						</button>
					)}

					{editMode && (
						<div className="go-back" onClick={() => setEditMode(false)}>
							Go back
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

function mapStateToProps({ auth }) {
	return {
		auth,
	};
}

export default connect(mapStateToProps)(Profile);
