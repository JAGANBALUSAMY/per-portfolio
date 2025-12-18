# Deployment Instructions: Vercel Frontend + Render Backend

## Current Setup
- Frontend: Already deployed on Vercel
- Backend: Needs to be deployed on Render
- Goal: Connect both services

## Deploying Backend to Render

### Prerequisites
1. Create accounts on [Render](https://render.com/) if you haven't already
2. Connect your GitHub account to Render

### Deployment Steps

#### Deploy the Backend Only
1. Go to Render Dashboard
2. Click "New+" → "Web Service"
3. Connect to your GitHub repository
4. Set the following configuration:
   - **Name**: portfolio-backend (or your preferred name)
   - **Region**: Choose the closest region to you
   - **Branch**: main (or your default branch)
   - **Root Directory**: backend
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

5. Add Environment Variables:
   - `EMAIL_USER`: your-email@gmail.com
   - `EMAIL_PASS`: your-app-password
   - `PORT`: 10000

6. Click "Create Web Service"

### After Deployment

#### 1. Get Your Backend URL
After deployment completes, note your backend URL from Render (will look like `https://portfolio-backend-xxxx.onrender.com`)

#### 2. Update Frontend Configuration
Update your frontend Contact.jsx:
```javascript
// TODO: Replace 'your-render-backend-app-name' with your actual Render backend app name
const backendUrl = process.env.NODE_ENV === 'production' 
  ? 'https://your-render-backend-app-name.onrender.com/api/contact' 
  : 'http://localhost:3001/api/contact';
```

#### 3. Update Backend CORS Configuration
Update CORS in your backend server.js:
```javascript
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://jagan-b-portfolio.vercel.app']
    : 'http://localhost:5173',
  optionsSuccessStatus: 200
};
```

#### 4. Redeploy
Redeploy your backend service on Render for the changes to take effect.

### Environment Variables Needed

#### Backend Environment Variables:
- `EMAIL_USER`: Your Gmail address
- `EMAIL_PASS`: Your Gmail app password
- `PORT`: 10000 (Render's default port)

### Troubleshooting

#### Common Issues:
1. **CORS Errors**: Make sure your Vercel frontend URL is added to the CORS origins in the backend
2. **Email Sending Failures**: Verify your Gmail credentials and app password
3. **500 Errors**: Check Render logs for detailed error messages

#### Checking Logs:
1. Go to your Render dashboard
2. Click on your service
3. Click on "Logs" tab to see real-time logs

### Alternative Email Providers

If Gmail continues to have connection issues, consider:
1. **SendGrid**: Offers 100 emails/day free
2. **Mailgun**: Offers 5,000 emails/month free
3. **Postmark**: Offers 100 emails/month free

To switch providers, update the transporter configuration in `backend/server.js`.