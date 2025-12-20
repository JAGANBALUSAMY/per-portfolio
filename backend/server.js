const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

console.log('Environment variables loaded:');
console.log('- BREVO_API_KEY:', process.env.BREVO_API_KEY ? 'SET' : 'NOT SET');
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
  try {
    const { name, contact, description } = req.body;
    console.log('Received contact form submission:', { name, contact, description });

    if (!name || !contact || !description) {
      return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    // Use Gmail SMTP for local testing, Brevo for production
    if (process.env.NODE_ENV !== 'production') {
      console.log('Using Gmail SMTP for local testing');
      
      // Validate Gmail credentials
      if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        console.error('EMAIL_USER or EMAIL_PASS environment variables not set');
        return res.status(500).json({
          success: false,
          message: 'Email configuration error.'
        });
      }
      
      try {
        const nodemailer = require('nodemailer');
        
        // Create transporter
        const transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 587,
          secure: false,
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
          },
          tls: { rejectUnauthorized: false }
        });
        
        // Mail options
        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: 'jaganbalusamy@gmail.com',
          subject: `Portfolio Contact from ${name}`,
          text: `Name: ${name}\nContact: ${contact}\nMessage: ${description}`
        };
        
        // Send email
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully via Gmail SMTP');
        
        return res.status(200).json({
          success: true,
          message: 'Message sent successfully!'
        });
      } catch (gmailError) {
        console.error('Gmail SMTP error:', gmailError);
        throw gmailError;
      }
    } else {
      // Use Brevo (Sendinblue) HTTP API for production
      console.log('Using Brevo HTTP API for email sending');
      
      // Validate Brevo API key
      if (!process.env.BREVO_API_KEY) {
        console.error('BREVO_API_KEY environment variable is not set');
        return res.status(500).json({
          success: false,
          message: 'Server configuration error. Please contact administrator.'
        });
      }
      
      try {
        const fetch = (await import('node-fetch')).default;
        
        // Prepare email data for Brevo API
        const emailData = {
          sender: {
            name: 'Portfolio Contact Form',
            email: 'jaganbalusamy@gmail.com'
          },
          to: [
            {
              email: 'jaganbalusamy@gmail.com',
              name: 'Jagan B'
            }
          ],
          subject: `Portfolio Contact from ${name}`,
          htmlContent: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Contact Info:</strong> ${contact}</p>
            <p><strong>Message:</strong></p>
            <p>${description}</p>
          `,
          textContent: `
            Name: ${name}
            Contact Info: ${contact}
            Message: ${description}
          `
        };
        
        console.log('Sending email via Brevo API...');
        
        const response = await fetch('https://api.brevo.com/v3/smtp/email', {
          method: 'POST',
          headers: {
            'accept': 'application/json',
            'api-key': process.env.BREVO_API_KEY,
            'content-type': 'application/json'
          },
          body: JSON.stringify(emailData)
        });
        
        const responseData = await response.json();
        
        if (response.ok) {
          console.log('Email sent successfully via Brevo API', responseData.messageId);
          res.status(200).json({ 
            success: true, 
            message: 'Message sent successfully!' 
          });
        } else {
          console.error('Brevo API error:', responseData);
          
          // Handle specific Brevo errors
          if (responseData.code === 'permission_denied') {
            return res.status(403).json({
              success: false,
              message: 'Email service needs activation. Please contact administrator.'
            });
          }
          
          if (responseData.code === 'unauthorized') {
            return res.status(401).json({
              success: false,
              message: 'Email service not properly configured. Please contact administrator.'
            });
          }
          
          throw new Error(`Brevo API returned status ${response.status}: ${responseData.message}`);
        }
      } catch (brevoError) {
        console.error('Brevo HTTP API failed:', brevoError);
        if (!res.headersSent) {
          res.status(500).json({
            success: false,
            message: 'Failed to send message. Please try again later.'
          });
        }
      }
    }
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