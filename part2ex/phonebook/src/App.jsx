import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import phonebookService from "./services/phonebook";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterText, setFilterText] = useState("");
  const [notification, setNotification] = useState({
    msg: "",
    type: null,
  });

  useEffect(() => {
    phonebookService.getAll().then((res) => {
      setPersons(res.data);
    });
  }, []);

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
      let confirm = window.confirm(
        `${newObject.name} is already added to the phonebook, replace the old number with new one?`
      );

      if (confirm) {
        phonebookService
          .update(existing.id, newObject)
          .then((res) => {
            const personIdx = persons.findIndex(
              (person) => person.id === existing.id
            );
            const updatedPersons = [...persons];
            updatedPersons[personIdx] = res.data;
            setPersons(updatedPersons);

            setNotification({
              msg: `Updated ${res.data.name}`,
              type: "success",
            });

            setTimeout(() => {
              setNotification(null);
            }, 2000);
          })
          .catch((error) => {
            setNotification({ msg: error.response.data.error, type: "error" });
            setTimeout(() => {
              setNotification(null);
            }, 2000);
          });
        setNewName("");
        setNewNumber("");
      }
      return;
    }

    phonebookService
      .create(newObject)
      .then((res) => {
        let updatedPersons = persons.concat(res.data);
        setPersons(updatedPersons);
        setNotification({ msg: `Added ${res.data.name}`, type: "success" });

        setTimeout(() => {
          setNotification(null);
        }, 2000);
      })
      .catch((error) => {
        setNotification({ msg: error.response.data.error, type: "error" });
        setTimeout(() => {
          setNotification(null);
        }, 2000);
      });

    setNewName("");
    setNewNumber("");
  };

  const handleFilterTextChange = (e) => {
    setFilterText(e.target.value);
  };

  const handleDelete = (id) => {
    const newPersons = persons.filter((person) => person.id !== id);
    phonebookService.deleteItem(id).then(() => {
      setPersons(newPersons);
    });
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
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
      <Persons
        persons={persons}
        filterText={filterText}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default App;
