const mongoose = require('mongoose');

const newsletterSchema = new mongoose.Schema({
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
    }
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

const Newsletter = mongoose.model('Newsletter', newsletterSchema);

module.exports = Newsletter;