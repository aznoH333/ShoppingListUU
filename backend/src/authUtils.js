const jwt = require("jsonwebtoken");

// Secret key for JWT
const SECRET_KEY = 'debug_key';

function authenticateToken (req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1]; // Get token from Authorization header

    if (!token) {
        return res.sendStatus(401); // Token is missing
    }

    // Verify the token
    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            return res.sendStatus(403); // Invalid token
        }
        req.user = user;
        next();
    });
}


function validateBodySchema(schema) {
    return async (req, res, next) => {
        try {
            // Validate the request body against the schema
            await schema.validate(req.body);
            next(); // Proceed to the next middleware or route handler
        } catch (e) {
            return res.status(400).json({ data: req.body, error: e.message }).send();
        }
    };
}

function validateParamSchema(schema) {
    return async (req, res, next) => {
        try {
            await schema.validate(req.params);
            next();
        }catch(e) {
            return res.status(400).json({data: req.params, error: e.message}).send();
        }
    }
}


function authenticateListOwnerOnly(req, res, next) {
    // simulate list ownership. will be replaced with actual logic once the db is implemented

    if (parseInt(req.user.id.toString()) !== 1 || parseInt(req.params.listId) !== 1) {
        return res.status(401).send();
    }

    next();
}

function authenticateMemberOrOwnerOnly(req, res, next) {
    // simulate list memebership. will be replaced with actual logic once the db is implemented
    if ((parseInt(req.user.id.toString()) !== 1 && parseInt(req.user.id.toString()) !== 2) || parseInt(req.params.listId) !== 1) {
        return res.status(401).send();
    }

    next();
}


module.exports = {authenticateToken, SECRET_KEY, validateBodySchema, validateParamSchema, authenticateListOwnerOnly, authenticateMemberOrOwnerOnly }