const mongoose = require('mongoose');

const UserRegSchema = new mongoose.Schema({
    carType: {
        type: String,
        required: true,
        enum: [
            'Audi A1 S-Line',
            'VW Golf 6',
            'Toyota Camry',
            'BMW 320 ModernLine',
            'Mercedes-Benz GLC',
            'VW Passat CC'
        ],
    },
    pickUpVenue: {
        type: String,
        required: true,
        enum: [
            'Delhi',
            'Kolkata',
            'Bengaluru',
            'Mumbai',
            'Goa'
        ],
    },
    dropOffVenue: {
        type: String,
        required: true,
        enum: [
            'Delhi',
            'Kolkata',
            'Bengaluru',
            'Mumbai',
            'Goa'
        ],
    },
    pickUpDate: {
        type: Date,
        required: true,
    },
    pickUpTime: {
        type: String, // You can also use Date if you want to include a specific date
        required: true,
    },
    dropOffDate: {
        type: Date,
        required: true,
    },
    dropOffTime: {
        type: String, // You can also use Date if you want to include a specific date
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /^([+91]?[-\s]?)?[789]\d{9}$/.test(v); // Validation for Indian mobile numbers
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true, // Ensures no duplicate email addresses
        validate: {
            validator: function(v) {
                return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v); // Basic email regex validation
            },
            message: props => `${props.value} is not a valid email!`
        }
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    city: {
        type: String,
        required: true
    },
    zipCode: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /^[1-9][0-9]{5}$/.test(v); // Validation for Indian PIN codes (6 digits)
            },
            message: props => `${props.value} is not a valid zip code!`
        }
    }
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

module.exports = mongoose.model('User', UserRegSchema);