import { useState, useEffect } from "react";
import getData from "./getData";
function Logs() {
	interface dataTypes {
		location: string;
		weather: string;
		name: string;
		camper_count: number;
		id: string;
		timestamp: number;
	}

	type dataType = Array<dataTypes>;
	const [data, setData] = useState<dataType>([]);

	useEffect(() => {
		getData(setData);
		let interval = setInterval(() => {
			getData(setData);
		}, 5000); // make a request every 5 sec to check for new logs
		return () => {
			clearInterval(interval);
		};
	}, []);

	return (
		<div className="bg-red-600">
			<div className="flex justify-center">
				<ul>
					{data[0] !== undefined ? (
						<li className="w-full p-4 bg-blue-100 ">
							{new Date(data[0].timestamp).toLocaleString()}:{" "}
							{data[0].name} is at {data[0].location} with{" "}
							{data[0].camper_count} campers and the weather
							conditions there are {data[0].weather}
						</li>
					) : (
						<></>
					)}

					{data.slice(1).map((record, idx) => {
						return (
							<li key={idx} className="w-full p-4 bg-white">
								{new Date(record.timestamp).toLocaleString()}:{" "}
								{record.name} is at {record.location} with{" "}
								{record.camper_count} campers and the weather
								conditions there are {record.weather}
							</li>
						);
					})}
				</ul>
			</div>
		</div>
	);
}

export default Logs;
