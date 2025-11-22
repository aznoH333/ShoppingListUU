const express = require("express");
const {authenticateToken, validateBodySchema, validateParamSchema, authenticateListOwnerOnly} = require("../utils/authUtils");
const { object, string, number} = require("yup");
const {RESPONSES} = require("../utils/responseUtils");
const router = express.Router({ mergeParams: true });


const {shoppingListMemberService} = require("../services/shoppingListMemberService");

router.get("/",
    authenticateToken,
    validateParamSchema(object({
        listId: string().required()
    })),
    async (req, res)=> {
        return RESPONSES.OK(res, await shoppingListMemberService.getListMembers(req.params.listId)); // TODO : this isn't ideal
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
    async (req, res)=> {
        try {
            await shoppingListMemberService.addMemberToList(req.params.listId, req.body.userId);
            return RESPONSES.OK(res);
        } catch (e) {
            return RESPONSES.EXCEPTION(res, e);
        }
    });


router.delete("/:userId",
    authenticateToken,
    validateParamSchema(object({
        listId: string().required(),
        userId: string().required()
    })),
    authenticateListOwnerOnly,
    async (req, res)=> {
        try {
            await shoppingListMemberService.removeMemberFromList(req.params.listId, req.params.userId);
            return RESPONSES.OK(res);
        } catch (e) {
            return RESPONSES.EXCEPTION(res, e);
        }
    });

module.exports = router;