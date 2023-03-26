import { useState, useEffect } from "react";

function Logs() {
	interface dataTypes {
		location: string;
		weather: string;
		name: string;
		camper_count: number;
		id: string;
		timestamp: string;
	}
	type dataType = Array<dataTypes>;
	const [data, setData] = useState<dataType>([]);
	useEffect(() => {
		const getData = async () => {
			const API_URL = "http://127.0.0.1:8443/api/v1/records/";

			let res = await fetch(API_URL, {
				method: "GET",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
			});
			let res_data = await res.json();
			// @ts-ignore
			if (res_data["success"] === false) {
				return alert("error api skill issue");
			}
			setData(res_data["records"]);
		};
		let interval = setInterval(() => {
			getData();
		}, 2000);
		return () => {
			clearInterval(interval);
		};
	}, []);
	console.log(data);
	return (
		<div>
			{data.map((record) => {
				return (
					<>
						<p>
							{record.timestamp} {record.name} is at{" "}
							{record.location} with {record.camper_count}{" "}
							campers. The weather conditions are:{" "}
							{record.weather}
						</p>
						<br />
					</>
				);
			})}
		</div>
	);
}

export default Logs;
