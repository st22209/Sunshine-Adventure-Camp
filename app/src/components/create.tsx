import CreateRecordForm from "./createRecordForm";

const Create = () => {
	return (
		<div className="flex flex-col text-center items-center lg:flex">
			<h1 className="text-red-500 text-4xl md:text-6xl  m-10 xl:text-8xl font-bold drop-shadow-xl">
				Sunshine Adventure Camp
			</h1>
			<CreateRecordForm />
		</div>
	);
};

export default Create;
