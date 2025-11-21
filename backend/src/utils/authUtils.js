const jwt = require("jsonwebtoken");

// Secret key for JWT
const SECRET_KEY = 'debug_key';

const { shoppingListService } = require("../services/shoppingListService")
const {UserShoppingListRole} = require("../models/userShoppingListRole");
const {RESPONSES} = require("./responseUtils");

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


async function authenticateListOwnerOnly(req, res, next) {
    const listRole = await shoppingListService.getUserRoleForList(req.params.listId, req.user.id);

    if (!listRole || listRole.userRole !== UserShoppingListRole.OWNER) {
        return RESPONSES.PERMISSION_DENIED(res);
    }

    next();
}

async function authenticateMemberOrOwnerOnly(req, res, next) {
    const listRole = await shoppingListService.getUserRoleForList(req.params.listId, req.user.id);

    if (listRole || (listRole.userRole !== UserShoppingListRole.OWNER && listRole.userRole !== UserShoppingListRole.MEMBER)) {
        return RESPONSES.PERMISSION_DENIED(res);
    }

    next();
}



module.exports = {authenticateToken, SECRET_KEY, validateBodySchema, validateParamSchema, authenticateListOwnerOnly, authenticateMemberOrOwnerOnly }