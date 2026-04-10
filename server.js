const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const mysql = require("mysql2");
const path = require("path");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const SECRET = "cityhub_secret";

// ✅ MySQL Connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "77393034",   // apna password
    database: "cityhub"
});

db.connect(err => {
    if (err) throw err;
    console.log("MySQL Connected...");
});

// ✅ Serve Frontend
app.use(express.static(path.join(__dirname, "public")));

// ✅ Main Page
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// ✅ User Page
app.get("/user", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "user.html"));
});

// ✅ Vendor Page
app.get("/vendor", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "vendor.html"));
});

// 🔐 SIGNUP
app.post("/signup", async (req, res) => {
    const { name, email, password } = req.body;

    const hashedPass = await bcrypt.hash(password, 10);

    const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
    db.query(sql, [name, email, hashedPass], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "User Registered" });
    });
});


// 🔐 LOGIN
app.post("/login", (req, res) => {
    const { email, password } = req.body;

    const sql = "SELECT * FROM users WHERE email = ?";
    db.query(sql, [email], async (err, result) => {
        if (err) return res.status(500).json(err);

        if (result.length === 0)
            return res.status(404).json({ message: "User not found" });

        const user = result[0];

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.status(400).json({ message: "Wrong password" });

        const token = jwt.sign({ id: user.id }, SECRET, { expiresIn: "1d" });

        res.json({ token, user });
    });
});


// 📍 GET VENDORS
app.get("/vendors", (req, res) => {
    const sql = "SELECT * FROM vendors";
    db.query(sql, (err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result);
    });
});


// ➕ ADD VENDOR
app.post("/vendors", (req, res) => {
    const { name, type, rating, phone, latitude, longitude } = req.body;

    const sql = `
        INSERT INTO vendors (name, type, rating, phone, latitude, longitude)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(sql, [name, type, rating, phone, latitude, longitude], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Vendor Added" });
    });
});


// 🚀 START SERVER
app.listen(9000, () => {
    console.log("Server running on http://localhost:9000 🚀");
});