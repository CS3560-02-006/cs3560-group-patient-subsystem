import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import CreateAppointment from './components/CreateAppointment';
import CreatePatient from './components/CreatePatient/CreatePatient';
import Home from './components/Home/Home';
import Navbar from './components/NavBar/NavBar';
import Login from './authentication/Login';
import SignUp from './authentication/SignUp';
import UpdateAccount from './authentication/UpdateAccount';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(Boolean(localStorage.getItem('auth_token')));
  const [userDetails, setUserDetails] = useState({
    userID: localStorage.getItem('user_id') || '',
    email: localStorage.getItem('email') || '',
    userType: localStorage.getItem('user_type') || '',
    patientID: localStorage.getItem('patient_id') || '',
  });
  

  const handleLogin = (token: string, userID: string, email: string, userType: string, patientID: string) => {
    localStorage.setItem('auth_token', token);
    localStorage.setItem('user_id', userID);
    localStorage.setItem('email', email);
    localStorage.setItem('user_type', userType);
    localStorage.setItem('patient_id', patientID);
    setIsLoggedIn(true);
    setUserDetails({ userID, email, userType, patientID });
  };

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    setIsLoggedIn(false);
  };

  return (
    <>
      <Router>
        <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout}/>
        {isLoggedIn ? (
          <Routes>
            <Route path="/" element={<Home userDetails={userDetails}/>} />
            <Route path="/createAppointment/" element={<CreateAppointment />} />
            <Route path="/createPatient" element={<CreatePatient />} />
            <Route path="/updateAccount" element={<UpdateAccount onUpdate={handleLogin} userDetails={userDetails} onDelete={handleLogout} />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/" element = {<Login onLogin={handleLogin}/>} />
            <Route path="/signup" element = {<SignUp onSignUp={handleLogin}/>} />
          </Routes>
        )}
      </Router>
    </>
  );
}

export default App;

