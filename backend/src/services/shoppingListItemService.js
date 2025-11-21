
const {shoppingListService} = require("./shoppingListService");
const {ShoppingListItemModel, ShoppingListItemState} = require("../models/shoppingListItem");

class ShoppingListItemService{
    async createShoppingListItem(listId, name, quantity) {
        const list = await shoppingListService.getShoppingListById(listId);

        if (!list) {
            throw Error("List not found");
        }

        const listItem = new ShoppingListItemModel({
            shoppingListId: listId,
            name: name,
            quantity: quantity,
            state: ShoppingListItemState.VISIBLE
        });

        await listItem.save();
    }

    async getShoppingListItems(listId) {
        try {
            return await ShoppingListItemModel.find({shoppingListId: listId});
        }catch (e) {
            return undefined;
        }
    }

    async getShoppingListItemById(itemId) {
        try {
            return await ShoppingListItemModel.findById(itemId);
        }catch (e) {
            return undefined;
        }
    }

    async updateShoppingListItem(itemId, name, quantity, state) {
        const item = await this.getShoppingListItemById(itemId);

        if (!item) {
            throw Error("Item not found");
        }

        item.name = name;
        item.quantity = quantity;
        item.state = state;

        await item.save();
    }

    async deleteShoppingListItem(itemId) {
        await ShoppingListItemModel.findByIdAndDelete(itemId);
    }
}

const shoppingListItemService = new ShoppingListItemService();

module.exports = {shoppingListItemService};