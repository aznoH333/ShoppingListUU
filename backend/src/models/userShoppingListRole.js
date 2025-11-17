const { defineDBSchema } = require("../utils/dbUtils");

const UserShoppingListRole = {
    OWNER: "owner",
    MEMBER: "member"
}


const UserShoppingListRoleModel = defineDBSchema("UserListRole", {
    userId: { type: String, required: true },
    listId: { type: String, required: true },
    "userRole": { type: String, enum: Object.values(UserShoppingListRole), required: true },
});


module.exports = { UserShoppingListRoleModel, UserShoppingListRole }