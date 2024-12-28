import { OAuth2Client } from 'google-auth-library';
import User from '../models/Users.js';
import '../../env.js';
import axios from 'axios';
import jwt from 'jsonwebtoken';

const REDIRECT_URI = process.env.BASE_URL + '/auth/google/callback';

/**
 * @swagger
 * /api/auth/google:
 *   get:
 *     summary: Initiate Google OAuth login flow
 *     description: Redirects the user to Google’s OAuth2.0 authentication screen.
 *     tags: [URL Shortening auth related apis]
 *     responses:
 *       302:
 *         description: Redirected to Google OAuth
 */
export const googleLogin = async (req, res) => {
  const googleAuthURL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=email%20profile`;
  console.log('hello world');
  res.redirect(googleAuthURL);
};

/**
 * @swagger
 * /api/auth/google/callback:
 *   get:
 *     summary: Handle the Google OAuth callback
 *     description: Handles Google OAuth callback, exchanges the authorization code for tokens, and creates or updates the user.
 *      tags: [URL Shortening auth related apis]
 *     parameters:
 *       - in: query
 *         name: code
 *         required: true
 *         description: The authorization code received from Google OAuth
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User successfully authenticated and returned
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 *               example: "<script>window.opener.postMessage(...); window.close();</script>"
 *       400:
 *         description: Missing or invalid authorization code
 *       500:
 *         description: Server error while processing the Google callback
 */
export const googleCallback = async (req, res) => {
  const { code } = req.query;

  if (!code) {
    return res.status(400).json({ error: 'No authorization code provided' });
  }

  try {
    const tokenResponse = await axios.post(
      'https://oauth2.googleapis.com/token',
      {
        code,
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        redirect_uri: REDIRECT_URI,
        grant_type: 'authorization_code',
      },
      { headers: { 'Content-Type': 'application/json' } }
    );

    const { id_token, access_token } = tokenResponse.data;

    // Decode the ID token to get user information
    const userInfo = jwt.decode(id_token);
    console.log(userInfo);

    let user = await User.findOne({ email: userInfo.email });
    if (!user) {
      user = new User({ email: userInfo.email, name: userInfo.name });
      await user.save();
    }

    const htmlResponse = `
      <script>
        window.opener.postMessage(${JSON.stringify(user)}, '*');
        window.close();
      </script>
    `;

    res.send(htmlResponse);

  } catch (error) {
    console.error('Error during Google OAuth:', error);
    res.status(500).json({ error: 'Authentication failed' });
  }
};
