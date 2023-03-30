const BASE_URL = "http://127.0.0.1:8443/api/v1/records"

const refreshDataLoop = (setDataFunction: React.Dispatch<React.SetStateAction<any>>) => {
    getRecords().then((res_data) => setDataFunction(res_data))

    let interval = setInterval(() => {
        getRecords().then((res_data) => setDataFunction(res_data))
    }, 5000);

    return () => {
        clearInterval(interval);
    };
}

async function getRecords() {
    const API_URL = `${BASE_URL}?convert_timestamp=true`
    let response_data = {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    }
    try {
        let response = await fetch(API_URL, response_data);
        let response_json = await response.json();
        if (response_json["success"] === true) {
            return response_json["records"].reverse()
        }
        alert(`Unexpected Error Occured: ${response_json["detail"]}`);
    } catch {
        alert("API Request Failed! Please ensure that the API is running");
    }
}

async function postRecord(new_record_data: string) {
    let response_data = {
        method: "POST",
        body: new_record_data,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    }

    try {
        let response = await fetch(BASE_URL, response_data);
        let response_json = await response.json();
        if (response_json["success"] == true) {
            alert("Record Created Successfuly!");
            window.location.href = "/";
            return
        }
        alert(`Unexpected Error Occured: ${response_json["detail"]}`);
    } catch {
        alert(
            "An unexpected error occured while trying to create a record please try again later"
        );
    }
}

async function getOneRecord(recordId: number) {
    const API_URL = `${BASE_URL}/?record_id=${recordId}&convert_timestamp=true`;

    let response_data = {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    }
    try {
        let response = await fetch(API_URL, response_data);
        let response_json = await response.json();
        if (response_json["success"] === true) {
            return response_json["record"];
        }
        alert(`Unexpected Error Occured: ${response_json["detail"]}`);
    } catch {
        alert("Failed to make a request. Please check api is up.");
    }
}
async function deleteOneRecord(recordId: number) {
    const API_URL = `${BASE_URL}/?record_id=${recordId}`;
    let response_data = {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    }
    try {
        let response = await fetch(API_URL, response_data);
        let response_json = await response.json();
        alert(response_json["detail"]);
    } catch {
        alert("Failed to make a request. Please check api is up.");
    }
}
async function editOneRecord(recordId: number, data: string) {
    const API_URL = `${BASE_URL}/?record_id=${recordId}`;
    let response_data = {
        method: "PATCH",
        body: data,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    }
    try {
        let response = await fetch(API_URL, response_data);
        let response_json = await response.json();
        alert(response_json["detail"]);
    } catch {
        alert(
            "An unexpected error occured while trying to create a record please try again later"
        );
    }
}

export { refreshDataLoop, postRecord, getOneRecord, deleteOneRecord, editOneRecord }