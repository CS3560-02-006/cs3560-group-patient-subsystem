import { UserDetails } from "../types/UserDetails";

export const initialState: { userDetails: UserDetails} = {
    userDetails: {
        userID: localStorage.getItem('user_id') || '',
        email: localStorage.getItem('email') || '',
        userType: localStorage.getItem('user_type') || '',
        patientID: localStorage.getItem('patient_id') || '',
    }
}

export type ACTION_TYPE =
    | { type: "userDetails"; payload: UserDetails }

export const reducer = (state: typeof initialState, action: ACTION_TYPE) => {
    switch (action.type) {
        case "userDetails":
            return { ...state, userDetails: action.payload, }
    }
}