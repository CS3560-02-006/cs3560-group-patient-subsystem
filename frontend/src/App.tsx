import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { useReducer, useState } from "react";
import CreateAppointment from "./components/Appointment/CreateAppointment";
import CreatePatient from "./components/Patient/CreatePatient";
import Home from "./components/Home/Home";
import Navbar from "./components/NavBar/NavBar";
import Login from "./authentication/Login";
import SignUp from "./authentication/SignUp";
import UpdateAccount from "./authentication/UpdateAccount";
import UpdatePatient from "./components/Patient/UpdatePatient";
import UserContext from "./authentication/context";
import { initialState, reducer } from "./reducer/reducer";

// Main App component
function App() {
  // State variables for user login status and details
  const [isLoggedIn, setIsLoggedIn] = useState(
    Boolean(localStorage.getItem("auth_token"))
  );
  const [userDetails, setUserDetails] = useState({
    userID: localStorage.getItem("user_id") || "",
    email: localStorage.getItem("email") || "",
    userType: localStorage.getItem("user_type") || "",
    patientID: localStorage.getItem("patient_id") || "",
  });
  const [state, dispatch] = useReducer(reducer, initialState);

  // Function to handle login, setting local storage and updating state
  const handleLogin = (
    token: string,
    userID: string,
    email: string,
    userType: string,
    patientID: string
  ) => {
    localStorage.setItem("auth_token", token);
    localStorage.setItem("user_id", userID);
    localStorage.setItem("email", email);
    localStorage.setItem("user_type", userType);
    localStorage.setItem("patient_id", patientID);
    setIsLoggedIn(true);
    setUserDetails({ userID, email, userType, patientID });
    dispatch({
      type: "userDetails",
      payload: { userID, email, userType, patientID },
    });
  };

  // Function to handle logout by clearing local storage and updating state
  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    setIsLoggedIn(false);
  };

  // Render the App component
  return (
    <>
      <UserContext.Provider value={{ state, dispatch }}>
        <Router>
          <Navbar
            isLoggedIn={isLoggedIn}
            onLogout={handleLogout}
            userDetails={userDetails}
          />
          {isLoggedIn ? (
            <Routes>
              <Route path="/" element={<Home userDetails={userDetails} />} />
              <Route
                path="/createAppointment/"
                element={<CreateAppointment />}
              />
              <Route path="/createPatient" element={<CreatePatient />} />
              <Route
                path="/updatePatient"
                element={<UpdatePatient userDetails={userDetails} />}
              />
              <Route
                path="/updateAccount"
                element={
                  <UpdateAccount
                    onUpdate={handleLogin}
                    userDetails={userDetails}
                    onDelete={handleLogout}
                  />
                }
              />
            </Routes>
          ) : (
            <Routes>
              <Route path="/" element={<Login onLogin={handleLogin} />} />
              <Route
                path="/signup"
                element={<SignUp onSignUp={handleLogin} />}
              />
            </Routes>
          )}
        </Router>
      </UserContext.Provider>
    </>
  );
}

export default App;
