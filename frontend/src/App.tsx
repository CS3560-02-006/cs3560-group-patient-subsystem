import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import CreateAppointment from './components/CreateAppointment';
import CreatePatient from './components/CreatePatient/CreatePatient';
import Home from './components/Home';
import Navbar from './components/NavBar/NavBar';
import Login from './authentication/Login';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(Boolean(localStorage.getItem('auth_token')));

  const handleLogin = (token: string) => {
    localStorage.setItem('auth_token', token);
    setIsLoggedIn(true);
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
            <Route path="/" element={<Home />} />
            <Route path="/createAppointment/" element={<CreateAppointment />} />
            <Route path="/createPatient" element={<CreatePatient />} />
          </Routes>
        ) : (
          <Login onLogin={handleLogin} />
        )}
      </Router>
    </>
  );
}

export default App;

