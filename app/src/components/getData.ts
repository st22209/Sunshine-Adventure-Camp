const getData = async (func: any) => {
    const API_URL =
        "http://127.0.0.1:8443/api/v1/records?convert_timestamp=true";
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
            return
        }
        func(res_data["records"].reverse())
    } catch {
        alert("Failed to make a request. Please check api is up.");
    }
};

export default getData