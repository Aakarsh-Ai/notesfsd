
import React, { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

function NoteItem({ note, onDelete }) {

  const { theme } = useContext(ThemeContext);

  return (
    <div
      style={{
        padding: "10px",
        margin: "10px 0",
        border: "1px solid gray",
        backgroundColor: theme === "light" ? "white" : "#333",
        color: theme === "light" ? "black" : "white"
      }}
    >
      <span>{note.text}</span>

      <button
        onClick={() => onDelete(note.id)}
        style={{ marginLeft: "15px" }}
      >
        Delete
      </button>
    </div>
  );
}

export default NoteItem;
