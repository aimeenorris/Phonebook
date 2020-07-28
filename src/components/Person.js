import React from "react";
import Button from "./Button";

const People = ({ peopleToShow, onDelete }) => {
  return (
    <div>
      {peopleToShow.map((person) => (
        <Person
          key={person.id}
          person={person}
          onDelete={() => onDelete(person.id, person.name)}
        />
      ))}
    </div>
  );
};

const Person = ({ person, onDelete }) => {
  return (
    <li key={person.id}>
      {person.name} {person.number} {"  "}
      <Button onClick={onDelete} text="Delete" />
    </li>
  );
};

export default People;
