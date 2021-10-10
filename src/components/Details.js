import { useEffect, useState } from "react";
import { Legend, XAxis, YAxis, Tooltip, AreaChart, Area } from "recharts";

function Details(props) {
	const { schemeCode } = props;
	const [graphData, setGraphData] = useState([]);
	const [metaData, setMetaData] = useState({});
	console.log("screen width: ", window.screen.width);
	useEffect(() => {
		fetch(`https://api.mfapi.in/mf/${schemeCode}`, {
			method: "GET",
		})
			.then((response) => {
				console.log("response: ", response);
				return response.json();
			})
			.then((data) => {
				console.log("data: ", data);
				setGraphData(data.data);
				setMetaData(data.meta);
			});
	}, [schemeCode]);

	return (
		<div classname="details-container">
			<div className="mf-details">
				<p className="mfd-text">Mutual Fund Details</p>
			</div>
			<div className="fund-details">
				<p className="meta-titles">Fund House : </p>
				<p className="meta-data">{metaData.fund_house}</p>
				<p className="meta-titles">Scheme type: </p>
				<p className="meta-data">{metaData.scheme_type}</p>
				<p className="meta-titles">Scheme Name</p>
				<p className="meta-data">{metaData.scheme_name}</p>
			</div>
			<p className="note-text">See below how NAV (Net Asset Value) changes with the time.</p>
			<AreaChart
				className="graph-container"
				width={window.screen.width - 10}
				height={260}
				data={graphData}
				margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
			>
				<defs>
					<linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
						<stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
						<stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
					</linearGradient>
				</defs>
				<XAxis dataKey="date" />
				<YAxis />
				<Tooltip />
				<Legend verticalAlign="top" height={36} />
				<Area
					type="monotone"
					dataKey="nav"
					stroke="#8884d8"
					fillOpacity={1}
					fill="url(#colorUv)"
				/>
			</AreaChart>{" "}
		</div>
	);
}

export default Details;
