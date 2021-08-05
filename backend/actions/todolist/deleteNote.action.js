
const Todolist = require('../../models/todolist.model');

module.exports = async (req, res, next ) => {

    try {
        console.log(req.body);
        let user_id = req.params.user_id;
        let note_id = req.body.note_id;

        await Todolist.findOneAndDelete({
            user_id,
            _id: note_id
        });
      
        console.log({
            user_id,
            _id: note_id

        })
        res.status(200).json('Delete note action called');
    } 
    catch (err) {
        console.log(err);
        res.status(200).json({message: "Error comes"});
    }

};