const express = require("express");
const {authenticateToken, validateBodySchema, validateParamSchema, authenticateListOwnerOnly} = require("../utils/authUtils");
const { object, string, number} = require("yup");
const router = express.Router({ mergeParams: true });


const {shoppingListService} = require("../services/shoppingListService");
const {RESPONSES} = require("../utils/responseUtils")

const postProjectSchema = object({
    name: string().required()
})

router.post('/',
    authenticateToken,
    validateBodySchema(postProjectSchema),
    async (req, res) => {
        try {
            const list = await shoppingListService.createList(req.body.name, req.user.id);
            return RESPONSES.OK(res, list);

        }catch (e) {
            return RESPONSES.EXCEPTION(res, e)
        }
    }
);


router.get("/:listId",
    authenticateToken,
    validateParamSchema(object({
        listId: string().required()
    })),
    async (req, res) => {


    const list = await shoppingListService.getShoppingListById(req.params.listId);

    if (!list) {
        return RESPONSES.NOT_FOUND(res);
    }

    return RESPONSES.OK(res, list);

    }
);

router.get("/",
    authenticateToken,
    async (req, res) => {

    const lists = await shoppingListService.getListsForUser(req.user.id);

    return RESPONSES.OK(res, lists);
    }
);


router.put("/:listId",
    authenticateToken,
    validateParamSchema(object({
        listId: string().required()
    })),
    validateBodySchema(object({
        name: string().required(),
        state: string().required(),
    })),
    authenticateListOwnerOnly,
    async (req, res) => {
    try {
        await shoppingListService.updateList(req.params.listId, req.body.name, req.body.state);
        return RESPONSES.OK(res);
    }catch (e) {
        return RESPONSES.EXCEPTION(res, e)
    }
    }
);


router.delete("/:listId",
    authenticateToken,
    validateParamSchema(object({
        listId: string().required()
    })),
    authenticateListOwnerOnly,
    async (req, res) => {
        try {
            await shoppingListService.deleteShoppingList(req.params.listId);
            return RESPONSES.OK(res);
        }catch (e) {
            return RESPONSES.EXCEPTION(res, e);
        }
    }
);


const shoppingListItemController = require("./shoppingListItemController");
router.use("/:listId/item", shoppingListItemController);

const shittingListMemberController = require("./shoppingListMemberController");
router.use("/:listId/members", shittingListMemberController)


module.exports = router;