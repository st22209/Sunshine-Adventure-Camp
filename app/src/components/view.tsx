import { useState, useEffect } from "react";
import getData from "./getData";
import { motion } from "framer-motion";

const View = () => {
	interface dataTypes {
		location: string;
		weather: string;
		name: string;
		camper_count: number;
		id: number;
		timestamp: number;
	}

	interface ModalData {
		showModal: boolean;
		recordId: number | null;
		data: dataTypes | null;
	}

	type dataType = Array<dataTypes>;
	const [data, setData] = useState<dataType>([]);
	const [modalData, setModalData] = useState<ModalData>({
		showModal: false,
		recordId: null,
		data: null,
	});

	const [name, setName] = useState("");
	const [location, setLocation] = useState("");
	const [weather, setWeather] = useState("");
	const [count, setCount] = useState("");

	useEffect(() => {
		getData(setData);
		let interval = setInterval(() => {
			getData(setData);
		}, 5000); // make a request every 5 sec to check for new logs
		return () => {
			clearInterval(interval);
		};
	}, []);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const API_URL = `http://127.0.0.1:8443/api/v1/records/?record_id=${modalData.recordId}`;

		let data = JSON.stringify({
			name: name,
			location: location,
			weather: weather,
			camper_count: parseInt(count),
		});
		try {
			let res = await fetch(API_URL, {
				method: "PATCH",
				body: data,
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
			});

			let response = await res.json();
			if (response["success"] !== true) {
				console.log(response);
				throw new Error();
			}
			alert("Record Updated!");
			resetModalData();
		} catch {
			alert(
				"An unexpected error occured while trying to create a record please try again later"
			);
		}
	};

	const getOneRecord = async (recordId: number) => {
		const API_URL = `http://127.0.0.1:8443/api/v1/records/?record_id=${recordId}&convert_timestamp=true`;
		try {
			let res = await fetch(API_URL, {
				method: "GET",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
			});
			let res_data = await res.json();
			if (res_data["success"] === false) {
				alert("error api skill issue");
			}
			return res_data["record"];
		} catch {
			alert("Failed to make a request. Please check api is up.");
		}
	};
	const resetModalData = () => {
		setModalData({ showModal: false, recordId: null, data: null });
		setName("");
		setLocation("");
		setWeather("");
		setCount("");
	};

	const editMoreCallback = async (recordId: number) => {
		resetModalData();

		let data = await getOneRecord(recordId);
		setModalData({ showModal: true, recordId, data });
		setName(data.name);
		setLocation(data.location);
		setWeather(data.weather);
		setCount(data.camper_count);
	};

	return (
		<div className="flex flex-col items-center justify-center rounded-xl overflow-hidden">
			<h1 className="text-red-500 text-4xl md:text-6xl m-10 xl:text-8xl font-bold drop-shadow-xl">
				Sunshine Adventure Camp
			</h1>

			<motion.div
				initial={{ opacity: 0, y: 200 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.5, ease: "easeInOut" }}
				className="shadow-xl rounded-3xl bg-white p-7 mb-10 pt-4 h-[36rem] "
			>
				<div className="flex items-center justify-between p-2 mb-4 ">
					<h1 className="text-[2.5rem] font-bold text-[#474747]">
						Records
					</h1>

					<div className="flex items-center">
						<a
							href="/radio-in"
							type="button"
							className="text-white bg-[#3699FF] hover:bg-[#2982da] font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
						>
							New Record
						</a>
						<a href="http://127.0.0.1:8443/api/v1/records/export?convert_timestamp=true"
							type="button"
							className="text-white bg-[#F64E60] hover:bg-[#ce3847] font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
						>
							Export Data
						</a>
					</div>
				</div>
				<div className="h-[28rem]  overflow-y-scroll">
					<table className="w-full text-sm text-left text-gray-500">
						<thead className="text-xs text-gray-700 uppercase bg-[#F3F6F9] sticky top-0">
							<tr>
								<th scope="col" className="px-6 py-3">
									Timestamp
								</th>
								<th scope="col" className="px-6 py-3">
									Name
								</th>
								<th scope="col" className="px-6 py-3">
									Camper Count
								</th>
								<th scope="col" className="px-6 py-3">
									Location
								</th>
								<th scope="col" className="px-6 py-3">
									Weather Conditions
								</th>
								<th scope="col" className="px-6 py-3">
									Action
								</th>
							</tr>
						</thead>
						<tbody>
							{data.map((record) => {
								return (
									<tr
										key={record.id}
										className="bg-white border-b hover:bg-gray-50 text-black"
									>
										<th
											scope="row"
											className="px-6 py-4 font-medium text-black whitespace-nowrap"
										>
											{new Date(
												record.timestamp
											).toLocaleString()}
										</th>
										<td className="px-6 py-4">
											{record.name}
										</td>
										<td className="px-6 py-4">
											{record.camper_count}
										</td>
										<td className="px-6 py-4">
											{record.location}
										</td>
										<td className="px-6 py-4">
											{record.weather}
										</td>
										<td className="px-6 py-4">
											<button
												onClick={() => {
													editMoreCallback(record.id);
												}}
												className="font-medium text-blue-600 hover:underline"
											>
												Edit
											</button>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			</motion.div>
			{modalData.showModal ? (
				<motion.div
					initial={{ opacity: 0, y: 200 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.5, ease: "easeInOut" }}
					className="z-10 w-[40rem] h-[30rem] bg-white absolute shadow-2xl rounded-2xl p-3"
				>
					<button onClick={resetModalData}>close</button>
					<form className="mt-6" onSubmit={handleSubmit}>
						<div className="mb-2">
							<label className="block text-sm font-semibold text-gray-800">
								Name
							</label>
							<input
								className="px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
								value={name}
								minLength={3}
								required
								onChange={(e) => setName(e.target.value)}
							/>
						</div>
						<div className="mb-2">
							<label className="block text-sm font-semibold text-gray-800">
								Location
							</label>
							<input
								className="px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
								value={location}
								minLength={3}
								required
								onChange={(e) => setLocation(e.target.value)}
							/>
						</div>
						<div className="mb-2">
							<label className="block text-sm font-semibold text-gray-800">
								Weather Conditions
							</label>
							<input
								className="px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
								value={weather}
								minLength={3}
								onChange={(e) => setWeather(e.target.value)}
								required
							/>
						</div>
						<div className="mb-2">
							<label className="block text-sm font-semibold text-gray-800">
								Camper Count
							</label>
							<input
								className="px-4 py-2 mt-2 text-indigo-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
								value={count}
								onChange={(e) => setCount(e.target.value)}
								type="number"
								min={5}
								max={10}
								required
							/>
						</div>

						<div className="mt-6">
							<button
								type="submit"
								className="px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-indigo-700 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
							>
								Update
							</button>
						</div>
					</form>
				</motion.div>
			) : (
				<></>
			)}
		</div>
	);
};

export default View;
