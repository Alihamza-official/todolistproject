

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/user.model');

module.exports = async (req, res, next ) => {

    try {
        const name = req.body.name;
        const email = req.body.email;

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        const user = await User.findOne({ email });

        if (user) 
        {
            return res.status(200).send({ status:false, message:'User already exists' });
        }

        const newUser = new User({
            name,
            email,
            password: hashPassword
        });

        const savedUser = await newUser.save();

         //create and assign token
        const token = jwt.sign(
            {
                id: savedUser._id,
                name: savedUser.name,
                email: savedUser.email,
            
            },
            process.env.USER_TOKEN_SECRET
        );

        console.log({
            message: 'User Registered Succesfully',
            user: {
                id: savedUser._id,
                name: savedUser.name,
                email: savedUser.email,
            },
            token,
            status: true
        })

        return res.status(200).json({
            message: 'User Registered Succesfully',
            user: {
                id: savedUser._id,
                name: savedUser.name,
                email: savedUser.email,
            },
            token,
            status: true
        });

    } 
    catch (err) {
        console.log(err);
        res.status(200).json({message: "Error comes"});
    }

};