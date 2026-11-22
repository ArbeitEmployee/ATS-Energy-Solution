const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { cloudinary, getCorrectedTimestamp, syncTimeOffset } = require('../config/cloudinary');
const { protect } = require('../middleware/auth');

// @route   POST /api/upload
// @desc    Upload image to Cloudinary
// @access  Protected (Admin only)
router.post('/', protect, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Please select an image file to upload' });
    }

    await syncTimeOffset();
    const folder = req.body.folder || 'atsenergybd';
    const timestamp = getCorrectedTimestamp();

    // Stream upload from buffer
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        timestamp,
        resource_type: 'auto'
      },
      (error, result) => {
        if (error) {
          console.error('Cloudinary stream error:', error);
          return res.status(500).json({ success: false, message: error.message || 'Image upload failed' });
        }
        res.json({
          success: true,
          url: result.secure_url,
          public_id: result.public_id
        });
      }
    );

    uploadStream.end(req.file.buffer);
  } catch (error) {
    console.error('Upload route error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   POST /api/upload/multiple
// @desc    Upload multiple images to Cloudinary (gallery)
router.post('/multiple', protect, upload.array('images', 8), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, message: 'Please select image files' });
    }

    await syncTimeOffset();
    const folder = req.body.folder || 'atsenergybd';
    const timestamp = getCorrectedTimestamp();

    const uploadPromises = req.files.map(file => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder, timestamp, resource_type: 'auto' },
          (error, result) => {
            if (error) reject(error);
            else resolve(result.secure_url);
          }
        );
        stream.end(file.buffer);
      });
    });

    const urls = await Promise.all(uploadPromises);
    res.json({ success: true, count: urls.length, urls });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
