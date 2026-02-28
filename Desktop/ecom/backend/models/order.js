const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    items: Array,
    address: Object,
    totalAmount: Number,
    paymentId: String,
    orderId: String,
    status: { type: String, default: 'Paid' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);