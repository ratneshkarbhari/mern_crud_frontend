import { useState, useEffect } from "react";

import axios from "axios";

function App() {

  const [notes,setNotes] = useState(null);

  const [createForm,setCreateForm] = useState({
    title: "",
    body: ""
  })

  const [updateForm,setUpdateForm] = useState({
    id: null,
    title: "",
    body: ""
  })

  useEffect(()=>{

    fetchNotes();

    

  },[])

  const fetchNotes = async() => {
  // functions

    let res = await axios.get("http://localhost:3000/notes")

    setNotes(res.data.notes);

  }

  const updateCreateFormField = (e) => {
    const {name,value} = e.target;
    setCreateForm({...createForm,
    [name]: value})
  }

  const createNote = async(e) => {
    e.preventDefault();

    // create note
    const res = await axios.post("http://localhost:3000/notes",
      createForm
    )
    

    // update state

    setNotes([...notes,res.data.note]);


    // clear form state

    setCreateForm({
      title: "",  body : ""
    })

  }

  const deleteNote = async(_id) => {

    let res = await axios.delete(`http://localhost:3000/notes/${_id}`)

    const newNotes = [...notes].filter((note)=>{
      return note._id != _id;
    })

    setNotes(newNotes)

  }

  const updateNote = async() => {
    
  }

  const toggleUpdate = (note) => {

    setUpdateForm(note.title,note.body,note._id)

  }



  return (
    <div className="App">
      <h2>Notes:</h2>
      {notes && notes.map(note=>{
        return <div key={note._id }>

          <h3>{note.title}</h3>

          <p>{note.body}</p>

          <button onClick={()=>{deleteNote(note._id)}}>Delete</button>

          <button onClick={()=>{toggleUpdate(note)}}>Update</button>

        </div>
      })}


      <h2>Update Note</h2>

      <form onSubmit={updateNote}>

        <input  value={updateForm.title} name="title" />
        <textarea  value={updateForm.body} name="body" />
        <button type="submit">Update</button>

      </form>

      <h2>Create Note</h2>

      <form onSubmit={createNote}>

        <input onChange={updateCreateFormField} value={createForm.title} name="title" />
        <textarea onChange={updateCreateFormField} value={createForm.body} name="body" />
        <button type="submit">Create</button>

      </form>



    </div>
  );
}

export default App;
