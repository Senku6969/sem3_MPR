import React, { useState } from "react";
import axios from "axios";

const RegisterMail = () => {
  const [formData, setFormData] = useState({
    carType: "",
    pickUpVenue: "",
    dropOffVenue: "",
    pickUpDate: "",
    pickUpTime: "",
    dropOffDate: "",
    dropOffTime: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    address: "",
    city: "",
    zipCode: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/register", formData);
      alert(res.data);
    } catch (error) {
      console.error(error);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      <input name="firstName" placeholder="First Name" onChange={handleChange} required />
      <input name="lastName" placeholder="Last Name" onChange={handleChange} required />
      <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
      <input name="phoneNumber" placeholder="Phone Number" onChange={handleChange} required />
      <input name="address" placeholder="Address" onChange={handleChange} required />
      <input name="city" placeholder="City" onChange={handleChange} required />
      <input name="zipCode" placeholder="ZIP Code" onChange={handleChange} required />
      <select name="carType" onChange={handleChange} required>
        <option value="">Select Car</option>
        <option value="Audi A1 S-Line">Audi A1 S-Line</option>
        <option value="VW Golf 6">VW Golf 6</option>
        <option value="Toyota Camry">Toyota Camry</option>
        <option value="BMW 320 ModernLine">BMW 320 ModernLine</option>
        <option value="Mercedes-Benz GLC">Mercedes-Benz GLC</option>
        <option value="VW Passat CC">VW Passat CC</option>
      </select>
      <select name="pickUpVenue" onChange={handleChange} required>
        <option value="">Select Pickup Venue</option>
        <option value="Delhi">Delhi</option>
        <option value="Kolkata">Kolkata</option>
        <option value="Bengaluru">Bengaluru</option>
        <option value="Mumbai">Mumbai</option>
        <option value="Goa">Goa</option>
      </select>
      <select name="dropOffVenue" onChange={handleChange} required>
        <option value="">Select Drop-off Venue</option>
        <option value="Delhi">Delhi</option>
        <option value="Kolkata">Kolkata</option>
        <option value="Bengaluru">Bengaluru</option>
        <option value="Mumbai">Mumbai</option>
        <option value="Goa">Goa</option>
      </select>
      <input name="pickUpDate" type="date" onChange={handleChange} required />
      <input name="pickUpTime" type="time" onChange={handleChange} required />
      <input name="dropOffDate" type="date" onChange={handleChange} required />
      <input name="dropOffTime" type="time" onChange={handleChange} required />
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterMail;