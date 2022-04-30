import { BiCalendar } from "react-icons/bi";
import Search from "./components/Search";
import AddAppointment from "./components/AddAppointment";

import appointmentList from "./data.json";
import AppointmentDetails from "./components/AppointmentDetails";

function App() {
  return (
    <div className="App container mx-auto mt-3 font-thin">
      <header className="App-header">
        <h1 className="text-5xl mb-3">
          <BiCalendar className="inline-block text-red-400 align-top" />Your Appointments
        </h1>

        <AddAppointment />

        <Search />
      </header>


      <ul className="divide-y divide-gray-200">
        {appointmentList.map(appointment => (
          <AppointmentDetails key={appointment.id} appointment={appointment} />
        ))}
      </ul>
    </div>
  );
}

export default App;
