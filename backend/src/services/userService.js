const {generateHash} = require("../utils/stringUtils");
const { UserModel } = require("../models/user")
const {ShoppingListModel} = require("../models/shoppingList");


class UserService {
    async createNewUser(name, password) {
        const passwordHash = generateHash(password);

        const user = new UserModel({
            name: name,
            password: passwordHash,
        });

        await user.save();

        return user;
    }

    async findUserById(id) {
        try {
            return await UserModel.findById(id);
        }catch (e) {
            return undefined;
        }
    }

    async findUserByNameAndPassword(name, password) {
        try {
            const passwordHash = generateHash(password);


            return await UserModel.findOne({
                name: name,
                password: passwordHash,
            });

        }catch (e) {
            return undefined;
        }
    }

    async registerUser(name, password) {

        const user = await this.findUserByNameAndPassword(name, password);
        if (user) {
            throw new Error("User already exists");
        }


        await this.createNewUser(name, password);
    }

    async getUserListMembers(userRoles) {
        const ids = userRoles.map((it)=>it.userId);

        const users = await UserModel.find({_id: {$in: ids}});

        return users.map((it)=> {
            return {
                _id: it._id,
                name: it.name,
                role: userRoles.find((role)=>it._id == role.userId).userRole,
            };
        });

    }

    async getAllUsers() {
        const users = await UserModel.find({})

        return users.map((it)=>{
            return {
                _id: it._id,
                name: it.name
            };
        });
    }
}


const userService = new UserService();

module.exports = { userService }