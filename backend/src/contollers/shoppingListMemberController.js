const express = require("express");
const {authenticateToken, validateBodySchema, validateParamSchema, authenticateListOwnerOnly} = require("../utils/authUtils");
const { object, string, number} = require("yup");
const router = express.Router({ mergeParams: true });



router.get("/",
    authenticateToken,
    validateParamSchema(object({
        listId: string().required()
    })),
    (req, res)=> {
        res.status(200).json({
            members: [
                {
                    userId: 1,
                    name: "abc",
                    role: "owner",
                }
            ]
        });
    });

router.post("/",
    authenticateToken,
    validateParamSchema(object({
        listId: string().required()
    })),
    validateBodySchema(object({
        userId: string().required()
    })),
    authenticateListOwnerOnly,
    (req, res)=> {
        res.sendStatus(200)
    });


router.delete("/:userId",
    authenticateToken,
    validateParamSchema(object({
        listId: string().required(),
        userId: string().required()
    })),
    authenticateListOwnerOnly,
    (req, res)=> {
        res.sendStatus(200)
    });

module.exports = router;