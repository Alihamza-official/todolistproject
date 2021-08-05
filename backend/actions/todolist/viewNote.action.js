
module.exports = async (req, res, next ) => {

    try {
        
        res.status(200).json("View Notes")
    } 
    catch (err) {
        console.log(err);
        res.status(200).json({message: "Error comes"});
    }

};