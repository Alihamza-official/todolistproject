
const Todolist = require('../../models/todolist.model');

module.exports = async (req, res, next ) => {

    try {
        let user_id = req.params.user_id; 
    
        let { note_id, title, description } = req.body;
        await Todolist.findOneAndUpdate(
            {user_id, _id: note_id},
            { title, description }
        );
        
        res.status(200).json('Edit note action called');

    } 
    catch (err) {
        console.log(err);
        res.status(200).json({message: "Error comes"});
    }

};