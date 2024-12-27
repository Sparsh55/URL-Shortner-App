import Url from '../models/URL.js';
import { generateShortUrl, getAnalyticsForUrl } from '../Utils/UrlUtil.js';

// Create a short URL
export const shortenUrl = async (req, res) => {
  const { longUrl, customAlias, topic } = req.body;
  const alias = customAlias || generateShortUrl();
  const shortUrl = `${process.env.BASE_URL}+"/url/"+${alias}`;

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
export const redirectUrl = async (req, res) => {
  const { alias } = req.params;

  console.log(alias)
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
export const getUrlAnalytics = async (req, res) => {
  const { alias } = req.params;
  const urlData = await Url.findOne({ alias });

  if (!urlData) {
    return res.status(404).json({ message: 'URL not found' });
  }

  res.json(urlData.analytics);
};
