const { defineDBSchema } = require("../utils/dbUtils");


const UserModel = defineDBSchema("User",
    {
        name: { type: String, required: true },
        password: { type: String, required: true },
    });


module.exports = { UserModel };