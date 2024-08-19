// SimpleForm.js

import React, { useState } from 'react';
import axios from 'axios';

const SimpleForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '' });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const csrfResponse = await axios.get('http://127.0.0.1:8000/api/signup/');
      const csrfToken = csrfResponse.data.csrfToken;

      const response = await axios.post('http://127.0.0.1:8000/api/simpledata/', formData, {
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken,
        },
      });

      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" name="name" value={formData.name} onChange={handleChange} />
      </label>
      <br />
      <label>
        Email:
        <input type="email" name="email" value={formData.email} onChange={handleChange} />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};

export default SimpleForm;
