require('dotenv').config(); 
const express = require('express');
const cors = require('cors');
const Razorpay = require('razorpay');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 5002;

// server.js
app.use(cors({
    origin: ["https://adiecom.vercel.app", "http://localhost:5173", "http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));app.use(express.json());

const mongoURI = process.env.MONGODB_URI;
mongoose.connect(mongoURI)
    .then(() => console.log('✅ Connected to MongoDB Atlas'))
    .catch((err) => console.error('❌ Error connecting:', err));

// Models
const Product = require('./models/product'); 
const Order = require('./models/order');

// User Schema
const userSchema = new mongoose.Schema({
    uid: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    role: { type: String, default: 'customer' }
});
const User = mongoose.model('User', userSchema);


// Auth: Register User
app.post('/api/users/register', async (req, res) => {
    try {
        const { uid, email } = req.body;
        let user = await User.findOne({ uid });
        if (!user) {
            user = new User({ uid, email, role: 'customer' });
            await user.save();
        }
        res.status(201).json(user);
    } catch (err) {
        res.status(500).json({ message: "Error registering user", error: err });
    }
});

// Auth: Get User Role
app.get('/api/users/:uid', async (req, res) => {
    try {
        const user = await User.findOne({ uid: req.params.uid });
        if (user) res.json(user);
        else res.status(404).json({ message: "User not found" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Products: Get All
app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Products: Add New (Admin)
app.post('/api/products', async (req, res) => {
    try {
        const { name, price, description, category, image, sizes, isNewProduct } = req.body;
        if (!name || !price || !image) return res.status(400).json({ message: "Missing required fields" });

        const newProduct = new Product({ name, price, description, category, image, sizes, isNewProduct });
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(500).json({ message: "Database Error", error: err.message });
    }
});

// Razorpay: Initialize
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID, 
  key_secret: process.env.RAZORPAY_KEY_SECRET, 
});

// Payments: Create Razorpay Order
app.post('/create-order', async (req, res) => {
    try {
        const { amount } = req.body;
        const options = {
            amount: Math.round(amount * 100), 
            currency: "INR",
            receipt: `receipt_${Date.now()}`,
        };
        const order = await razorpay.orders.create(options);
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: "Razorpay Error", error });
    }
});

// Orders: Save to DB
app.post('/api/orders', async (req, res) => {
    try {
        const { cartItems, address, totalAmount, razorpay_payment_id, razorpay_order_id } = req.body;
        const newOrder = new Order({
            items: cartItems, address, totalAmount,
            paymentId: razorpay_payment_id, orderId: razorpay_order_id
        });
        await newOrder.save();
        res.status(201).json({ message: "Order saved" });
    } catch (error) {
        res.status(500).json({ message: "Error saving order", error });
    }
});

app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});