const API_PATH = "/api"

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