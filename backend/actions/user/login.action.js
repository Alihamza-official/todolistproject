
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/user.model');

module.exports = async (req, res, next ) => {

    try {

        //check if username exists
        const user = await User.findOne({
            email: req.body.email,
        });

        if (!user) 
        {
            return res.status(200).send({found:false, message:'email incorrect'});
        }

        //check password is correct or not
        const validPass = await bcrypt.compare(req.body.password, user.password);
        if (!validPass) 
        {
            return res.status(200).send({found: false, message: 'Password Incorrect'});
        }    

        //create and assign token
        const token = jwt.sign(
            {
                id: user._id,
                name: user.name,
                email: user.email,
            },
            process.env.USER_TOKEN_SECRET
        );

        res.header('auth', token).send({
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
            token,
            found: true
        });
    } 
    catch (err) {
        console.log(err);
        res.status(200).json({message: "Error comes"});
    }

};