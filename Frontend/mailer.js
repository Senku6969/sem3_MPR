const express = require('express');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const User = require('./models/UserReg');        // Named import for User model
const Contact = require('./models/ContactUs'); // Import the Contact model
const Newsletter = require('./models/newsletter'); // Import Newsletter model
require('dotenv').config();
const uri = 'mongodb://localhost:27017/user_management';

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 30000, // Increase to 30 seconds
    socketTimeoutMS: 45000, // Increase socket timeout to 45 seconds
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

/* ------------------- User Registration Route ------------------- */
app.post('/register', async (req, res) => {
    const {
        carType,
        pickUpVenue,
        dropOffVenue,
        pickUpDate,
        pickUpTime,
        dropOffDate,
        dropOffTime,
        firstName,
        lastName,
        phoneNumber,
        email,
        address,
        city,
        zipCode
    } = req.body;  // Destructure all fields from the request body

    try {
        // Save the user in the database
        const newUser = new User({
            carType,
            pickUpVenue,
            dropOffVenue,
            pickUpDate,
            pickUpTime,
            dropOffDate,
            dropOffTime,
            firstName,
            lastName,
            phoneNumber,
            email,
            address,
            city,
            zipCode
        });

        // Log the incoming request body
        console.log(req.body);

        // Save the new user to the database
        await newUser.save();

        // Set up nodemailer to send confirmation email
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: 'Registration Successful',
            text: `Hello ${firstName} ${lastName},\n\nThank you for registering! We have successfully booked a ${carType} for you.`
        };

        // Send the confirmation email
        await transporter.sendMail(mailOptions);

        // Respond with success
        res.status(200).send('Registration successful and email sent!');
    } catch (error) {
        // Handle errors during user save or email sending
        console.error('Error during registration:', error);
        res.status(500).send('Error during registration.');
    }
});

/* ------------------- Contact Us Route ------------------- */
app.post('/contact', async (req, res) => {
  const { fullName, email, message } = req.body;

  try {
    const newContact = new Contact({ fullName, email, message });
    await newContact.save();
    res.status(200).send('Message received and stored successfully!');
  } catch (error) {
    console.error('Error storing contact message:', error);
    res.status(500).send('Failed to submit the message.');
  }
});

/* ---------------- Newsletter Subscription Route ---------------- */
app.post('/newsletter', async (req, res) => {
  const { email } = req.body;

  try {
    const newSubscriber = new Newsletter({ email });
    await newSubscriber.save();
    res.status(200).send('Subscribed to newsletter successfully!');
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).send('This email is already subscribed.');
    } else {
      console.error('Newsletter subscription error:', error);
      res.status(500).send('Failed to subscribe.');
    }
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
