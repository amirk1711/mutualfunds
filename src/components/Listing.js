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
	const [totalFunds, setTotalFunds] = useState([]);
	const [searchText, setSearchText] = useState("");
	const [searchResults, setSearchResults] = useState([]);

	useEffect(() => {
		fetch("https://api.mfapi.in/mf", {
			method: "GET",
		})
			.then((response) => {
				console.log("response: ", response);
				return response.json();
			})
			.then((data) => {
				// console.log("data: ", data);
				setTotalFunds(data);
				let l = [];
				for (let i = 0; i < 5; i++) {
					l.push(data[Math.floor(Math.random() * 1001)]);
				}
				setList(l);
			});
	}, []);

	useEffect(() => {
		// fetch("https://api.mfapi.in/mf/")
		console.log("search text", searchText);
		let count = 0;
		let temp = [];
		for (let i = 0; i < totalFunds.length; i++) {
			if (count >= 4) break;
			if (totalFunds[i].schemeName.includes(searchText)) {
				console.log("search item: ", totalFunds[i].schemeName);
				temp.push(totalFunds[i].schemeName);
				count++;
			}
		}
		setSearchResults(temp);
		console.log("search results", searchResults);
        if(searchText == ""){
            setSearchResults([]);
        }
	}, [searchText]);

	const { isLoggedin } = props;

	if (!isLoggedin) {
		return <Redirect to="/signup" />;
	}

	const handleSearch = () => {};
	console.log("props in Listing: ", props);
	const { user } = props;
	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar>
					<Search>
						<SearchIconWrapper>
							<SearchIcon />
						</SearchIconWrapper>
						<StyledInputBase
							placeholder="Search…"
							inputProps={{ "aria-label": "search" }}
							onChange={(e) => setSearchText(e.target.value)}
						/>
					</Search>
					<Button>
						<Link to="/profile">{user.name}</Link>
					</Button>
				</Toolbar>
				{searchResults.length > 0 && (
					<div className="search-results">
						<ul>
							{searchResults.map((mflist) => {
								console.log("mflist", mflist);
								return (
									<li className="search-results-row">
										<Link to={`/profile`}>
											<span>{mflist}</span>
										</Link>
									</li>
								);
							})}
						</ul>
					</div>
				)}
			</AppBar>

			<div>
				{console.log("lists inside", list)}
				<div>
					{list.map((l) => {
                        // console.log('l===', l);
						return <p><Link to={`/details/${l.schemeCode}`}>{l.schemeName}</Link></p>;
					})}
				</div>
			</div>
		</Box>
	);
}
