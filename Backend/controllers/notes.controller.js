const noteService = require('../services/notes.service');

const createNote = async (req, res) => {
    try {
        const noteData = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status
        };
        // save data in db;
        const newNote = await noteService.createNote(noteData);
        res.status(201).json({ message: 'Note created successfully', noteData: newNote });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const updateNote = async (req, res) => {
    try {
        const { id } = req.params;
        const note = await noteService.getNoteById(id);
        if (note) {
             const {title, description, status} = req.body;

            let payload = {};
            if (title) payload.title = title ;
            if (description) payload.description = description;
            if (status) payload.status = status;
    
            //updating in db
            let updatedNote = await noteService.updateNote(id, payload);
            console.log("updatedNote",updateNote);
            if (updatedNote) {
                res.status(200).json({ message: 'Note updated successfully', note: updatedNote });
            } else {
                res.status(404).json({ error: 'Note not found' });
            }
        } else {
            res.status(404).json({ error: 'Note not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const deleteNote = async (req, res) => {
    try {
        const { id } = req.params;
        const note = await noteService.getNoteById(id);
        if (note) {
            
            //delete from db
            let deletedNote = await noteService.deleteNote(id);
            if (deletedNote) {
                res.status(204).json({ message: 'Note deleted successfully' });
            } else {
                res.status(404).json({ error: 'Note not found' });
            }
        } else {
            res.status(404).json({ error: 'Note not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getAllNotes = async (req, res) => {
    try {
      const notes = await noteService.getAllNote();
      if(notes && notes.length == 0)
      res.status(404).json({ error: 'Note not found, Please add new one' });
      else
      res.status(200).json({ message: 'Notes retrieved successfully', notes });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getNoteById =  async (req, res)=>{
    try {
        const { id } = req.params;
        const note =await noteService.getNoteById(id);
        console.log("note",note);
        if(note){
            res.status(200).json({ message: 'Notes retrieved successfully', note });
        }else{
            res.status(404).json({ error: 'Note not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' }); 
    }
};

const getNoteByTitle =  async (req, res)=>{
  try {
    const { title,  status } = req.query;
    //get Note by title or status from db
    const notes = await noteService.getAllNote(title, status);
    res.status(200).json({ message: 'Notes retrieved successfully', notes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' }); 
  }  
};

module.exports={
    createNote,
    updateNote,
    deleteNote,
    getAllNotes,
    getNoteById,
    getNoteByTitle
}