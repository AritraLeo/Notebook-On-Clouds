const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'iNotebook';
const fetchuser = require('../middleware/fetchuser');

//Route - 1: Create a User using POST at '/api/auth/createuser'

router.post('/createuser', [
    // Name must be of 3 chars
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    // Email must be an email
    body('email', 'Enter a valid email').isEmail(),
    // password must be at least 5 chars long
    body('password', 'Enter a valid password').isLength({ min: 5 }),
], async (req, res) => {

    let success = false;
    // Error check for 404
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }

    try {

        // Creating Users and check email doesn't exist
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ success, error: 'Sorry User with this email already exists' });
        }

        const salt = await bcrypt.genSalt(12);
        const secPass = await bcrypt.hash(req.body.password, salt);

        user = await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email,
        })
        // .then(user => res.json(user))
        // .catch(err => {
        //     console.log(err)
        //     res.json({error: 'Please enter a unique a value for email!', message: err.message})
        // });


        var data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);


        // res.json(user);
        res.json({ success: true, authToken });
    }

    catch (error) {
        console.error(error);
        res.status(500).json('Some Error occured...');
    }
});



//Route - 2: End point for Login api/auth/login
router.post('/login', [

    // Email must be an email
    body('email', 'Enter a valid email').isEmail(),
    // password must be at least 5 chars long
    body('password', 'Password cannot be blank').exists(),
], async (req, res) => {

    let success = false;
    // Error check for 404
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }


    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success, error: "User with this email doesn't exist" });
        }

        const passwordCompare = await bcrypt.compare(password, user.password);

        if (!passwordCompare) {
            return res.status(400).json({ success, error: "Enter correct password!" });
        }

        const data = {
            user: {
                id: user.id
            }
        }

        const authToken = jwt.sign(data, JWT_SECRET);

        // res.json(user);
        res.json({ success: true, authToken });

    } catch (error) {
        console.error(error);
        res.status(500).json('Some Error occured...');
    }

});


//Route - 3: Getting a User's details using POST at '/api/auth/getuser' Login required!

router.post('/getuser', fetchuser, async (req, res) => {

    try {
        let userId = req.user.id;
        const user = await User.findById(userId).select('-password');
        res.send(user);
    } catch (error) {
        console.error(error);
        res.status(500).json('Some Error occured...');
    }
});



module.exports = router;