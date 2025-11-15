const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Secret key for JWT
const SECRET_KEY = 'debug_key';

// Sample user data
const USER_DATA = {
    email: 'a@b.cz',
    password: 'password123', // For demonstration purposes only
    id: 1
};



// Authentication endpoint
app.post('/auth', (req, res) => {
   // this endpoint is just a placeholder and will be polished up in the future
    const { email, password } = req.body;

    // TODO : hash passwords and stuff
    if (email === USER_DATA.email && password === USER_DATA.password) {
        // Create a JWT token
        const token = jwt.sign({ email: USER_DATA.email, id: USER_DATA.id }, SECRET_KEY, { expiresIn: '1h' });
        return res.json({ token });
    } else {
        return res.status(401).json({ message: 'Invalid email or password' });
    }
});

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Get token from Authorization header

    if (!token) {
        return res.sendStatus(401); // Token is missing
    }

    // Verify the token
    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            return res.sendStatus(403); // Invalid token
        }
        req.user = user;
        next();
    });
};


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


app.post('/shoppingList/', authenticateToken, (req, res) => {
    const { name } = req.body;

    // Validate the input
    if (typeof name !== 'string' || name.trim() === '') {
        return res.status(400).json({ message: 'Invalid input. "name" must be a non-empty string.' });
    }

    // If validation passes, return a 500 error with the message "todo"
    return res.status(500).json({ message: 'todo' });
});