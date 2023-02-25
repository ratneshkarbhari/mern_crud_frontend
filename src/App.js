import { useState, useEffect } from "react";

import axios from "axios";

function App() {

  const [notes,setNotes] = useState(null);

  useEffect(()=>{

    fetchNotes();

    

  },[])

  const fetchNotes = async() => {

    let res = await axios.get("http://localhost:3000/notes")

    setNotes(res.data.notes);



    console.log(res)

  }

  return (
    <div className="App">
      <h2>Notes:</h2>
      {notes && notes.map(note=>{
        return <div key={note._id }>

          <h3>{note.title}</h3>

        </div>
      })}
    </div>
  );
}

export default App;
