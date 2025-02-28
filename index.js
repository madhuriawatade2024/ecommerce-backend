const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000; // Use dynamic port for deployment

// ✅ Properly enable CORS for all requests
app.use(cors());

// ✅ Ensure CORS headers are set for every API response
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

app.use(bodyParser.json());

// Serve static files (Images)
app.use('/images', express.static(path.join(__dirname, 'public', 'images')));

// ✅ Handle Preflight (OPTIONS) Requests for CORS
app.options('*', (req, res) => {
    res.sendStatus(200);
});

// Sample Product Data with Correct Image URLs
const BASE_URL = "https://ecommerce-backend.onrender.com"; // Update with your backend URL
const products = [
    { id: 1, name: "Laptop", image: `${BASE_URL}/images/laptop.jpg`, description: "A powerful laptop", price: 1000 },
    { id: 2, name: "Smartphone", image: `${BASE_URL}/images/phone.jpg`, description: "Latest smartphone", price: 800 },
];

// API to fetch products
app.get("/api/products", (req, res) => {
    console.log("GET /api/products called");
    res.status(200).json(products);
});

// API to place an order (example)
app.post("/api/orders", (req, res) => {
    const { firstName, lastName, address, cart } = req.body;
    if (!firstName || !lastName || !address || !Array.isArray(cart) || cart.length === 0) {
        console.log("Invalid order data received:", req.body);
        return res.status(400).json({ message: "Invalid order data" });
    }
    console.log("Order placed successfully!", req.body);
    res.status(201).json({ message: "Order placed successfully!" });
});

// Default Route (Home Page)
app.get("/", (req, res) => {
    res.send("Welcome to the E-commerce API!");
});

// Handle unknown routes (404)
app.use((req, res) => {
    console.log(`404 Not Found: ${req.originalUrl}`);
    res.status(404).json({ message: "Route not found" });
});

// Start the server
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
