const express = require('express');
const router = express.Router();
const { createInquiry, getInquiries, updateInquiryStatus } = require('../controllers/inquiryController');
const { protect } = require('../middleware/auth');

router.route('/')
  .post(createInquiry)
  .get(protect, getInquiries);

router.route('/:id/status')
  .put(protect, updateInquiryStatus);

module.exports = router;
