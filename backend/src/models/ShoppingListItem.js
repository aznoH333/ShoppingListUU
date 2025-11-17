const { defineDBSchema } = require("../utils/dbUtils");

const ShoppingListItemState = {
    VISIBLE: "visible",
    CHECKED: "checked"
}


const ShoppingListItemModel = defineDBSchema("ShoppingListItem", {
    shoppingListId: { type: String, required: true },
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    state: { type: String, enum: Object.values(ShoppingListItemState), required: true }
});


module.exports = { ShoppingListItemModel, ShoppingListItemState };