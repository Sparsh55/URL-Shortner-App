import mongoose from 'mongoose';

// URL Schema
/**
 * @swagger
 * components:
 *   schemas:
 *     Url:
 *       type: object
 *       required:
 *         - longUrl
 *         - shortUrl
 *         - alias
 *       properties:
 *         longUrl:
 *           type: string
 *           description: The original long URL.
 *         shortUrl:
 *           type: string
 *           description: The shortened URL.
 *         alias:
 *           type: string
 *           description: The alias for the shortened URL.
 *         topic:
 *           type: string
 *           description: The topic or category associated with the shortened URL.
 *         analytics:
 *           type: object
 *           description: Analytics data (e.g., number of views).
 */

const urlSchema = new mongoose.Schema({
  longUrl: {
    type: String,
    required: true,
  },
  shortUrl: {
    type: String,
    required: true,
  },
  alias: {
    type: String,
    required: true,
    unique: true,
  },
  topic: {
    type: String,
    required: false,
  },
  analytics: {
    type: Object,
    default: {},
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Url = mongoose.model('Url', urlSchema);

export default Url;
