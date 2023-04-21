import {useState} from 'react'
import {Link} from 'react-router-dom'
import './nav.css'



const NavBar = () => {
  const [user, setUser] = useState(null)

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
          <Link to=''>Update Account</Link>
          <Link to=''>Delete Account</Link>
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