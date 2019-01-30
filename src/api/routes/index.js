const express = require('express');
const notificationController = require('../controller/notification');
const subscriberController = require('../controller/subscriber');

const router = express.Router();


// record a notification click
router.post('/notifications/:notificationId/click', notificationController.recoredClick);

// return the click count of notifications in specified range
router.get('/notifications/:notificationId/click', notificationController.getClick);

// record a notification view
router.post('/notifications/:notificationId/view', notificationController.recordView);

// return the view count of notifications in specified range
router.get('/notifications/:notificationId/view', notificationController.getView);

// return the subscriber click count in specified range
router.get('/subscribers/:subscriberId/click', subscriberController.getClick);

// return the subscriber view count in specified range
router.get('/subscribers/:subscriberId/view', subscriberController.getView);

module.exports = router;
