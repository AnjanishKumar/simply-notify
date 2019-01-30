const repository = require('../../common/repository');

const getClick = async (req, res, next) => {
  try {
    const params = {
      notificationId: req.params.notificationId,
      range: req.query.range,
    };

    const count = await repository.getNotificationClickCount(params);
    res.status(200).json({ count });
  } catch (err) {
    next(err);
  }
};

const getView = async (req, res, next) => {
  try {
    const params = {
      notificationId: req.params.notificationId,
      range: req.query.range,
    };

    const count = await repository.getNotificationViewCount(params);
    res.status(200).json({ count });
  } catch (err) {
    next(err);
  }
};

const recoredClick = async (req, res, next) => {
  try {
    const params = {
      notificationId: req.params.notificationId,
      subscriber: req.body.subscriber,
    };
    const notification = await repository.recoredNotificationClick(params);
    if (!notification) {
      res.status(404).json({ error: 'Notification not found' });
    } else {
      res.status(200).send(notification);
    }
  } catch (err) {
    next(err);
  }
};

const recordView = async (req, res, next) => {
  try {
    const params = {
      notificationId: req.params.notificationId,
      subscriber: req.body.subscriber,
    };
    const notification = await repository.recoredNotificationView(params);
    if (!notification) {
      res.status(404).json({ error: 'Notification not found' });
    } else {
      res.status(200).send(notification);
    }
  } catch (err) {
    next(err);
  }
};


module.exports = {
  getClick,
  getView,
  recoredClick,
  recordView,
};
