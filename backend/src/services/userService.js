const {generateHash} = require("../utils/stringUtils");
const { UserModel } = require("../models/user")


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
}


const userService = new UserService();

module.exports = { userService }