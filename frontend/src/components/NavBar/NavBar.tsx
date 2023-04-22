import {useState} from 'react'
import {Link} from 'react-router-dom'
import './nav.css'

interface Props {
  isLoggedIn: boolean;
  onLogout: () => void;
}

const NavBar: React.FC<Props> = ({ isLoggedIn, onLogout }) => {
  return<>
    <div className='banner'>
      <h1><Link to='/'>Appointment Scheduler</Link></h1>
    </div>   
    <div className="navbar">
      <div className="dropdown">
        <button className="dropbtn">Appointment
          <i className="fa fa-caret-down"></i>
        </button>
        <div className="dropdown-content">
          <Link to='/createAppointment'>Create Appointment</Link>
          <Link to=''>Cancel Appointment</Link>
          <Link to=''>Update Appointment</Link>
        </div>
      </div>
      <div className="dropdown">
        <button className="dropbtn">Account
          <i className="fa fa-caret-down"></i>
        </button>
        <div className="dropdown-content">
        {isLoggedIn ? (
            <div className="dropdown-content">
              <Link to=''>Update Account</Link>
              <div className="logout-link" onClick={onLogout}>Logout</div>
            </div>
          ) : (
            <div className="dropdown-content">
              <Link to=''>Login</Link>
              <Link to=''>Signup</Link>
            </div>
          )}
        </div>
      </div>
      <div className="dropdown">
        <button className="dropbtn">Patient
          <i className="fa fa-caret-down"></i>
        </button>
        <div className="dropdown-content">
          <Link to='/createPatient'>Create Patient</Link>
          <Link to=''>Update Patient</Link>
        </div>
      </div>

    </div> 
  </>
}

export default NavBar