const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = 5000;

app.use(cors({
    origin: "https://madhuriawatade2024.github.io", 
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
    res.json(products);
});

// Start the server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
