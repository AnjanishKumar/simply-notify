const Notification = require('../models/Notification');

async function getSubscriberClickCount(params) {
  try {
    const { subscriberId, range } = params;
    const query = {
      device_token_hash: subscriberId,
      is_clicked: true,
    };
    if (range === 'weakly') {
      const DAY = 60 * 60 * 24 * 1000;
      query.ts_updated = {
        $gte: new Date(new Date() - 7 * DAY),
      };
    }
    return await Notification.count(query);
  } catch (err) {
    return new Error(err);
  }
}

async function getSubscriberViewCount(params) {
  try {
    const { subscriberId, range } = params;

    const query = {
      device_token_hash: subscriberId,
      is_viewed: true,
    };
    if (range === 'weakly') {
      query.ts_updated = {
        $gte: new Date(new Date() - 7 * 60 * 60 * 24 * 1000),
      };
    }

    return await Notification.count(query);
  } catch (err) {
    throw Error(err);
  }
}

async function recoredNotificationClick(params) {
  try {
    const { notificationId, subscriber } = params;
    const data = {
      is_clicked: true,
      ts_updated: Date.now(),
    };

    const notification = await Notification.findOneAndUpdate(
      {
        notification_id: notificationId,
        device_token_hash: subscriber,
      },
      { $set: data },
      { new: true },
    );
    return notification;
  } catch (err) {
    return err;
  }
}

async function recoredNotificationView(params) {
  try {
    const { notificationId, subscriber } = params;
    const data = {
      is_viewed: true,
      ts_updated: Date.now(),
    };
    const notification = await Notification.findOneAndUpdate(
      {
        notification_id: notificationId,
        device_token_hash: subscriber,
      },
      { $set: data },
      { new: true },
    );
    return notification;
  } catch (err) {
    throw err;
  }
}

async function getNotificationViewCount(params) {
  try {
    const { notificationId, range } = params;


    const query = {
      notification_id: notificationId,
      is_viewed: true,
    };
    if (range === 'weakly') {
      query.ts_updated = {
        $gte: new Date(new Date() - 7 * 60 * 60 * 24 * 1000),
      };
    }
    return await Notification.count(query);
  } catch (err) {
    return err;
  }
}

async function getNotificationClickCount(params) {
  try {
    const { notificationId, range } = params;
    const query = {
      notification_id: notificationId,
      is_clicked: true,
    };
    if (range === 'weakly') {
      query.ts_updated = {
        $gte: new Date(new Date() - 7 * 60 * 60 * 24 * 1000),
      };
    }
    return await Notification.count(query);
  } catch (err) {
    return err;
  }
}

module.exports = {
  getSubscriberClickCount,
  getSubscriberViewCount,
  getNotificationClickCount,
  getNotificationViewCount,
  recoredNotificationClick,
  recoredNotificationView,
};
