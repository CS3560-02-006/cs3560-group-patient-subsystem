const API_PATH = "http://backend:8000"

const fetchAvailableDoctors = async () => {
    const resp = await fetch(API_PATH+"/doctor");
    if (resp.ok) {
        return await resp.json();
    }

    return {
        "error": "Unable to fetch doctors",
    };
};

export {
    fetchAvailableDoctors,
}