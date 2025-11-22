
const {UserShoppingListRoleModel, UserShoppingListRole} = require("../models/userShoppingListRole");
const {userService} = require("./userService");

class ShoppingListMemberService {
    async getListMembers(listId) {
        return userService.getUserListMembers(await UserShoppingListRoleModel.find({listId: listId}));
    }

    async findListMemberShipByUserListId(listId, userId) {
        try {
            return await UserShoppingListRoleModel.findOne({listId: listId, userId: userId});
        }catch (e) {
            return undefined;
        }
    }


    async addMemberToList(listId, userId) {

        const role = await this.findListMemberShipByUserListId(listId, userId);

        if (role) {
            throw Error("User is already in this list");
        }


        const userRole = new UserShoppingListRoleModel({
            listId: listId,
            userId: userId,
            userRole: UserShoppingListRole.MEMBER,
        });

        await userRole.save();
    }

    async removeMemberFromList(listId, userId) {
        const role = await this.findListMemberShipByUserListId(listId, userId);

        if (!role) {
            throw Error("User not present in list");
        }

        if (role.userRole === UserShoppingListRole.OWNER) {
            throw Error("Cannot remove owner from list");
        }


        await UserShoppingListRoleModel.findOneAndDelete({listId: listId, userId: userId});
    }

}

const shoppingListMemberService = new ShoppingListMemberService();

module.exports = {shoppingListMemberService}