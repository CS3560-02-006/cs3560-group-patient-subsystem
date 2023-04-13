import {HashRouter as Router, Route, Routes} from "react-router-dom"
import CreateAppointment from './components/CreateAppointment';
import CreatePatient from './components/CreatePatient';
import Home from "./components/Home";
import Navbar from "./components/NavBar";

function App() {
  return (<>
    <Navbar/>
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />}/>
        <Route exact path="/createAppointment/" element={<CreateAppointment />}/>
        <Route exact path="/createPatient" element={<CreatePatient />}/>
      </Routes>
    </Router>
    </>
  );
}

export default App;

