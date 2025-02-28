const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000; // Use dynamic port for deployment

// CORS Middleware
app.use(cors({
    origin: ["https://madhuriawatade2024.github.io"], // Allow frontend origin
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"]
}));

app.use(bodyParser.json());

// Serve static files from "public" folder
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// Sample Product Data with Correct Image URLs
const products = [
    { id: 1, name: "Laptop", image: "/images/laptop.jpg", description: "A powerful laptop", price: 1000 },
    { id: 2, name: "Smartphone", image: "/images/phone.jpg", description: "Latest smartphone", price: 800 },
];

// API to fetch products
app.get("/api/products", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*"); // Ensure CORS headers are sent
    res.json(products);
});

// API to place an order (example)
app.post("/api/orders", (req, res) => {
    const { firstName, lastName, address, cart } = req.body;
    if (!firstName || !lastName || !address || !cart || cart.length === 0) {
        return res.status(400).json({ message: "Invalid order data" });
    }
    res.json({ message: "Order placed successfully!" });
});

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
