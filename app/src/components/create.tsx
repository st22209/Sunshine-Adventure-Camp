import { useState } from "react";

const Create = () => {
	const API_URL = "http://127.0.0.1:8443/api/v1/records/";

	const [name, setName] = useState("");
	const [location, setLocation] = useState("");
	const [weather, setWeather] = useState("");
	const [count, setCount] = useState("");

	let handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		let data = JSON.stringify({
			name: name,
			location: location,
			weather: weather,
			camper_count: parseInt(count),
		});
		try {
			let res = await fetch(API_URL, {
				method: "POST",
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
			alert("Record Created Successfuly!");
			window.location.href = '/';
		} catch {
			alert(
				"An unexpected error occured while trying to create a record please try again later"
			);
		}
	};

	return (
		<div className="flex flex-col text-center items-center lg:flex">
			<h1 className="text-red-500 text-4xl md:text-6xl  m-10 xl:text-8xl font-bold drop-shadow-xl">
				Sunshine Adventure Camp
			</h1>
			<div className="bg-white w-[70%] h-[35rem] rounded-xl shadow-lg">
				<h1 className="mt-10 text-3xl font-bold text-purple-700">Create Record</h1>
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
							Radio In Data!
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Create;
