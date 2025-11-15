const express = require("express");
const {authenticateToken, validateBodySchema, validateParamSchema, authenticateListOwnerOnly} = require("./authUtils");
const { object, string, number} = require("yup");
const router = express.Router({ mergeParams: true });



router.get("/",
    authenticateToken,
    validateParamSchema(object({
        listId: number().required()
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
        listId: number().required()
    })),
    validateBodySchema(object({
        userId: number().required()
    })),
    authenticateListOwnerOnly,
    (req, res)=> {
        res.sendStatus(200)
    });


router.delete("/:userId",
    authenticateToken,
    validateParamSchema(object({
        listId: number().required(),
        userId: number().required()
    })),
    authenticateListOwnerOnly,
    (req, res)=> {
        res.sendStatus(200)
    });

module.exports = router;