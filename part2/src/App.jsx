import { useState, useEffect } from "react";
import Note from "./components/Note";
import noteService from "./services/notes";
import Notification from "./components/Notification";
import Footer from "./components/Footer";

const App = () => {
  const [notes, setNotes] = useState(null);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState("some error happened...");

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
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
        setNotes(notes.filter((n) => n.id !== id));
      });
  };

  if (!notes) {
    return;
  }

  const notesToShow = showAll
    ? notes
    : notes.filter((note) => note.important === true);

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
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
      <Footer />
    </div>
  );
};

export default App;
