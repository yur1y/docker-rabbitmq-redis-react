const { sendRpcRequest } = require("../utils/rabbitmqClient");

exports.getMarsPhotoStats = async (req, res, next) => {
  try {
    const job = { type: "marsPhotoStats", params: req.query };
    const data = await sendRpcRequest(job);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

exports.getNeoStats = async (req, res, next) => {
  try {
    const job = { type: "neoStats", params: req.query };
    const data = await sendRpcRequest(job);
    res.json(data);
  } catch (err) {
    next(err);
  }
};
