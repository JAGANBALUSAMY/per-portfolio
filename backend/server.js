const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

console.log('Environment variables loaded:');
console.log('- EMAIL_USER:', process.env.EMAIL_USER ? 'SET' : 'NOT SET');
console.log('- PORT:', process.env.PORT || 'Using default');

const app = express();
const PORT = process.env.PORT || 10000;
console.log(`Server starting on port ${PORT}`);

const corsOptions = {
  origin: [
    'https://jagan-b-portfolio.vercel.app',
    'http://localhost:5173',
    'http://localhost:3000'
  ],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/api/contact', async (req, res) => {
  let transporter; // ✅ FIX: moved here (GLOBAL to handler)

  try {
    const { name, contact, description } = req.body;
    console.log('Received contact form submission:', { name, contact, description });

    if (!name || !contact || !description) {
      return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      return res.status(500).json({
        success: false,
        message: 'Email configuration error.'
      });
    }

    console.log('Attempting to send email with credentials:', {
      user: process.env.EMAIL_USER,
      hasPassword: !!process.env.EMAIL_PASS
    });

    if (process.env.FORMSPREE_ENDPOINT) {
      console.log('Using Formspree HTTP API');
      const fetch = (await import('node-fetch')).default;
      const formData = new URLSearchParams();
      formData.append('name', name);
      formData.append('contact', contact);
      formData.append('description', description);

      const response = await fetch(process.env.FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' }
      });

      if (response.ok) {
        return res.status(200).json({ success: true, message: 'Message sent successfully!' });
      }
      throw new Error(`Formspree failed: ${response.status}`);
    }

    const gmailConfig1 = {
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      },
      tls: { rejectUnauthorized: false }
    };

    const gmailConfig2 = {
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      },
      tls: { rejectUnauthorized: false }
    };

    try {
      transporter = nodemailer.createTransport(gmailConfig1);
      console.log('Created transporter with Gmail config 1');
    } catch {
      transporter = nodemailer.createTransport(gmailConfig2);
      console.log('Created transporter with Gmail config 2');
    }

    console.log('Transporter created successfully');

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'jaganbalusamy@gmail.com',
      subject: `Portfolio Contact from ${name}`,
      text: `Name: ${name}\nContact: ${contact}\nMessage: ${description}`
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({
      success: true,
      message: 'Message sent successfully!'
    });

  } catch (error) {
    console.error('Contact form error:', error);
    if (!res.headersSent) {
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
