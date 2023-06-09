import {
	refreshDataLoop,
	getOneRecord,
	editOneRecord,
	deleteOneRecord,
} from "./requests";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const View = () => {
	interface Record {
		id: number;
		name: string;
		weather: string;
		location: string;
		timestamp: number;
		camper_count: number;
	}

	type recordList = Array<Record>;

	interface ModalData {
		showModal: boolean;
		recordId: number | null;
		data: Record | null;
	}

	const [data, setData] = useState<recordList>([]);
	const [modalData, setModalData] = useState<ModalData>({
		showModal: false,
		recordId: null,
		data: null,
	});

	const [name, setName] = useState("");
	const [location, setLocation] = useState("");
	const [weather, setWeather] = useState("");
	const [count, setCount] = useState("");

	useEffect(() => refreshDataLoop(setData), []);

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		let data = JSON.stringify({
			name: name,
			location: location,
			weather: weather,
			camper_count: parseInt(count),
		});
		if (modalData.recordId) {
			editOneRecord(modalData.recordId, data);
		}

		resetModalData();
	}

	async function deleteRecord(recordId: number) {
		if (!window.confirm("Are you sure you want to delete this?")) {
			return alert("Record Deletion Canceled");
		}
		deleteOneRecord(recordId);
	}

	async function resetModalData() {
		setModalData({ showModal: false, recordId: null, data: null });

		setName("");
		setLocation("");
		setWeather("");
		setCount("");
	}

	async function editMoreCallback(recordId: number) {
		let data = await getOneRecord(recordId);

		resetModalData();

		setModalData({ showModal: true, recordId, data });
		setName(data.name);
		setLocation(data.location);
		setWeather(data.weather);
		setCount(data.camper_count);
	}

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
						<a
							href="http://127.0.0.1:8443/api/v1/records/export?convert_timestamp=true"
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
								<th scope="col" className="px-6 py-3"></th>
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
											).toLocaleString("en-NZ")}
										</th>
										<td className="px-6 py-4">
											{record.name.length < 70
												? record.name
												: `${record.name.slice(
														0,
														70
												  )}...`}
										</td>
										<td className="px-6 py-4">
											{record.camper_count}
										</td>
										<td className="px-6 py-4">
											{record.location.length < 70
												? record.location
												: `${record.location.slice(
														0,
														70
												  )}...`}
										</td>
										<td className="px-6 py-4">
											{record.weather.length < 70
												? record.weather
												: `${record.weather.slice(
														0,
														70
												  )}...`}
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
										<td>
											<button
												onClick={() => {
													deleteRecord(record.id);
												}}
												type="button"
												className="text-white bg-[#F64E60] hover:bg-[#ce3847] font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
											>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width="16"
													height="16"
													fill="currentColor"
													viewBox="0 0 16 16"
												>
													{" "}
													<path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />{" "}
													<path
														fill-rule="evenodd"
														d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
													/>{" "}
												</svg>
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
