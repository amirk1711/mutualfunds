import Box from "@mui/material/Box";
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
		dispatch(editUserStart());
		dispatch(editUser(name, email, password, user.password, newPassword));
        setEditMode(false);
	};

	return (
		<div>
			<Box
				className="profile-bg"
				sx={{
					width: "100%",
					padding: 3,
					bgcolor: "primary.dark",
				}}
			>
				<div className="avatar">{user.name[0]}</div>
			</Box>

			<div className="settings">
				<div className="field">
					<div className="field-label">Name</div>
					{editMode ? (
						<input type="text" onChange={(e) => setName(e.target.value)} value={name} />
					) : (
						<div className="field-value">{user.name}</div>
					)}
				</div>

				<div className="field">
					<div className="field-label">Email</div>
					{editMode ? (
						<input
							type="text"
							onChange={(e) => setEmail(e.target.value)}
							value={email}
						/>
					) : (
						<div className="field-value">{user.email}</div>
					)}
				</div>

				{editMode && (
					<div className="field">
						<div className="field-label">
							Your Password 
							<span style={{ fontSize: 16, color: "grey" }}>
								 (Required)
							</span>
						</div>

						<input type="password" onChange={(e) => setPassword(e.target.value)} />
					</div>
				)}

				{editMode && (
					<div className="field">
						<div className="field-label">
							New password
							<br />
							<span style={{ fontSize: 16, color: "grey" }}>
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
							Edit Profile
						</button>
					)}

					{editMode && (
						<button className="button go-back-btn" onClick={() => setEditMode(false)}>
							Go Back
						</button>
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
