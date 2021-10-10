import { useEffect, useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
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
		width: "100%",
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
	const [totalFunds, setTotalFunds] = useState([]);
	const [searchText, setSearchText] = useState("");
	const [searchResults, setSearchResults] = useState([]);

	useEffect(() => {
		fetch("https://api.mfapi.in/mf", {
			method: "GET",
		})
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				setTotalFunds(data);
				let l = [];
				for (let i = 0; i < 5; i++) {
					l.push(data[Math.floor(Math.random() * 1001)]);
				}
				setList(l);
			});
	}, []);

	useEffect(() => {
		let count = 0;
		let temp = [];
		for (let i = 0; i < totalFunds.length; i++) {
			if (count >= 4) break;
			if (totalFunds[i].schemeName.includes(searchText)) {
				temp.push(totalFunds[i]);
				count++;
			}
		}

		setSearchResults(temp);
		if (searchText === "") {
			setSearchResults([]);
		}
	}, [searchText]);

	const { isLoggedin } = props;
	if (!isLoggedin) {
		return <Redirect to="/signup" />;
	}

	const { user } = props;
	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar>
					<Search>
						<SearchIconWrapper >
							<SearchIcon />
						</SearchIconWrapper>
						<StyledInputBase
							placeholder="Search…"
							inputProps={{ "aria-label": "search" }}
							onChange={(e) => setSearchText(e.target.value)}
						/>
					</Search>
					<button className="name-btn">
						<Link to="/profile" className="name-link">
							{user.name[0]}
						</Link>
					</button>
				</Toolbar>
			</AppBar>

			{searchResults.length > 0 && (
				<div className="search-results">
					{searchResults.map((mflist) => {
						return (
							<p className="search-list-items">
								<Link
									className="search-list-links"
									to={`/details/${mflist.schemeCode}`}
								>
									<span>{mflist.schemeName}</span>
								</Link>
							</p>
						);
					})}
				</div>
			)}

			<div className="list-container">
				<h2 className="mf-heading">Mutual Funds</h2>
				{list.map((l) => {
					return (
						<p className="list-items">
							<Link className="list-links" to={`/details/${l.schemeCode}`}>
								{l.schemeName}
							</Link>
						</p>
					);
				})}
			</div>
		</Box>
	);
}
