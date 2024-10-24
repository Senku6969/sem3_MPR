const express = require('express');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const User = require('./Models/UserReg');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));

// Registration endpoint
app.post('/register', async (req, res) => {
    const { email, fullName } = req.body;

    try {
        // Save user to the database
        const newUser = new User({ email, firstName, lastName });
        await newUser.save();

        // Sending email
        const transporter = nodemailer.createTransport({
            service: 'gmail', // Use your email service
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: 'Registration Successful',
            text: `Hello ${fullName},\n\nThank you for registering on our website!`
        };

        await transporter.sendMail(mailOptions);
        res.status(200).send('Registration successful, email sent!');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error during registration');
    }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
