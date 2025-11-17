const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');


const app = express();
const PORT = 3000;

app.use(bodyParser.json());


const shoppingListsController = require("./contollers/shoppingListController");
app.use("/shoppingList", shoppingListsController);

const authenticationController = require("./contollers/authenticationController");
app.use("/auth", authenticationController);


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


