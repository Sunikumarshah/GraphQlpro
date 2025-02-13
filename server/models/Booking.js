const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Booking schema
const bookingSchema = new Schema({
    user: String,
    destination: String,
    travelDate: String,
    returnDate: String,
    seats: Number,
    status: String
});

module.exports = mongoose.model('Booking', bookingSchema);
