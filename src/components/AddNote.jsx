import React, { useState } from 'react'
import Notes from './Notes';
import { useContext } from 'react';
import noteContext from '../context/notes/noteContext'


const AddNote = () => {

    const [note, setNote] = useState({ title: '', description: '', tag: 'default', status: '', dueDate: '' });
    const context = useContext(noteContext);

    const { addNote } = context;

    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag, note.status, note.dueDate);
        setNote({ title: '', description: '', tag: '', status: '', dueDate: '' });
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    }


    return (
        <div className='container my-3'>
            <div className="container my-3">
                <h1>Add Your Notes</h1>
                <form className='my-4'>
                    <div className="form-group">

                        {/* Title */}
                        <label>Title</label>
                        <input type="text" className="form-control" name='title' id="title" aria-describedby="emailHelp" placeholder="Title" value={note.title} onChange={onChange} />
                    </div>
                    {/* Desc */}
                    <div className="form-group">
                        <label>Description</label>
                        <input type="text" className="form-control" value={note.description} id="description" name='description' placeholder="Description" onChange={onChange} />
                    </div>
                    {/* Tag */}
                    <div className="form-group">
                        <label>Tag</label>
                        <input type="text" className="form-control" value={note.tag} id="tag" name='tag' placeholder="Tag" onChange={onChange} />
                    </div>
                    {/* Status */}
                    <div className="form-group">
                        <label htmlFor="status">Status</label>
                        <select
                            className="form-control"
                            value={note.status !== "" ? 'pending' : note.status}
                            id="status"
                            name="status"
                            onChange={onChange}
                        >
                            <option value="pending">Pending</option>
                            <option value="in-progress">In Progress</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>
                    {/* Due Date */}
                    <div className="form-group">
                        <label htmlFor="dueDate">Due Date</label>
                        <input type="date" className="form-control" value={note.dueDate} id="dueDate" name="dueDate" onChange={onChange} />
                    </div>

                    <button type="submit" disabled={note.title.length < 5 || note.description.length < 5} className="btn btn-primary" onClick={handleClick}>Submit</button>
                </form>
            </div>

            {/* Last div */}
        </div>
    )
}

export default AddNote