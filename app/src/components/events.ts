import { postRecord } from "./requests"

interface NewRecord {
    name: string;
    weather: string;
    location: string;
    count: string;
}

async function handleCreateRecordFormSubmit(e: React.FormEvent<HTMLFormElement>, record_data: NewRecord) {
    e.preventDefault();

    let data = JSON.stringify({
        name: record_data.name,
        location: record_data.location,
        weather: record_data.weather,
        camper_count: parseInt(record_data.count),
    });

    postRecord(data)
};

export {
    handleCreateRecordFormSubmit
}