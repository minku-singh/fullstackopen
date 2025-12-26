const Persons = ({ persons, filterText, onDelete }) => {
  const confirmDeletion = (id, name) => {
    let confirm = window.confirm(`delete ${name}?`);

    if (confirm) {
      onDelete(id);
    }
  };

  return persons
    .filter(
      (person) =>
        person.name.includes(filterText) || person.number.includes(filterText)
    )
    .map((person) => (
      <div key={person.name}>
        <p>
          {person.name} {person.number}{" "}
          <button onClick={() => confirmDeletion(person.id, person.name)}>
            delete
          </button>
        </p>
      </div>
    ));
};

export default Persons;
