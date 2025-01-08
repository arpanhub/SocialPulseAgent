const express = require('express');
const router =express.Router();
const getPostdata  = require('../controllers/postController');

router.get('/',getPostdata);

module.exports = router;