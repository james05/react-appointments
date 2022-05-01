import { useState, useEffect, useCallback } from "react";
import { BiCalendar } from "react-icons/bi";
import Search from "./components/Search";
import AddAppointment from "./components/AddAppointment";

import AppointmentDetails from "./components/AppointmentDetails";


function App() {
  let [appointmentList, setAppointmentList] = useState([]);
  let [query, setQuery] = useState("");
  let [sortBy, setSortBy] = useState("petName");
  let [orderDir, setOrderDir] = useState("asc");

  const filteredAppointments = appointmentList.filter(
    item => {
      return (
        item.petName.toLowerCase().includes(query.toLowerCase())
        || item.ownerName.toLowerCase().includes(query.toLowerCase())
        || item.aptNotes.toLowerCase().includes(query.toLowerCase())
      );
    }
  ).sort((a, b) => {
    let order = orderDir === 'asc' ? 1 : -1;

    return a[sortBy].toLowerCase() < b[sortBy].toLowerCase()
      ?  -1 * order : 1 * order;
  }
  );

  const fetchData = useCallback(() => {
    fetch('./data.json')
    .then(response => response.json())
    .then(data => {
      setAppointmentList(data);
    });
  }, []);


  useEffect(() => {
    fetchData()
  }, [fetchData]);

  const saveAppointment = function(appointment) {
    let appointments = appointmentList.concat(appointment);

    setAppointmentList(appointments);
  };

  return (
    <div className="App container mx-auto mt-3 font-thin">
      <header className="App-header">
        <h1 className="text-5xl mb-3">
          <BiCalendar className="inline-block text-red-400 align-top" />Your Appointments
        </h1>

        <AddAppointment saveAppointment={saveAppointment} />

        <Search query={query}
                onQueryChange={(query) => setQuery(query)}
                sortBy={sortBy}
                onSortByChange={(sort) => setSortBy(sort)}
                orderDir={orderDir}
                onSortOrderChange={(sortOrder) => setOrderDir(sortOrder)} />
      </header>


      <ul className="divide-y divide-gray-200">
        {filteredAppointments.map(appointment => (
          <AppointmentDetails key={appointment.id} 
                              appointment={appointment}
                              onDeleteAppointment={
                                appointmentId => setAppointmentList(
                                  appointmentList.filter(appointment => appointment.id !== appointmentId)
                                )
                              } />
        ))}
      </ul>
    </div>
  );
}

export default App;
