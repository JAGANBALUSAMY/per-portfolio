const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs').promises;
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 10000;

// Middleware
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://jagan-b-portfolio.vercel.app']
    : 'http://localhost:5173',
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

    // Create transporter object using SMTP transport
    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      },
      tls: {
        rejectUnauthorized: false
      }
    });

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

    try {
      // Try to send email
      await transporter.sendMail(mailOptions);
      console.log('Email sent successfully to jaganbalusamy@gmail.com');
      res.status(200).json({ 
        success: true, 
        message: 'Message sent successfully!' 
      });
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      
      // Save to file as backup
      try {
        const timestamp = new Date().toISOString();
        const submissionData = {
          timestamp,
          name,
          contact,
          description
        };
        
        // Create submissions directory if it doesn't exist
        const submissionsDir = path.join(__dirname, 'submissions');
        await fs.mkdir(submissionsDir, { recursive: true });
        
        // Save submission to file
        const fileName = `submission-${timestamp.replace(/[:.]/g, '-')}.json`;
        const filePath = path.join(submissionsDir, fileName);
        await fs.writeFile(filePath, JSON.stringify(submissionData, null, 2));
        
        console.log('Submission saved to file:', filePath);
        
        res.status(200).json({ 
          success: true, 
          message: 'Message received! (Email delivery failed but your message was saved.)' 
        });
      } catch (fileError) {
        console.error('Failed to save submission to file:', fileError);
        throw emailError; // Re-throw the original email error
      }
    }
  } catch (error) {
    console.error('Error sending email:', error);
    // Check if headers have already been sent
    if (!res.headersSent) {
      // Handle specific network timeout errors
      if (error.code === 'ESOCKET' || error.code === 'ETIMEDOUT') {
        res.status(500).json({ 
          success: false, 
          message: 'Unable to connect to email server. Please try again later or contact via email directly.',
          error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: 'Failed to send message. Please try again later.',
          error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
      }
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