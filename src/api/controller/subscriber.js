const subscriberService = require('./../services/subscriber');

const getClick = async (req, res, next) => {
  try {
    const params = {
      subscriberId: req.params.subscriberId,
      range: req.query.range,
    };
    const count = await subscriberService.getClickCount(params);
    res.status(200).json({ count });
  } catch (err) {
    next(err);
  }
};

const getView = async (req, res, next) => {
  try {
    const params = {
      subscriberId: req.params.subscriberId,
      range: req.query.range,
    };
    const count = await subscriberService.getClickCount(params);
    res.status(200).json({ count });
  } catch (err) {
    next(err);
  }
};


module.exports = {
  getClick,
  getView,
};
