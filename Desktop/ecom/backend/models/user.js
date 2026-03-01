// models/User.js
const userSchema = new mongoose.Schema({
    uid: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    role: { type: String, default: 'customer' },
    savedAddress: {
        fullName: String,
        phone: String,
        street: String,
        city: String,
        state: String,
        pincode: String
    }
});
const User = mongoose.model('User', userSchema);

// API to Create/Save User in MongoDB during Signup
app.post('/api/users/register', async (req, res) => {
    try {
        const { uid, email } = req.body;
        // Check if user already exists
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

// API to Fetch User Role for the Admin Guard
app.get('/api/users/:uid', async (req, res) => {
    try {
        const user = await User.findOne({ uid: req.params.uid });
        if (user) res.json(user);
        else res.status(404).json({ message: "User not found" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update user address
app.put('/api/users/address/:uid', async (req, res) => {
    try {
        const { address } = req.body;
        const updatedUser = await User.findOneAndUpdate(
            { uid: req.params.uid },
            { $set: { savedAddress: address } },
            { new: true } // Returns the updated document
        );
        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(500).json({ message: "Error saving address", error: err });
    }
});