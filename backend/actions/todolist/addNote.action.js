

const Todolist = require('../../models/todolist.model');

module.exports = async (req, res, next ) => {

    try {
        console.log(req.body);

        const user_id = req.params.user_id;
        const { title, description } = req.body;
        const record = new Todolist({
            user_id, 
            title, 
            description
        });

        await record.save();

        res.status(200).json("Add notes action called");

    } 
    catch (err) {
        console.log(err);
        res.status(200).json({message: "Error comes"});
    }

};