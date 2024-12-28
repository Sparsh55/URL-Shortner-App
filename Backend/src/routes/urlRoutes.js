import express from 'express';
import { shortenUrl, redirectUrl, getUrlAnalytics } from '../controllers/urlController.js';

const URLrouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: URL Shortening
 *   description: URL shortening related endpoints
 */

/**
 * @swagger
 * path:
 *  /api/url:
 *    post:
 *      summary: Create a shortened URL
 *      tags: [URL Shortening]
 *      description: Shortens the provided long URL and returns the short URL.
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                longUrl:
 *                  type: string
 *                  description: The original long URL to be shortened.
 *                customAlias:
 *                  type: string
 *                  description: Optional custom alias for the shortened URL.
 *                topic:
 *                  type: string
 *                  description: Optional topic associated with the URL.
 *      responses:
 *        200:
 *          description: Successfully shortened URL
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  longUrl:
 *                    type: string
 *                    description: The original long URL.
 *                  shortUrl:
 *                    type: string
 *                    description: The shortened URL.
 *                  alias:
 *                    type: string
 *                    description: The alias for the shortened URL.
 *                  topic:
 *                    type: string
 *                    description: The topic associated with the shortened URL.
 */
URLrouter.post('/', shortenUrl);

/**
 * @swagger
 * path:
 *  /api/url/{alias}:
 *    get:
 *      summary: Redirect to the original URL
 *      tags: [URL Shortening]
 *      description: Redirects the user to the original long URL based on the alias.
 *      parameters:
 *        - in: path
 *          name: alias
 *          required: true
 *          description: The alias of the shortened URL.
 *          schema:
 *            type: string
 *      responses:
 *        302:
 *          description: Redirect to the original long URL
 *        404:
 *          description: URL not found
 */
URLrouter.get('/:alias', redirectUrl);

/**
 * @swagger
 * path:
 *  /api/url/analytics/{alias}:
 *    get:
 *      summary: Get analytics for a shortened URL
 *      tags: [URL Shortening]
 *      description: Retrieves analytics (e.g., number of hits) for a specific shortened URL.
 *      parameters:
 *        - in: path
 *          name: alias
 *          required: true
 *          description: The alias of the shortened URL for which analytics are requested.
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: Successfully retrieved URL analytics
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  alias:
 *                    type: string
 *                    description: The alias of the shortened URL.
 *                  analytics:
 *                    type: object
 *                    description: Analytics data for the URL (e.g., number of visits).
 *        404:
 *          description: URL not found
 */
URLrouter.get('/analytics/:alias', getUrlAnalytics);

export default URLrouter;
