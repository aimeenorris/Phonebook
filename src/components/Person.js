import React from "react";

const People = ({ peopleToShow }) => {
  return (
    <div>
      {peopleToShow.map((person) => (
        <Person key={person.id} person={person} />
      ))}
    </div>
  );
};

const Person = ({ person }) => {
  return (
    <li key={person.id}>
      {person.name} {person.number}
    </li>
  );
};

export default People;
