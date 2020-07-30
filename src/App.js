import React, { useState, useEffect } from "react";
import People from "./components/Person";
import Filter from "./components/Filter";
import { ErrorNotification, InfoNotification } from "./components/Notification";
import phonebookService from "./services/phonebook";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [infoMessage, setInfoMessage] = useState(null);
  const [filterCriteria, setFilterCriteria] = useState("");

  const hook = () => {
    console.log("effect");
    phonebookService.getAll().then((persons) => {
      console.log("promise fulfilled");
      setPersons(persons);
    });
  };

  useEffect(hook, []);
  console.log("render", persons.length, "persons");

  const addPerson = (event) => {
    event.preventDefault();
    console.log("button clicked", event.target);
    if (persons.some((person) => person.name === newName)) {
      if (
        window.confirm(
          `${newName} is already added to the phonebook, replace the old number with a new one?`
        ) === true
      ) {
        const foundPerson = persons.find((n) => n.name === newName);
        const changedPerson = { ...foundPerson, number: newNumber };

        phonebookService
          .update(changedPerson.id, changedPerson)
          .then((returnedPerson) => {
            console.log("updated person");
            setPersons(
              persons.map((person) =>
                person.name !== newName ? person : returnedPerson
              )
            );
            setInfoMessage(`Changed ${returnedPerson.name}'s number`);
            setTimeout(() => {
              setInfoMessage(null);
            }, 5000);
            setNewName("");
            setNewNumber("");
          })
          .catch((error) => {
            setErrorMessage(
              `Information of ${changedPerson.name}' has already been removed from the server`
            );
            setNewName("");
            setNewNumber("");
            setTimeout(() => {
              setErrorMessage(null);
            }, 5000);
          });
      } else {
        setNewName("");
        setNewNumber("");
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      };
      phonebookService
        .create(personObject)
        .then((person) => {
          console.log("added person");
          setPersons(persons.concat(personObject));
          setInfoMessage(`Added ${personObject.name}`);
          setTimeout(() => {
            setInfoMessage(null);
          }, 5000);
          setNewName("");
          setNewNumber("");
        })
        .catch((error) => {
          setErrorMessage(`Error creating ${personObject.name}`);
          setNewName("");
          setNewNumber("");
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
        });
    }
    console.log(persons);
  };

  const deletePerson = (id, name) => {
    console.log(persons);
    console.log(`button clicked for ${name}`);
    if (window.confirm(`Delete ${name} ?`) === true) {
      phonebookService
        .remove(id)
        .then((request) => {
          console.log("deleted person");
          setPersons(persons.filter((n) => n.id !== id));
          setInfoMessage(`Deleted ${name}`);
          setTimeout(() => {
            setInfoMessage(null);
          }, 5000);
        })
        .catch((error) => {
          setErrorMessage(`Error deleting`);
          setNewName("");
          setNewNumber("");
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
        });
    } else {
      console.log("Delete canceled");
    }
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
      <ErrorNotification message={errorMessage} />
      <InfoNotification message={infoMessage} />
      <Filter
        filterCriteria={filterCriteria}
        handleFilterChange={handleFilterChange}
      />
      <h2> Add a New Number</h2>
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
          <button type="submit">Add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        <People peopleToShow={peopleToShow} onDelete={deletePerson} />
      </ul>
    </div>
  );
};

export default App;
