const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate: {
            validator: function(v) {
                return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v); // Basic email regex
            },
            message: props => `${props.value} is not a valid email!`
        }
    },
    message: {
        type: String,
        required: true,
        trim: true
    }
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;