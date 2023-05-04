import { CreateAppointmentRequest } from "../types/CreateAppointmentRequest";
import { Doctor } from "../types/Doctor";
import { Patient } from "../types/Patient"
import { dateFromSQL } from "./sql";

const API_PATH = "http://localhost:8000/api"

export interface ErrorResponse {
    error: string;
}

class APIError extends Error {
    json(): ErrorResponse {
        return { error: this.message }
    }
}

const fetchAvailableDoctors = async (): Promise<Doctor[]> => {
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
    } else {
        throw new APIError("bad response: " + resp.ok);
    }
};

const fetchPatients = async (): Promise<Patient[]> => {
    const resp = await fetch('/api/patient', {
        headers: getAuthHeaders(),
    })

    if (!resp.ok) {
        throw new APIError("Unable to fetch: " + resp.ok)
    }

    return await resp.json();
}

const getAuthHeaders = () => {
    const token = localStorage.getItem('auth_token');
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
};

const submitCreateAppointment = async (id: number, req: CreateAppointmentRequest): Promise<boolean> => {
    const resp = await fetch(`${API_PATH}/appointment/${id}/`, {
        method: "PATCH",
        headers: getAuthHeaders(),
        body: JSON.stringify(req),
    })

    return resp.ok;
}

export {
    fetchAvailableDoctors,
    fetchPatients,
    getAuthHeaders,
    submitCreateAppointment,
}