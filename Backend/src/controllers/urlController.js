import Url from '../models/URL.js';
import { generateShortUrl, getAnalyticsForUrl } from '../Utils/UrlUtil.js';

// Create a short URL
/**
 * @swagger
 * /api/url:
 *   post:
 *     summary: Create a shortened URL
 *     description: Accepts a long URL and generates a shortened URL. Optionally, a custom alias can be provided.
 *     tags: [URL Shortening]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - longUrl
 *             properties:
 *               longUrl:
 *                 type: string
 *                 description: The original long URL to be shortened.
 *               customAlias:
 *                 type: string
 *                 description: A custom alias for the shortened URL (optional).
 *               topic:
 *                 type: string
 *                 description: A topic or category associated with the URL.
 *     responses:
 *       200:
 *         description: Successfully shortened URL
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 longUrl:
 *                   type: string
 *                   description: The original long URL.
 *                 shortUrl:
 *                   type: string
 *                   description: The shortened URL.
 *                 alias:
 *                   type: string
 *                   description: The alias for the shortened URL.
 *                 topic:
 *                   type: string
 *                   description: The topic associated with the shortened URL.
 */
export const shortenUrl = async (req, res) => {
  const { longUrl, customAlias, topic } = req.body;
  const alias = customAlias || generateShortUrl();
  const shortUrl = `${process.env.BASE_URL}/url/${alias}`;

  const newUrl = new Url({
    longUrl,
    shortUrl,
    alias,
    topic,
    createdAt: new Date(),
  });

  await newUrl.save();
  console.log(newUrl);
  res.json(newUrl);
};

// Redirect to original URL
/**
 * @swagger
 * /api/url/{alias}:
 *   get:
 *     summary: Redirect to the original URL
 *     description: Redirects the user to the original long URL.
 *     tags: [URL Shortening]
 *     parameters:
 *       - in: path
 *         name: alias
 *         required: true
 *         description: The alias of the shortened URL.
 *         schema:
 *           type: string
 *     responses:
 *       302:
 *         description: Redirect to the original long URL
 *       404:
 *         description: URL not found
 */
export const redirectUrl = async (req, res) => {
  const { alias } = req.params;

  console.log(alias);
  const urlData = await Url.findOne({ alias });

  if (!urlData) {
    return res.status(404).json({ message: 'URL not found' });
  }

  // Log redirect for analytics
  const data = await getAnalyticsForUrl(urlData);
  console.log(data);

  // Redirect the user
  res.redirect(urlData.longUrl);
};

// Get URL Analytics
/**
 * @swagger
 * /api/url/analytics/{alias}:
 *   get:
 *     summary: Get analytics for a shortened URL
 *     description: Retrieve analytics for the shortened URL based on the alias.
 *     tags: [URL Shortening]
 *     parameters:
 *       - in: path
 *         name: alias
 *         required: true
 *         description: The alias of the shortened URL for which analytics are requested.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved URL analytics
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 alias:
 *                   type: string
 *                   description: The alias of the shortened URL.
 *                 analytics:
 *                   type: object
 *                   description: Analytics data for the URL (e.g., number of visits).
 *       404:
 *         description: URL not found
 */
export const getUrlAnalytics = async (req, res) => {
  const { alias } = req.params;
  const urlData = await Url.findOne({ alias });

  if (!urlData) {
    return res.status(404).json({ message: 'URL not found' });
  }

  res.json(urlData.analytics);
};
