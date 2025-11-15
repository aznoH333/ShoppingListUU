const express = require("express");
const jwt = require("jsonwebtoken");
const {SECRET_KEY} = require("./authUtils");

const router = express.Router();


/*
    DEVELOPER NOTE:
    Will be replaced with actual authentication later.
    This is just here so I can validate/store some information
    about the user in the jwt token
 */




// Sample user data
const USER_DATA = {
    email: 'a@b.cz',
    password: 'password123', // For demonstration purposes only
    id: 1
};



router.post('/', (req, res) => {
    // this endpoint is just a placeholder and will be polished up in the future
    const { email, password } = req.body;

    // TODO : hash passwords and stuff
    if (email === USER_DATA.email && password === USER_DATA.password) {
        // Create a JWT token
        const token = jwt.sign({ email: USER_DATA.email, id: USER_DATA.id }, SECRET_KEY, { expiresIn: '20y' });
        return res.json({ token });
    } else {
        return res.status(401).json({ message: 'Invalid email or password' });
    }
});


module.exports = router;