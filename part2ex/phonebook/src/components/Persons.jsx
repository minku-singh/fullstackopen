const Persons = ({ persons, filterText }) => {
  return persons
    .filter(
      (person) =>
        person.name.includes(filterText) || person.number.includes(filterText)
    )
    .map((person) => (
      <div key={person.name}>
        <p key={person.name}>
          {person.name} {person.number}
        </p>
      </div>
    ));
};

export default Persons;
