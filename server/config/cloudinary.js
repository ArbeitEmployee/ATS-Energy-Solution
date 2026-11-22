const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');
const https = require('https');

dotenv.config();

cloudinary.config({
  cloud_name: process.env.cloudinary_cloud_name || process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.cloudinary_api_key || process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.cloudinary_api_secret || process.env.CLOUDINARY_API_SECRET
});

let timeOffsetSec = 0;

// Calculate real world UTC offset so requests are never stale
const syncTimeOffset = () => {
  return new Promise((resolve) => {
    const req = https.request('https://api.cloudinary.com', { method: 'HEAD' }, (res) => {
      const serverDateStr = res.headers['date'];
      if (serverDateStr) {
        const serverTime = new Date(serverDateStr).getTime();
        const localTime = Date.now();
        timeOffsetSec = Math.round((serverTime - localTime) / 1000);
      }
      resolve(timeOffsetSec);
    });
    req.on('error', () => resolve(0));
    req.end();
  });
};

const getCorrectedTimestamp = () => {
  return Math.floor(Date.now() / 1000) + timeOffsetSec;
};

// Initial sync
syncTimeOffset();

module.exports = {
  cloudinary,
  syncTimeOffset,
  getCorrectedTimestamp
};
