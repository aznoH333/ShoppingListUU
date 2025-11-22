const express = require("express");
const jwt = require("jsonwebtoken");
const {SECRET_KEY, validateBodySchema} = require("../utils/authUtils");
const {object, string} = require("yup");

const router = express.Router();

const { userService } = require("../services/userService");
const {RESPONSES} = require("../utils/responseUtils");
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

router.post("/register",
    validateBodySchema(object({
        name: string().required(),
        password: string().required(),
    })),
    async (req, res)=> {

        try {
            await userService.registerUser(req.body.name, req.body.password);
            return res.sendStatus(200);
        } catch (e) {
            return res.status(400).json({ message: e.message });
        }
    });

router.get("/login",
    validateBodySchema(object({
        name: string().required(),
        password: string().required(),
    })),
    async (req, res)=> {

        const user = await userService.findUserByNameAndPassword(req.body.name, req.body.password);

        if (!user) {
            res.status(400).json({ message: "User not found"});
        }

        const token = jwt.sign({ name: user.name, id: user.id }, SECRET_KEY, { expiresIn: '20y' });
        return res.json({ token: token, name: user.name, id: user.id }).status(200);

    });


router.get('/',
    async (req, res) => {

    return RESPONSES.OK(res, await userService.getAllUsers());

    }
);

module.exports = router;