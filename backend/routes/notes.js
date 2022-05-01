const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');


// Route - 1: Fetch all the notes: 

router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes);
        
    } catch (error) {
        console.error(error);
        res.status(500).json('Some Error occured...');
    }
});




// Route - 2: Add  notes:

router.post('/addnote', fetchuser, [
    // Name must be of 3 chars
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    // Email must be an email
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 }),

], async (req, res) => {

    try {
        
        const { title, description, tag } = req.body;
        // Check for errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
    
        // const notes = await Notes.find({ user: req.user.id });
    
        const note = new Note({
            title, description, tag, user: req.user.id
        });
        const savedNote = await note.save();
        
        res.json(savedNote);
    } catch (error) {
        console.error(error);
        res.status(500).json('Some Error occured...');
    }
});



// Route - 3: Update an existing note:

router.put('/updatenote/:id', fetchuser, 
    async (req, res) => {

    try {
        const { title, description, tag } = req.body;
        // New Note object
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };
        
        // Finding the Note to be updated and updating it by Id:
        let note = await Note.findById(req.params.id);
        if (!note)
            return res.status(404).send('Not found!');
        
        if (note.user.toString() !== req.user.id)
            return res.status(401).send('Not allowed to violate server');
        
        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json(note);

    } catch (error) {
        console.error(error);
        res.status(500).json('Some Error occured...');
    }

});



// Route - 4: Delete an existing note:
router.delete('/deletenote/:id', fetchuser, 
    async (req, res) => {

    try {
        
        // Finding the Note to be deleted and delete it by Id:
        let note = await Note.findById(req.params.id);
        if (!note)
            return res.status(404).send('Not found!');
        
        if (note.user.toString() !== req.user.id)
            return res.status(401).send('Not allowed to violate server');
        
        note = await Note.findByIdAndDelete(req.params.id);
        res.json({'Success': 'Note has been deleted', note: note});

    } catch (error) {
        console.error(error);
        res.status(500).json('Some Error occured...');
    }

});




module.exports = router;