const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const path = require('path');
// Load environment variables
require('dotenv').config();

// Log environment variables for debugging (without exposing sensitive data)
console.log('Environment variables loaded:');
console.log('- EMAIL_USER:', process.env.EMAIL_USER ? 'SET' : 'NOT SET');
console.log('- PORT:', process.env.PORT || 'Using default');

const app = express();
// Use Render's PORT or default to 10000
const PORT = process.env.PORT || 10000;
console.log(`Server starting on port ${PORT}`);

// Middleware
// Enable CORS with specific configuration
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

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, contact, description } = req.body;
    
    // Log incoming request for debugging
    console.log('Received contact form submission:', { name, contact, description });
    
    // Validate required fields
    if (!name || !contact || !description) {
      return res.status(400).json({ 
        success: false, 
        message: 'All fields are required.' 
      });
    }

    // Check if environment variables are set
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error('Email configuration missing. Check your .env file.');
      return res.status(500).json({ 
        success: false, 
        message: 'Email configuration error. Please contact administrator.' 
      });
    }

    // Validate environment variables
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error('Missing EMAIL_USER or EMAIL_PASS environment variables');
      return res.status(500).json({
        success: false,
        message: 'Server configuration error. Please contact administrator.'
      });
    }

    console.log('Attempting to send email with credentials:', {
      user: process.env.EMAIL_USER,
      hasPassword: !!process.env.EMAIL_PASS
    });

    // Try multiple Gmail configurations
    let transporter;
    
    // Configuration 1: Standard Gmail (port 587, STARTTLS)
    const gmailConfig1 = {
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      },
      tls: {
        rejectUnauthorized: false
      },
      connectionTimeout: 30000,
      greetingTimeout: 30000,
      socketTimeout: 30000
    };
    
    // Configuration 2: Gmail with SSL (port 465)
    const gmailConfig2 = {
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      },
      tls: {
        rejectUnauthorized: false
      },
      connectionTimeout: 30000,
      greetingTimeout: 30000,
      socketTimeout: 30000
    };
    
    // Try configuration 1 first
    try {
      transporter = nodemailer.createTransport(gmailConfig1);
      console.log('Created transporter with Gmail config 1 (port 587)');
    } catch (transportError1) {
      console.error('Failed to create transporter with Gmail config 1:', transportError1.message);
      
      // Try configuration 2
      try {
        transporter = nodemailer.createTransport(gmailConfig2);
        console.log('Created transporter with Gmail config 2 (port 465)');
      } catch (transportError2) {
        console.error('Failed to create transporter with Gmail config 2:', transportError2.message);
        throw new Error('Failed to create email transporter with both Gmail configurations');
      }
    }

    console.log('Transporter created successfully');

    // Define email options
    let mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'jaganbalusamy@gmail.com',
      subject: `Portfolio Contact from ${name}`,
      text: `
        Name: ${name}
        Contact Info: ${contact}
        Message: ${description}
      `,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Contact Info:</strong> ${contact}</p>
        <p><strong>Message:</strong></p>
        <p>${description}</p>
      `
    };

    // Add retry logic for email sending
    let retryCount = 0;
    const maxRetries = 3;
    
    while (retryCount <= maxRetries) {
      try {
        console.log(`Attempting to send email (attempt ${retryCount + 1}/${maxRetries + 1}):`, {
          from: mailOptions.from,
          to: mailOptions.to,
          subject: mailOptions.subject
        });
        
        // Try to send email
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully to jaganbalusamy@gmail.com', info.messageId);
        res.status(200).json({ 
          success: true, 
          message: 'Message sent successfully!' 
        });
        return; // Exit the loop on success
      } catch (emailError) {
        retryCount++;
        console.error(`Email sending failed (attempt ${retryCount}/${maxRetries + 1}):`, emailError);
        console.error('Error details:', {
          message: emailError.message,
          code: emailError.code,
          command: emailError.command
        });
        
        // If we've reached max retries, return error
        if (retryCount > maxRetries) {
          console.error('Max retries reached. Email sending failed permanently.');
          // Return error without saving to file
          res.status(500).json({ 
            success: false, 
            message: 'Failed to send message after multiple attempts. Please try again later.',
            error: process.env.NODE_ENV === 'development' ? emailError.message : undefined
          });
          return;
        }
        
        // Wait before retrying (exponential backoff)
        const waitTime = Math.pow(2, retryCount) * 1000; // 2s, 4s, 8s
        console.log(`Waiting ${waitTime}ms before retry...`);
        await new Promise(resolve => setTimeout(resolve, waitTime));
      }
    }
  } catch (error) {
    console.error('Unexpected error in contact form handler:', error);
    console.error('Error details:', {
      message: error.message,
      code: error.code,
      stack: error.stack
    });
    // Check if headers have already been sent
    if (!res.headersSent) {
      res.status(500).json({ 
        success: false, 
        message: 'Internal server error. Please try again later.',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Backend server is running' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});