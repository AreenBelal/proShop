const jsonServer = require("json-server"); // Import json-server library
const auth = require("json-server-auth"); // Import json-server-auth for authentication
const jwt = require("jsonwebtoken"); // Import jwt library to create access tokens
const bcrypt = require("bcryptjs"); // Import bcryptjs to compare hashed passwords
const server = jsonServer.create(); // Create a json-server instance
const router = jsonServer.router("db.json"); // Create a router based on the db.json file
const middlewares = jsonServer.defaults(); // Set default middlewares

// Define access rules
const rules = auth.rewriter({
    users: 777,         // Users can read, create, and update
    products: 777,      // Products can read, create, update, and delete
    cart: 777,
});



server.db = router.db;
server.use(middlewares);
server.use(rules);
server.use(auth);


 

// Custom login endpoint to include role in response
server.post('/auth/login', async (req, res) => {
    const { email, password } = req.body; // Extract email and password from request body
    const user = server.db.get('users').find({ email }).value(); // Find the user by email

    // Check if user exists and password matches
    if (user && await bcrypt.compare(password, user.password)) {
        // Create the accessToken using jwt
        const accessToken = jwt.sign({ email: user.email, sub: user.id }, 'your-secret-key', { expiresIn: '1h' });

        // Prepare response including the role
        const response = {
            user: {
                id: user.id, // User ID
                email: user.email, // User email
                role: user.role // User role
            },
            accessToken: accessToken // Generated access token
        };

        res.status(200).jsonp(response); // Send response with accessToken and role
    } else {
        res.status(401).jsonp({ message: 'Invalid credentials' }); // Respond if credentials are incorrect
    }
});

 
server.post('/auth/register', async (req, res) => {
    const { name, email, password } = req.body;

    // Check if the user already exists
    const existingUser = server.db.get('users').find({ email }).value();
    if (existingUser) {
        return res.status(400).jsonp({ message: 'User already exists' });
    }

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user object with role set to 'user'
    const newUser = {
        id: Date.now().toString(), // Generate a unique ID using a timestamp
        name,
        email,
        password: hashedPassword, // Store the hashed password
        role: 'user', // Set the default role to 'user'
        cart: [], // Initialize an empty cart
        wishList: [] // Initialize an empty wish list
    };

    // Add the user to the database
    server.db.get('users').push(newUser).write();

    // Create an access token to return after registration
    const accessToken = jwt.sign({ email: newUser.email, sub: newUser.id }, 'your-secret-key', { expiresIn: '1h' });

    // Prepare the response with user role included
    const response = {
        user: {
            id: newUser.id,
            email: newUser.email,
            name: newUser.name,
            role: newUser.role, // Include the role in the response
            cart: newUser.cart, // Include the cart in the response
            wishList: newUser.wishList // Include the wish list in the response
        },
        accessToken: accessToken
    };

    // Send the response
    res.status(201).jsonp(response);
});

 





// Use the router to handle all other requests
server.use(router);

// Start the server and listen on port 3000
server.listen(3000, () => {
    console.log("JSON Server is running on port 3000"); // Log server status
});
