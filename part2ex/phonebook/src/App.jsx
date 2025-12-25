import { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterText, setFilterText] = useState("");

  const handleNewNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNewNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    let newObject = {
      name: newName,
      number: newNumber,
    };

    const existing = persons.find(
      (p) => p.name.toLowerCase() === newObject.name.toLowerCase()
    );

    if (existing) {
      alert(`${newObject.name} is already added to the phonebook!`);
      return;
    }

    let updatedPersons = persons.concat(newObject);

    setPersons(updatedPersons);
    setNewName("");
    setNewNumber("");
  };

  const handleFilterTextChange = (e) => {
    setFilterText(e.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter text={filterText} onChange={handleFilterTextChange} />
      <h2>Add a new</h2>
      <PersonForm
        handleSubmit={handleFormSubmit}
        handleNameChange={handleNewNameChange}
        name={newName}
        handleNumberChange={handleNewNumberChange}
        number={newNumber}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} filterText={filterText} />
    </div>
  );
};

export default App;
