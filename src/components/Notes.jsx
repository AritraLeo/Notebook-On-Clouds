import React from 'react'
import { useState, useContext, useEffect, useRef } from 'react';
import noteContext from '../context/notes/noteContext'
import Noteitem from './Noteitem';


const Notes = () => {

    const context = useContext(noteContext);
    const { notes, getNotes, editNote } = context;
    const [note, setNote] = useState({ id: '', etitle: '', edescription: '', etag: 'default', estatus: '', edueDate: '' });

    const ref = useRef(null);
    const refClose = useRef(null);



    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag, estatus: currentNote.status, edueDate: currentNote.dueDate })
    }

    const handleClick = (e) => {
        e.preventDefault();
        editNote(note.id, note.etitle, note.edescription, note.etag, note.estatus, note.edueDate);
        refClose.current.click();
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    }

    useEffect(() => {
        getNotes();
    }, [])


    return (
        <>
            {/* Modal */}
            <button ref={ref} type="button" className="btn btn-primary d-none" data-toggle="modal" data-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">


                            {/* Form for update Note */}

                            <div className='container my-3'>
                                <div className="container my-3">
                                    <h1>Add Your Notes</h1>
                                    <form className='my-4'>
                                        <div className="form-group">

                                            {/* Title */}
                                            <label>Title</label>
                                            <input type="text" className="form-control" name='etitle' id="etitle" aria-describedby="emailHelp" value={note.etitle} placeholder="Title" onChange={onChange} />
                                        </div>
                                        {/* Desc */}
                                        <div className="form-group">
                                            <label>Description</label>
                                            <input type="text" className="form-control" id="edescription" name='edescription' placeholder="Description" value={note.edescription} onChange={onChange} />
                                        </div>
                                        {/* Tag */}
                                        <div className="form-group">
                                            <label>Tag</label>
                                            <input type="text" className="form-control" id="etag" name='etag' value={note.etag} placeholder="Tag" onChange={onChange} />
                                        </div>
                                        {/* Status */}
                                        <div className="form-group">
                                            <label htmlFor="estatus">Status</label>
                                            <select
                                                className="form-control"
                                                id="estatus"
                                                name="estatus"
                                                value={note.estatus}
                                                onChange={onChange}
                                            >
                                                <option value="pending">Pending</option>
                                                <option value="in-progress">In Progress</option>
                                                <option value="completed">Completed</option>
                                            </select>
                                        </div>
                                        {/* Due Date */}
                                        <div className="form-group">
                                            <label htmlFor="edueDate">Due Date</label>
                                            <input
                                                type="date"
                                                className="form-control"
                                                id="edueDate"
                                                name="edueDate"
                                                value={note.edueDate}
                                                onChange={onChange}
                                            />
                                        </div>



                                    </form>
                                </div>

                                {/* Last div */}
                            </div>
                            {/* End of form update */}
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button onClick={handleClick} disabled={note.etitle.length < 5 || note.edescription.length < 5} type="button" className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>



            {/* Notes Section */}
            <div className='row my-3'>
                <h1 className='my-5'>
                    {notes.length === 0 ? "You don't have any notes :(" : "Your Existing Notes :)"}
                </h1>
                {/* <h2>Your Existing Notes {":)"}</h2> */}
                <div className="container row my-3">

                    {
                        notes.map(
                            (note) => {
                                return <Noteitem key={note._id} updateNote={updateNote} note={note} />
                            }
                        )
                    }
                </div>

            </div>
        </>
    );
}

export default Notes