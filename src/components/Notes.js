import React from 'react'

const Notes = ({notes,deleteNote,toggleUpdate}) => {
  return (
    <div><h2>Notes:</h2>
      {notes && notes.map(note=>{
        return <div key={note._id }>

          <h3>{note.title}</h3>

          <p>{note.body}</p>

          <button onClick={()=>{deleteNote(note._id)}}>Delete</button>

          <button onClick={()=>{toggleUpdate(note)}}>Update</button>

        </div>
    })}</div>
  )
}

export default Notes