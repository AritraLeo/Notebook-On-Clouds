import React, { useState, useContext } from 'react'
import Notes from './Notes';
import AddNote from './AddNote';



const Home = (props) => {

  const { showAlert } = props;

  return (
    <>
      <AddNote />
      <div className="my-5">
        <Notes showAlert={showAlert} />
      </div>
    </>
  )
}

export default Home