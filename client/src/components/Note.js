import React from "react";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";

function Note(props) {
  function handleClick() {
    props.onDelete(props.id);
  }

  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <button onClick={handleClick}>
        <DeleteTwoToneIcon />
      </button>
    </div>
  );
}

export default Note;

// import React, { useState, useEffect } from "react";
// import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
// import axios from "axios"; // Import Axios

// function Note(props) {
//   const [notes, setNotes] = useState([]); // State to store the notes

//   // Function to fetch notes from the server
//   const fetchNotes = async () => {
//     try {
//       const response = await axios.get("http://localhost:4000/notes"); // Assuming your API endpoint is "/"
//       setNotes(response.data); // Set the retrieved notes in state
//     } catch (error) {
//       console.error("Error fetching notes:", error);
//     }
//   };

//   // Call the fetchNotes function when the component mounts
//   useEffect(() => {
//     fetchNotes();
//   }, []);

//   function handleClick() {
//     props.onDelete(props.id);
//   }

//   return (
//     <div>
//       {/* Map through the notes and render each one */}
//       {notes.map((note) => (
//         <div className="note" key={note._id}>
//           <h1>{note.title}</h1>
//           <p>{note.content}</p>
//           <button onClick={handleClick}>
//             <DeleteTwoToneIcon />
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default Note;
