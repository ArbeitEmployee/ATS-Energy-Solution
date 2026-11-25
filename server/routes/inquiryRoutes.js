const express = require('express');
const router = express.Router();
const { createInquiry, getInquiries, updateInquiryStatus, deleteInquiry } = require('../controllers/inquiryController');
const { protect } = require('../middleware/auth');

router.route('/')
  .post(createInquiry)
  .get(protect, getInquiries);

router.route('/:id')
  .delete(protect, deleteInquiry);

router.route('/:id/status')
  .put(protect, updateInquiryStatus);

module.exports = router;
