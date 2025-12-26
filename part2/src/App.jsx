import { useState, useEffect } from "react";
import Note from "./components/Note";
import noteService from "./services/notes";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    noteService.getAll().then((res) => {
      setNotes(res.data);
    });
  }, []);

  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
    };

    noteService.create(noteObject).then((res) => {
      const updatedNotes = notes.concat(res.data);
      setNotes(updatedNotes);
    });

    setNewNote("");
  };

  const handleNoteChange = (e) => {
    setNewNote(e.target.value);
  };

  const toggleImportanceOf = (id) => {
    console.log("importance of " + id + " needs to be toggled");
    const note = notes.find((note) => note.id === id);

    const updatedNote = { ...note, important: !note.important };

    noteService
      .update(id, updatedNote)
      .then((res) => {
        const noteIdx = notes.findIndex((note) => note.id === id);
        const updatedNotes = [...notes];
        updatedNotes[noteIdx] = res.data;
        setNotes(updatedNotes);
      })
      .catch((error) => {
        alert(`the note '${note.content}' was already deleted from server`);
        setNotes(notes.filter((n) => n.id !== id));
      });
  };

  const notesToShow = showAll
    ? notes
    : notes.filter((note) => note.important === true);

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input onChange={handleNoteChange} type="text" value={newNote} />
        <button type="submit">save</button>
      </form>
    </div>
  );
};

export default App;
