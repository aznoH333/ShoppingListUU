const express = require("express");
const {authenticateToken, validateBodySchema, validateParamSchema, authenticateListOwnerOnly} = require("./authUtils");
const { object, string, number} = require("yup");
const router = express.Router({ mergeParams: true });

router.post("/",
    authenticateToken,
    validateParamSchema(object({
        listId: number().required()
    })),
    validateBodySchema(object({
        name: string().required(),
        quantity: number().required().min(1).max(999)
    })),
    authenticateListOwnerOnly,
    (req, res) => {
        return res.sendStatus(200);
    }
);


router.get("/",
    authenticateToken,
    validateParamSchema(object({
        listId: number().required()
    })),
    (req, res) => {
        return res.status(200).json({
            items: [
                {
                    id: 0,
                    shoppingListId: req.params.listId,
                    name: "",
                    quantity: 1,
                    state: "",
                }
            ]
        })
    });

router.get("/:itemId",
    authenticateToken,
    validateParamSchema(object({
        listId: number().required(),
        itemId: number().required()
    })),
    (req, res) => {
        return res.status(200).json({
            id: 0,
            shoppingListId: req.params.listId,
            name: "",
            quantity: 1,
            state: "",
        });
    });

router.delete("/:itemId",
    authenticateToken,
    validateParamSchema(object({
        listId: number().required(),
        itemId: number().required()
    })),
    authenticateListOwnerOnly,
    (req, res) => {
        return res.sendStatus(200);
    }
)

router.put("/:itemId",
    authenticateToken,
    validateParamSchema(object({
        listId: number().required(),
        itemId: number().required()
    })),
    validateBodySchema(object({
        name: string().required(),
        quantity: number().required(),
        state: string().required()
    })),
    authenticateListOwnerOnly,
    (req, res) => {
        return res.sendStatus(200);
    }
)

module.exports = router;