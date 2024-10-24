import React, { useState } from "react";
import Footer from "../components/Footer";
import HeroPages from "../components/HeroPages";
import axios from "axios";

function Contact() {
  // State to manage contact form and newsletter subscription inputs
  const [formData, setFormData] = useState({ fullName: "", email: "", message: "" });
  const [newsletterEmail, setNewsletterEmail] = useState(""); // For newsletter subscription
  const [responseMessage, setResponseMessage] = useState(""); // To show response from backend

  // Handle input changes for contact form
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle contact form submission
  const handleContactSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/contact", formData);
      setResponseMessage(response.data);
    } catch (error) {
      console.error("Error sending message:", error);
      setResponseMessage("Failed to send message. Please try again.");
    }
  };

  // Handle newsletter subscription submission
  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/newsletter", { email: newsletterEmail });
      setResponseMessage(response.data);
    } catch (error) {
      console.error("Error subscribing to newsletter:", error);
      setResponseMessage(error.response?.data || "Subscription failed.");
    }
  };

  return (
    <>
      <section className="contact-page">
        <HeroPages name="Contact" />
        <div className="container">
          <div className="contact-div">
            <div className="contact-div__text">
              <h2>Need additional information?</h2>
              <p>Leave us a message and we will respond as soon as possible!</p>
              <a href="/">
                <i className="fa-solid fa-phone"></i>&nbsp; 123-456-7869
              </a>
              <a href="/">
                <i className="fa-solid fa-envelope"></i>&nbsp; rentwheels@xyz
              </a>
              <a href="/">
                <i className="fa-solid fa-location-dot"></i>&nbsp; Mumbai, Maharashtra
              </a>
            </div>

            {/* Contact Form */}
            <div className="contact-div__form">
              <form onSubmit={handleContactSubmit}>
                <label>
                  Full Name <b>*</b>
                </label>
                <input
                  type="text"
                  name="fullName"
                  placeholder='E.g: "Joe Shmoe"'
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />

                <label>
                  Email <b>*</b>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="youremail@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />

                <label>
                  Tell us about it <b>*</b>
                </label>
                <textarea
                  name="message"
                  placeholder="Write Here.."
                  value={formData.message}
                  onChange={handleChange}
                  required
                />

                <button type="submit">
                  <i className="fa-solid fa-envelope-open-text"></i>&nbsp; Send Message
                </button>
              </form>

              {/* Newsletter Subscription Form */}
              <form onSubmit={handleNewsletterSubmit} style={{ marginTop: "20px" }}>
                <h3>Subscribe to Our Newsletter</h3>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  required
                />
                <button type="submit">
                  <i className="fa-solid fa-envelope"></i>&nbsp; Subscribe
                </button>
              </form>

              {/* Display Response Messages */}
              {responseMessage && <p>{responseMessage}</p>}
            </div>
          </div>
        </div>

        <div className="book-banner">
          <div className="book-banner__overlay"></div>
          <div className="container">
            <div className="text-content">
              <h2>Book a car by getting in touch with us</h2>
              <span>
                <i className="fa-solid fa-phone"></i>
                <h3>123-456-7869</h3>
              </span>
            </div>
          </div>
        </div>

        <Footer />
      </section>
    </>
  );
}

export default Contact;
