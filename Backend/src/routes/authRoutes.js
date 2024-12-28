import express from 'express';
import { googleLogin, googleCallback } from '../controllers/authController.js';

const Authrouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: URL Shortening auth related apis
 *   description: URL shortening related endpoints
 */

/**
 * 
 * 
 * @swagger
 * /api/auth/google:
 *   get:
 *     summary: Redirects the user to Google's OAuth 2.0 authentication page.
 *     description: Initiates the OAuth 2.0 flow for Google login. Redirects to Google's authentication page.
 *     responses:
 *       302:
 *         description: Redirects to the Google OAuth page.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * tags:
 *   name: URL Shortening auth related apis
 *   description: URL shortening related endpoints
 */


/**
 * @swagger
 * /api/auth/google/callback:
 *   get:
 *     summary: Handles Google OAuth 2.0 callback.
 *     description: Processes the Google OAuth 2.0 callback, exchanges the authorization code for tokens, and handles user information.
 *     parameters:
 *       - in: query
 *         name: code
 *         schema:
 *           type: string
 *         required: true
 *         description: Authorization code returned by Google after user consents.
 *     responses:
 *       200:
 *         description: User authentication successful, user details are sent back.
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 *               example: HTML script for passing user data to the opener window.
 *       400:
 *         description: Bad request. Authorization code missing.
 *       500:
 *         description: Internal server error during authentication.
 */

Authrouter.get('/google', googleLogin);
Authrouter.get('/google/callback', googleCallback)

export default Authrouter;
