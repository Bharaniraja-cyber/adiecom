require('dotenv').config(); 
const express = require('express');
const cors = require('cors');
const Razorpay = require('razorpay');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 5002;

const corsOptions = {
    origin: ["https://adiecom.vercel.app", "https://adiecom-rkx8ww4hl-bharanirajas-projects.vercel.app", "http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], 
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    optionsSuccessStatus: 200 
};

app.use(cors(corsOptions));

app.use((req, res, next) => {
    res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
    next();
});

app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).send("🚀 Adidas E-com API is live and running!");
});

// Connect to MongoDB Atlas
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
    role: { type: String, default: 'customer' },
    savedAddress: {
        fullName: String,
        phone: String,
        pin: String,
        street: String,
        city: String,
        stateName: String
    }
});
const User = mongoose.model('User', userSchema);

// --- AUTH & ADDRESS ROUTES ---
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

app.get('/api/users/:uid', async (req, res) => {
    try {
        const user = await User.findOne({ uid: req.params.uid });
        if (user) res.json(user);
        else res.status(404).json({ message: "User not found" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.put('/api/users/address/:uid', async (req, res) => {
    try {
        const { address } = req.body;
        const updatedUser = await User.findOneAndUpdate(
            { uid: req.params.uid },
            { $set: { savedAddress: address } },
            { new: true }
        );
        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(500).json({ message: "Error saving address", error: err });
    }
});

// --- PRODUCT ROUTES (CRUD) ---
app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.post('/api/products', async (req, res) => {
    try {
        const { name, price, description, category, image, sizes, isNewProduct } = req.body;
        const newProduct = new Product({ name, price, description, category, image, sizes, isNewProduct });
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(500).json({ message: "Database Error", error: err.message });
    }
});

// NEW: Update Product
app.put('/api/products/:id', async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedProduct);
    } catch (err) {
        res.status(500).json({ message: "Update Error", error: err.message });
    }
});

// NEW: Delete Product
app.delete('/api/products/:id', async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Delete Error", error: err.message });
    }
});

// --- RAZORPAY & ORDER ROUTES ---
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID, 
  key_secret: process.env.RAZORPAY_KEY_SECRET, 
});

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

app.post('/api/orders', async (req, res) => {
    try {
        const { uid, cartItems, address, totalAmount, razorpay_payment_id, razorpay_order_id } = req.body;
        const newOrder = new Order({
            uid, items: cartItems, address, totalAmount,
            paymentId: razorpay_payment_id, orderId: razorpay_order_id
        });
        await newOrder.save();
        res.status(201).json({ message: "Order saved" });
    } catch (error) {
        res.status(500).json({ message: "Error saving order", error });
    }
});

// NEW: Get ALL orders (For Admin Sales Dashboard)
app.get('/api/orders/all', async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: "Error fetching all orders", error: err });
    }
});

app.get('/api/orders/user/:uid', async (req, res) => {
    try {
        const orders = await Order.find({ uid: req.params.uid }).sort({ createdAt: -1 });
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: "Error fetching orders", error: err });
    }
});

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});