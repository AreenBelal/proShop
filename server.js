const fs = require('fs'); // File system module to read/write files
const bodyParser = require('body-parser'); // Middleware to parse request bodies
const jsonServer = require('json-server'); // Library to create a JSON server
const jwt = require('jsonwebtoken'); // Library for handling JWT tokens
const path = require('path'); // Module for handling file paths
const multer = require('multer'); // Middleware for handling file uploads

const server = jsonServer.create(); // Create a new JSON server instance
const router = jsonServer.router(path.join(__dirname, './public/database.json')); // Router for the JSON database
const userdbPath = path.join(__dirname, './public/users.json'); // Path to the user database

// Middleware to parse URL-encoded and JSON bodies
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(jsonServer.defaults()); // Default middleware for json-server

const SECRET_KEY = '123456789'; // Secret key for signing JWTs
const expiresIn = '15m'; // Token expiration time

// Function to create a JWT token from a payload
function createToken(payload) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

// Function to check if the user exists based on email and password
function isAuthenticated({ email, password }) {
  const users = JSON.parse(fs.readFileSync(userdbPath, 'UTF-8')); // Read users from file
  return users.users.findIndex(user => user.email === email && user.password === password) !== -1; // Check if user exists
}

// Register New User
server.post('/register', (req, res) => {
  const { name, email, password, role } = req.body; // Destructure request body

  // Validate required fields
  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: 'Name, email, password, and role are required' });
  }

  // Check if the user already exists
  if (isAuthenticated({ email, password })) {
    return res.status(401).json({ message: 'Email and Password already exist' });
  }

  // Read current users and add a new user
  fs.readFile(userdbPath, (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Error reading user data' });
    }

    let users = JSON.parse(data.toString());
    const lastUserId = users.users.length > 0 ? users.users[users.users.length - 1].id : 0; // Get last user ID
    const newUser = {
      id: lastUserId + 1,
      name,
      email,
      password,
      role, // Add role to the new user
      cart: [] // Initialize cart as an empty array
    };

    users.users.push(newUser); // Add new user to the users array

    // Write updated users back to file
    fs.writeFile(userdbPath, JSON.stringify(users), (err) => {
      if (err) {
        return res.status(500).json({ message: 'Error saving user data' });
      }

      const access_token = createToken({ email, name, id: newUser.id, role: newUser.role }); // Create token
      res.status(200).json({ access_token }); // Respond with token
    });
  });
});

// Login User
server.post('/login', (req, res) => {
  const { email, password } = req.body; // Destructure request body

  // Validate required fields
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }
  // Check authentication
  if (!isAuthenticated({ email, password })) {
    return res.status(401).json({ message: 'Incorrect email or password' });
  }

  const users = JSON.parse(fs.readFileSync(userdbPath, 'UTF-8')); // Read users from file
  const user = users.users.find(user => user.email === email && user.password === password); // Find user

  const access_token = createToken({ email: user.email, name: user.name, id: user.id, role: user.role }); // Create token
  res.status(200).json({ access_token }); // Respond with token
});

// Update User
server.put('/users', (req, res) => {
  const updatedUser = req.body; // Get updated user data from request body

  fs.readFile(userdbPath, 'utf-8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Error reading user data' });
    }

    let users;
    try {
      users = JSON.parse(data); // Parse user data
    } catch (parseError) {
      return res.status(500).json({ message: 'Error parsing user data' });
    }

    const userIndex = users.users.findIndex(user => user.id === parseInt(updatedUser.id)); // Find user index

    if (userIndex !== -1) {
      users.users[userIndex] = { ...users.users[userIndex], ...updatedUser }; // Update user data

      // Write updated users back to file
      fs.writeFile(userdbPath, JSON.stringify(users, null, 2), (writeError) => {
        if (writeError) {
          return res.status(500).json({ message: 'Error updating user data' });
        }
        res.status(200).json(users.users[userIndex]); // Respond with updated user
      });
    } else {
      res.status(404).json({ message: 'User not found' }); // User not found
    }
  });
});

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, './public/uploads')); // Set upload destination
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Set filename
  }
});

const upload = multer({ storage }); // Create multer instance

// Handle image uploads
server.post('/upload-image', upload.single('image'), (req, res) => {
  const { id } = req.body; // Get user ID from request body
  const file = req.file; // Get uploaded file

  if (!file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  fs.readFile(userdbPath, 'utf-8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Error reading user data' });
    }

    let users;
    try {
      users = JSON.parse(data); // Parse user data
    } catch (parseError) {
      return res.status(500).json({ message: 'Error parsing user data' });
    }

    const userIndex = users.users.findIndex(user => user.id === parseInt(id)); // Find user index

    if (userIndex !== -1) {
      users.users[userIndex].image = `/uploads/${file.filename}`; // Set user image path

      // Write updated users back to file
      fs.writeFile(userdbPath, JSON.stringify(users, null, 2), (writeError) => {
        if (writeError) {
          return res.status(500).json({ message: 'Error updating user data' });
        }
        res.status(200).json(users.users[userIndex]); // Respond with updated user
      });
    } else {
      res.status(404).json({ message: 'User not found' }); // User not found
    }
  });
});

// Use the router
server.use(router);


// Start the server
server.listen(8000, () => {
  console.log('JSON Server is running on port 8000'); // Log message when server starts
});
