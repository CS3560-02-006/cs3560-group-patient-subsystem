import { createContext } from "react";
import { initialState, ACTION_TYPE } from "../reducer/reducer";

type UserContextType = {
    state: typeof initialState,
    dispatch: React.Dispatch<ACTION_TYPE>,
}
const UserContext = createContext<UserContextType | null>(null);

export default UserContext