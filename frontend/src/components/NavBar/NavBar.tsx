import { Link } from "react-router-dom";
import "./nav.css";
import { UserDetails } from "../../types/UserDetails";

interface Props {
  isLoggedIn: boolean;
  onLogout: () => void;
  userDetails: UserDetails;
}

const NavBar: React.FC<Props> = ({ isLoggedIn, onLogout, userDetails }) => {
  return (
    <>
      <div className="banner">
        <h1>
          <Link to="/">Appointment Scheduler</Link>
        </h1>
      </div>
      <div className="navbar">
        <div className="dropdown">
          <Link to="/" className="dropbtn">
            Home
          </Link>
        </div>
        {isLoggedIn ? (
          <>
            <div className="dropdown">
              <button className="dropbtn">
                Appointment
                <i className="fa fa-caret-down"></i>
              </button>
              <div className="dropdown-content">
                <Link to="/createAppointment">Create Appointment</Link>
                <Link to="">Update / Cancel</Link>
              </div>
            </div>
            <div className="dropdown">
              <button className="dropbtn">
                Patient
                <i className="fa fa-caret-down"></i>
              </button>
              <div className="dropdown-content">
                {userDetails.userType === "clerk" && (
                  <Link to="/createPatient">Create Patient Record</Link>
                )}
                <Link to="/updatePatient">Update Patient Record</Link>
              </div>
            </div>
          </>
        ) : null}
        <div className="dropdown">
          <button className="dropbtn">
            Account
            <i className="fa fa-caret-down"></i>
          </button>
          <div className="dropdown-content">
            {isLoggedIn ? (
              <div className="dropdown-content">
                <Link to="/updateAccount">Update Account</Link>
                <Link to="" onClick={onLogout}>Logout</Link>
              </div>
            ) : (
              <div className="dropdown-content">
                <Link to="/">Login</Link>
                <Link to="/signup">Signup</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;