const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const subscriberSchema = new Schema({
  site_id: {
    required: true,
    type: Number,
  },
  device_token_hash: {
    type: String,
    required: true,
  },
  device: {
    type: String,
    default: '',
  },
  device_type: {
    type: String,
    default: '',
  },
  city: {
    type: String,
    default: '',
  },
  state: {
    type: String,
    default: '',
  },
  country: {
    type: String,
    default: '',
  },
});

const Subscriber = mongoose.model('Subscriber', subscriberSchema);

module.exports = Subscriber;
