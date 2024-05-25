import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {

    const host = 'http://localhost:5000';

    const noteInitial = [];
    const [notes, setNotes] = useState(noteInitial);


    // Get all the notes
    const getNotes = async () => {

        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI2NGNkMjk5YmU3YzM0ODQ1MTE1MTQ4In0sImlhdCI6MTY1MDc3MzU2MX0.eY0DQm32--ct4KPM3ypvgWtz5Nig6dS_6mm5fqVs0aU'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            }
        });
        const json = await response.json();
        console.log(json);
        setNotes(json);
    }



    // Add
    const addNote = async (title, description, tag, status, dueDate) => {

        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI2NGNkMjk5YmU3YzM0ODQ1MTE1MTQ4In0sImlhdCI6MTY1MDc3MzU2MX0.eY0DQm32--ct4KPM3ypvgWtz5Nig6dS_6mm5fqVs0aU'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({ title, description, tag, status, dueDate }) // body data type must match "Content-Type" header
        });
        const note = await response.json();

        setNotes(notes.concat(note));
    }



    // Delete
    const deleteNote = async (id) => {

        // API CALL:
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI2NGNkMjk5YmU3YzM0ODQ1MTE1MTQ4In0sImlhdCI6MTY1MDc3MzU2MX0.eY0DQm32--ct4KPM3ypvgWtz5Nig6dS_6mm5fqVs0aU'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            }
        });
        const json = await response.json();

        // Logic - 
        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes);
    }

    // Edit
    const editNote = async (id, title, description, tag, status, dueDate) => {
        //  Api call :

        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI2NGNkMjk5YmU3YzM0ODQ1MTE1MTQ4In0sImlhdCI6MTY1MDc3MzU2MX0.eY0DQm32--ct4KPM3ypvgWtz5Nig6dS_6mm5fqVs0aU'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({ title, description, tag, status, dueDate }) // body data type must match "Content-Type" header
        });
        const json = await response.json();   // parses JSON response into native JavaScript objects


        let newNotes = JSON.parse(JSON.stringify(notes));
        // Changes - 
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                newNotes[index].status = status;
                newNotes[index].dueDate = dueDate;
                break;
            }
        }
        setNotes(newNotes);

    }


    return (
        <NoteContext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;
