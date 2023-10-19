import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL || "/"; // Use the API URL from environment variables or the relative path '/'

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
      .get(apiUrl)
      .then((respone) => {
        if (processing) {
          setNotes(respone.data);
        }
      })
      .catch((err) => console.log(err));
  };

  function addNote(newNote) {
    // Send a POST request to the server to add a new note
    axios
      .post(`${apiUrl}add-note`, newNote) // Change the endpoint as per your backend setup
      .then((response) => {
        // Handle the response from the server, which might include the newly added note
        if (response.data) {
          setNotes((prevNotes) => [...prevNotes, response.data]);
        }
      })
      .catch((error) => {
        console.error("Error adding a note:", error);
      });
  }

  function deleteNote(id) {
    // Send a DELETE request to the server to delete the note
    axios
      .delete(`http://localhost:4000/delete-note/${id}`) // Change the endpoint as per your backend setup
      .then(() => {
        setNotes((prevNotes) =>
          prevNotes.filter((noteItem) => noteItem._id !== id)
        );
      })
      .catch((error) => {
        console.error("Error deleting the note:", error);
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
