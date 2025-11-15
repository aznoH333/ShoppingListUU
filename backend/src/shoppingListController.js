const express = require("express");
const {authenticateToken, validateBodySchema, validateParamSchema, authenticateListOwnerOnly} = require("./authUtils");
const { object, string, number} = require("yup");
const router = express.Router({ mergeParams: true });

const postProjectSchema = object({
    name: string().required()
})

router.post('/',
    authenticateToken,
    validateBodySchema(postProjectSchema),
    async (req, res) => {
        return res.status(200).json({ message: 'todo' });
    }
);


const getProjectSchema = object({
    listId: number().required()
})
router.get("/:listId",
    authenticateToken,
    validateParamSchema(object({
        listId: number().required()
    })),
    validateParamSchema(getProjectSchema),
    (req, res) => {
        return res.status(200).json({
            id: req.params.listId,
            name: "",
            state: "",
        })
    }
);

router.get("/",
    authenticateToken,
    (req, res) => {
        return res.status(200).json({
            shoppingLists: [
                {
                    id: 0,
                    name: "",
                    state: ""
                }
            ]
        })
    }
);


router.put("/:listId",
    authenticateToken,
    validateParamSchema(object({
        listId: number().required()
    })),
    validateBodySchema(object({
        name: string().required(),
        state: string().required(),
    })),
    authenticateListOwnerOnly,
    (req, res) => {
        return res.sendStatus(200);
    }
);


router.delete("/:listId",
    authenticateToken,
    validateParamSchema(object({
        listId: number().required()
    })),
    authenticateListOwnerOnly,
    (req, res) => {
        return res.sendStatus(200);
    }
);


const shoppingListItemController = require("./shoppingListItemController");
router.use("/:listId/item", shoppingListItemController);

const shittingListMemberController = require("./shoppingListMemberController");
router.use("/:listId/members", shittingListMemberController)


module.exports = router;