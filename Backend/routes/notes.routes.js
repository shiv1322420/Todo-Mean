const express = require('express');
const router = express.Router();
const noteController = require('../controllers/notes.controller');
const noteValidator = require('../validations/notes.validation');

// Route to get all notes
router.get('/notes', noteController.getAllNotes);

// Route to search notes by title
router.get('/notes/search', noteValidator.validateGetNoteByTitle, noteController.getNoteByTitle);

// Route to get a note by Id with validation
router.get('/notes/:id', noteValidator.validateNoteById, noteController.getNoteById);

// Route to update a note by Id with validation
router.put('/notes/:id', noteValidator.validateUpdateNote, noteController.updateNote);

// Route to delete a note by Id with validation
router.delete('/notes/:id', noteValidator.validateNoteById, noteController.deleteNote);

// Route to create a new note with validation
router.post('/notes', noteValidator.validateCreateNote, noteController.createNote);

module.exports = router;
