const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    uid: String, 
    items: Array,
    address: Object,
    totalAmount: Number,
    paymentId: String,
    orderId: String,
    status: { type: String, default: 'Processing' }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);