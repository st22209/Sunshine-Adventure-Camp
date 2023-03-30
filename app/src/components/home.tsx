const Home = () => {
	return (
		<div className="flex flex-col text-center items-center">
			<h1 className="text-red-500 text-4xl md:text-6xl  m-10 xl:text-8xl font-bold drop-shadow-xl">
				Sunshine Adventure Camp
			</h1>
			<div className="flex">
				<a
					href="/radio-in"
					className="bg-[#686DE0] hover:bg-[#5154b2] text-white font-bold py-4 px-12 m-24 rounded shadow-xl"
				>
					Radio In
				</a>
				<a
					href="/records"
					className="bg-[#686DE0] hover:bg-[#5154b2] text-white font-bold py-4 px-6 m-24 rounded shadow-xl"
				>
					View Records
				</a>
				<a
					href="/logs"
					className="bg-[#686DE0] hover:bg-[#5154b2] text-white font-bold py-4 px-6 m-24 rounded shadow-xl"
				>
					View Logs
				</a>
			</div>
		</div>
	);
};

export default Home;
