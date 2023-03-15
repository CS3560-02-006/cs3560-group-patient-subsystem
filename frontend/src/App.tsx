import {HashRouter as Router, Route, Routes} from "react-router-dom"
import CreateAppointment from './components/CreateAppointment';
import CreatePatient from './components/CreatePatient';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CreateAppointment />}/>
      </Routes>
    </Router>
  );
}

export default App;

