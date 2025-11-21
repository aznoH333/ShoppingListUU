
const { userService } = require("./userService");
const {ShoppingListModel, ShoppingListState} = require("../models/shoppingList");
const {UserShoppingListRole, UserShoppingListRoleModel} = require("../models/userShoppingListRole");
const {ShoppingListItemModel} = require("../models/shoppingListItem");

class ShoppingListService {
    async createList(name, ownerId) {

        const owner = await userService.findUserById(ownerId);

        if (!owner) {
            throw new Error("Invalid user id");
        }

        const list = new ShoppingListModel({
            name: name,
            state: ShoppingListState.ACTIVE
        });

        await list.save();

        await this.createUserRole( owner, list, UserShoppingListRole.OWNER );
    }


    async createUserRole(user, list, role) {
        const userRole = new UserShoppingListRoleModel({
            userId: user.id,
            listId: list.id,
            userRole: role,
        });

        await userRole.save();
    }

    async getShoppingListById(listId) {
        try {
            return await ShoppingListModel.findById(listId);
        }catch(e) {
            return undefined;
        }
    }

    async getListsForUser(userId) {
        const roles = await UserShoppingListRoleModel.find({ userId: userId });

        return ShoppingListModel.find({_id: {$in: roles.map((it) => it.listId)}});
    }

    async updateList(listId, name, state) {
        const list = await this.getShoppingListById(listId);

        if (!list) {
            throw Error("List not found");
        }

        list.name = name;
        list.state = state;

        await list.save();
    }

    async getUserRoleForList(listId, userId) {
        try {
            return await UserShoppingListRoleModel.findOne({listId: listId, userId: userId});
        }catch (e) {
            return undefined;
        }
    }

    async deleteShoppingList(listId) {
        await UserShoppingListRoleModel.deleteMany({ listId: listId });
        await ShoppingListItemModel.deleteMany({listId: listId});
        await ShoppingListModel.deleteOne({_id: listId});

    }
}


const shoppingListService = new ShoppingListService();


module.exports = { shoppingListService }