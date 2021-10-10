import { useEffect, useState } from "react";
import {
	LineChart,
	Line,
	CartesianGrid,
	XAxis,
	YAxis,
	Tooltip,
	Legend,
	AreaChart,
	Area,
} from "recharts";

function Details(props) {
	const { schemeCode } = props;
	const [graphData, setGraphData] = useState([]);
    const [metaData, setMetaData] = useState({});

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
				// data.meta contains extra info
			});
	}, []);

	return (
		<div>
			<AreaChart
				width={730}
				height={250}
				data={graphData}
				margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
			>
				<defs>
					<linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
						<stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
						<stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
					</linearGradient>
					<linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
						<stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
						<stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
					</linearGradient>
				</defs>
				<XAxis dataKey="date" />
				<YAxis />
				<Tooltip />
				<Area
					type="monotone"
					dataKey="nav"
					stroke="#8884d8"
					fillOpacity={1}
					fill="url(#colorUv)"
				/>
			</AreaChart>{" "}

            <div>
                <p>Fund House : </p>
                <p>{metaData.fund_house}</p>
                <p>Scheme type: </p>
                <p>{metaData.scheme_type}</p>
                <p>Scheme Name</p>
                <p>{metaData.scheme_name}</p>
            </div>
		</div>
	);
}

export default Details;
