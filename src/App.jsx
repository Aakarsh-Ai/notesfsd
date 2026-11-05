
import React, {
  useState,
  useEffect,
  useContext
} from "react";

import { ThemeContext, ThemeProvider } from "./ThemeContext";
import NoteItem from "./NoteItem";

// Theme toggle component
function ThemeToggle() {

  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button onClick={toggleTheme}>
      Switch to {theme === "light" ? "Dark" : "Light"} Mode
    </button>
  );
}

// Main notes component
function NotesApp() {

  const { theme } = useContext(ThemeContext);

  const [text, setText] = useState("");

  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem("notes");
    return savedNotes ? JSON.parse(savedNotes) : [];
  });

  // Save notes and update browser tab title
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));

    document.title = `Notes (${notes.length})`;

  }, [notes]);

  // Add note
  const addNote = () => {

    const value = text.trim();

    if (value === "") {
      return;
    }

    const newNote = {
      id: Date.now(),
      text: value
    };

    setNotes([...notes, newNote]);

    setText("");
  };

  // Delete note
  const deleteNote = (id) => {

    setNotes(
      notes.filter((note) => note.id !== id)
    );

  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "20px",
        backgroundColor: theme === "light" ? "#f5f5f5" : "#222",
        color: theme === "light" ? "#222" : "white"
      }}
    >

      <h1>Notes App</h1>

      <ThemeToggle />

      <br />
      <br />

      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter your note"
      />

      <button onClick={addNote}>
        Add Note
      </button>

      <h3>Notes ({notes.length})</h3>

      {notes.length === 0 ? (

        <p>No notes yet</p>

      ) : (

        notes.map((note) => (
          <NoteItem
            key={note.id}
            note={note}
            onDelete={deleteNote}
          />
        ))

      )}

    </div>
  );
}

// Wrap application with ThemeProvider
function App() {
  return (
    <ThemeProvider>
      <NotesApp />
    </ThemeProvider>
  );
}

export default App;
