const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const notificationSchema = new Schema({
  notification_id: {
    type: Number,
    required: true,
  },
  site_id: {
    type: Number,
    required: true,
  },
  device_token_hash: {
    type: String,
    required: true,
  },
  has_subscribed: {
    type: Boolean,
    default: false,
  },
  is_clicked: {
    type: Boolean,
    default: false,
  },
  is_viewed: {
    type: Boolean,
    default: false,
  },
  ts_created: {
    type: Date,
    default: Date.now(),
  },
  ts_updated: {
    type: Date,
    default: Date.now(),
  },
});

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
