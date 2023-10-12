import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import axios from "axios";

function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    let processing = true;
    axiosFetchNotes(processing);
    return () => {
      processing = false;
    };
  }, []);

  const axiosFetchNotes = async (processing) => {
    await axios
      .get("http://localhost:4000/")
      .then((respone) => {
        if (processing) {
          setNotes(respone.data);
        }
      })
      .catch((err) => console.log(err));
  };

  function addNote(newNote) {
    setNotes((prevNotes) => {
      return [...prevNotes, newNote];
    });
  }

  function deleteNote(id) {
    setNotes((prevNotes) => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem) => {
        return (
          <Note
            key={noteItem._id} // Use _id as the unique identifier
            id={noteItem._id} // Pass _id as id prop
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
