

const router = require('express').Router();
const verify = require('../middlewares/verifyUserToken.middleware');

const addNote = require('../actions/todolist/addNote.action');
const deleteNote = require('../actions/todolist/deleteNote.action');
const editNote = require('../actions/todolist/editNote.action');
const viewNote = require('../actions/todolist/viewNote.action');
const viewNotes = require('../actions/todolist/viewNotes.action');


router
    .route("/")
    .get( (req, res, next) => {
        res.status(200).json('hello');
    })

router
    .route("/:user_id")
    .get(verify, viewNotes)
    .post( verify, addNote)
    .put( verify, editNote)
    .delete( verify, deleteNote);


module.exports = router;
