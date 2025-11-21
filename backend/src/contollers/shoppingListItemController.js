const express = require("express");
const {authenticateToken, validateBodySchema, validateParamSchema, authenticateListOwnerOnly} = require("../utils/authUtils");
const { object, string, number} = require("yup");
const router = express.Router({ mergeParams: true });


const {shoppingListItemService} = require("../services/shoppingListItemService");
const {RESPONSES} = require("../utils/responseUtils");

router.post("/",
    authenticateToken,
    validateParamSchema(object({
        listId: string().required()
    })),
    validateBodySchema(object({
        name: string().required(),
        quantity: number().required().min(1).max(999)
    })),
    authenticateListOwnerOnly,
    async (req, res) => {
        try {
            await shoppingListItemService.createShoppingListItem(req.params.listId, req.body.name, req.body.quantity);
            return RESPONSES.OK(res);
        }catch (e) {
            return RESPONSES.EXCEPTION(res, e);
        }
    }
);


router.get("/",
    authenticateToken,
    validateParamSchema(object({
        listId: string().required()
    })),
    async (req, res) => {
        try {
            return RESPONSES.OK(res, await shoppingListItemService.getShoppingListItems(req.params.listId));
        }catch (e) {
            return RESPONSES.NOT_FOUND(res);
        }
    });

router.get("/:itemId",
    authenticateToken,
    validateParamSchema(object({
        listId: string().required(),
        itemId: string().required()
    })),
    async (req, res) => {
        try {
            return RESPONSES.OK(res, await shoppingListItemService.getShoppingListItemById(req.params.itemId));
        }catch (e) {
            return RESPONSES.NOT_FOUND(res);
        }
    });

router.delete("/:itemId",
    authenticateToken,
    validateParamSchema(object({
        listId: string().required(),
        itemId: string().required()
    })),
    authenticateListOwnerOnly,
    async (req, res) => {
        try {
            return RESPONSES.OK(res, await shoppingListItemService.deleteShoppingListItem(req.params.itemId));
        }catch (e) {
            return RESPONSES.EXCEPTION(res, e);
        }
    }
)

router.put("/:itemId",
    authenticateToken,
    validateParamSchema(object({
        listId: string().required(),
        itemId: string().required()
    })),
    validateBodySchema(object({
        name: string().required(),
        quantity: number().required(),
        state: string().required()
    })),
    authenticateListOwnerOnly,
    async (req, res) => {
        try {
            await shoppingListItemService.updateShoppingListItem(req.params.itemId, req.body.name, req.body.quantity, req.body.state);
            return RESPONSES.OK(res);
        }catch (e) {
            return RESPONSES.EXCEPTION(res, e);
        }
    }
)

module.exports = router;