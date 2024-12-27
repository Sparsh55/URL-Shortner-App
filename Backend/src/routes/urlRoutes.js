import express from 'express';
import { shortenUrl, redirectUrl, getUrlAnalytics } from '../controllers/urlController.js';

const URLrouter = express.Router();

URLrouter.post('/', shortenUrl);
URLrouter.get('/:alias', redirectUrl);
URLrouter.get('/analytics/:alias', getUrlAnalytics);

export default URLrouter;
