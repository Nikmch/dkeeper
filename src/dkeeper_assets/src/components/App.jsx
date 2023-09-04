import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import { dkeeper } from "../../../declarations/dkeeper";
import { v4 as uuidv4 } from 'uuid';


function App() {
  const [notes, setNotes] = useState([]);

  function addNote(newNote) {
    const noteId = uuidv4(); 
    newNote.id = noteId;
    setNotes(prevNotes => {
      dkeeper.createNote(newNote.id, newNote.title, newNote.content)
      return [newNote, ...prevNotes];
    });
  }

  useEffect(() => {
    console.log("useEffect triggered")
    fetchData();
  }, [] );

  async function fetchData(){
    const notesArray = await dkeeper.readNotes();
    setNotes(notesArray);
  }

  function deleteNote(id) {
    dkeeper.removeNote(id);
    setNotes(prevNotes => {
      return prevNotes.filter((noteItem) => {
        return noteItem.id !== id;
      });
    });
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={noteItem.id}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
