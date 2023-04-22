import { dateFromSQL } from "./sql";

const API_PATH = "http://localhost:8000/api"

const fetchAvailableDoctors = async () => {
    const resp = await fetch(API_PATH+"/doctor", {
        headers: getAuthHeaders()
    });
    if (resp.ok) {
        const json = await resp.json();
        json.forEach((doc: { appointments: any[]; }) => {
            doc.appointments = doc.appointments.map((app: { date: any; startTime: any; endTime: any; }) => (
                {
                    ...app,
                    doctor: doc,
                    startTime: dateFromSQL({ date: app.date, time: app.startTime }),
                    endTime: dateFromSQL({ date: app.date, time: app.endTime }),
                }
            ))
        })

        return json;
    }

    return {
        "error": "Unable to fetch doctors",
    };
};

const getAuthHeaders = () => {
    const token = localStorage.getItem('auth_token');
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
  };

export {
    fetchAvailableDoctors,
    getAuthHeaders,
}