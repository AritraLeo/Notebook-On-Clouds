import React from 'react'
import { useContext } from 'react';
import noteContext from '../context/notes/noteContext'

const Noteitem = (props) => {

    const context = useContext(noteContext);

    const { deleteNote } = context;
    // const { notes } = props;

    const { note, updateNote } = props;

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };
    return (
        <div className='col-md-3'>

            <div className="card my-3">

                <div className="card-body">
                    <div className="d-flex align-items-center">
                        {/* Title and edit delete buttons */}
                        <h5 className="card-title" style={{ color: 'blue' }} > {note.title}</h5>&nbsp;
                        <i className="bi bi-pencil-square  mx-2" onClick={() => { updateNote(note); }}></i>&nbsp;
                        <i className="bi bi-trash3-fill  mx-2" onClick={() => { deleteNote(note._id); }}></i>
                    </div>
                    {/* Desc and tag */}
                    <h5 className="card-text">Desription - {note.description}</h5>
                    <h5 className="card-text" style={{ color: 'green' }}>Status - {note.status}</h5>
                    <h5 className="card-text" style={{ color: 'red' }}>
                        Due Date - {formatDate(note.dueDate)}
                    </h5>
                    <h5 className="card-tag">Tag - {note.tag}</h5>
                    <br />
                </div>
            </div>

        </div>
    )
}

export default Noteitem