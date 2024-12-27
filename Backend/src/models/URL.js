import mongoose from 'mongoose';

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
  },
  topic: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  analytics: {
    totalClicks: { type: Number, default: 0 },
    uniqueClicks: { type: Number, default: 0 },
    clicksByDate: [{
      date: Date,
      count: Number,
    }],
    osType: [{
      osName: String,
      uniqueClicks: Number,
      uniqueUsers: Number,
    }],
    deviceType: [{
      deviceName: String,
      uniqueClicks: Number,
      uniqueUsers: Number,
    }],
  },
});

const URL = mongoose.model('URL', urlSchema);
export default URL;
