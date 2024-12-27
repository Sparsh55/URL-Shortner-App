

import Url from '../models/URL.js';
import { setCache, getCache } from './radis.js'; // Import Redis functions

// Generate a unique alias for a short URL
export const generateShortUrl = () => {
  return Math.random().toString(36).substring(2, 8); // Simple short URL generation
};

// Collect and log analytics for a specific URL
export const getAnalyticsForUrl = async (urlData) => {
  // Increment total clicks
  urlData.analytics.totalClicks += 1;

  // Update MongoDB
  await urlData.save();

  // Cache updated analytics in Redis
  setCache(`url:${urlData._id}:analytics`, urlData.analytics);
};

// Function to retrieve cached analytics from Redis if available
export const getUrlAnalytics = async (urlData) => {
  const cachedAnalytics = await getCache(`url:${urlData._id}:analytics`);
  
  if (cachedAnalytics) {
    return cachedAnalytics;
  }

  // If not cached, fetch analytics from MongoDB and cache it
  const analytics = urlData.analytics;
  setCache(`url:${urlData._id}:analytics`, analytics); // Cache analytics
  return analytics;
};
