

const Todolist = require('../../models/todolist.model');

module.exports = async (req, res, next ) => {

    try {
        console.log('User is ', req.params.user_id);

        const user_id = req.params.user_id;
        const record = await Todolist.find({user_id})
        .select('title description');
        res.status(200).json({data: record});

    } 
    catch (err) {
        console.log(err);
        res.status(200).json({message: "Error comes"});
    }

};