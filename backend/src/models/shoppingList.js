const { defineDBSchema } = require("../utils/dbUtils");


const ShoppingListState = {
    ACTIVE: "active",
    ARCHIVED: "archived",
}

const ShoppingListModel = defineDBSchema("ShoppingList",
    {
        name: { type: String, required: true },
        state: { type: String, enum: Object.values(ShoppingListState), required: true}
    });


module.exports = { ShoppingListModel, ShoppingListState };