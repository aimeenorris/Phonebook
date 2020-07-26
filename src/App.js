import React, { useState, useEffect } from "react";
import axios from "axios";
import People from "./components/Person";
import Filter from "./components/Filter";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterCriteria, setFilterCriteria] = useState("");

  const hook = () => {
    console.log("effect");
    axios.get("http://localhost:3001/persons").then((response) => {
      console.log("promise fulfilled");
      setPersons(response.data);
    });
  };

  useEffect(hook, []);
  console.log("render", persons.length, "persons");

  const addPerson = (event) => {
    event.preventDefault();
    console.log("button clicked", event.target);
    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to the phonebook`);
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      };
      setPersons(persons.concat(personObject));
      setNewName("");
      setNewNumber("");
    }
    console.log(persons);
  };

  const peopleToShow =
    filterCriteria === ""
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(filterCriteria.toLowerCase())
        );

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
    console.log(`new name: ${newName}`);
  };

  const handleNumberChange = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
    console.log(`new number: ${newNumber}`);
  };

  const handleFilterChange = (event) => {
    console.log(event.target.value);
    setFilterCriteria(event.target.value);
  };

  return (
    <div>
      <h2> Phonebook </h2>
      <Filter
        filterCriteria={filterCriteria}
        handleFilterChange={handleFilterChange}
      />
      <form onSubmit={addPerson}>
        <div>
          <p>
            name: <input value={newName} onChange={handleNameChange} />
          </p>
          <p>
            number: <input value={newNumber} onChange={handleNumberChange} />
          </p>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        <People peopleToShow={peopleToShow} />
      </ul>
    </div>
  );
};

export default App;
