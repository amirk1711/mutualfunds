import { useEffect, useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
// import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import { Redirect, Link } from "react-router-dom";

const Search = styled("div")(({ theme }) => ({
	position: "relative",
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.white, 0.15),
	"&:hover": {
		backgroundColor: alpha(theme.palette.common.white, 0.25),
	},
	marginLeft: 0,
	width: "100%",
	[theme.breakpoints.up("sm")]: {
		marginLeft: theme.spacing(1),
		width: "auto",
	},
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: "100%",
	position: "absolute",
	pointerEvents: "none",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: "inherit",
	"& .MuiInputBase-input": {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create("width"),
		width: "100%",
		[theme.breakpoints.up("sm")]: {
			width: "12ch",
			"&:focus": {
				width: "20ch",
			},
		},
	},
}));

export default function Listing(props) {
	const [list, setList] = useState([]);

	useEffect(() => {
		fetch("https://api.mfapi.in/mf", {
			method: "GET",
		})
			.then((response) => {
				console.log("response: ", response);
				return response.json();
			})
			.then((data) => {
				console.log("data: ", data);
                let l = [];
				for (let i = 0; i < 5; i++) {
					l.push(data[Math.floor(Math.random() * 1001)]);
				}
                setList(l);
			});
	}, []);

	const { isLoggedin } = props;

	if (!isLoggedin) {
		return <Redirect to="/signup" />;
	}

	console.log("props in Listing: ", props);
	const { user } = props;
	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar>
					<IconButton
						size="large"
						edge="start"
						color="inherit"
						aria-label="open drawer"
						sx={{ mr: 2 }}
					>
						{/* <MenuIcon /> */}
					</IconButton>
					<Typography
						variant="h6"
						noWrap
						component="div"
						sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
					>
						MUI
					</Typography>
					<Search>
						<SearchIconWrapper>
							<SearchIcon />
						</SearchIconWrapper>
						<StyledInputBase
							placeholder="Search…"
							inputProps={{ "aria-label": "search" }}
						/>
					</Search>
					<Button color="inherit">
						<Link to="/profile">{user.name}</Link>
					</Button>
				</Toolbar>
			</AppBar>

			<div>
				{console.log("lists inside", list)}
				<div>
					{list.map((l) => {
						return <p>{l.schemeName}</p>;
					})}
				</div>
			</div>
		</Box>
	);
}
