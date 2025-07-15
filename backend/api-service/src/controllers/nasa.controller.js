const { sendRpcRequest } = require("../utils/rabbitmqClient");

exports.getApod = async (req, res, next) => {
  try {
    const job = { type: "apod", params: req.query };
    const data = await sendRpcRequest(job);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

exports.getMarsPhotos = async (req, res, next) => {
  try {
    const job = { type: "marsPhotos", params: req.query };
    const data = await sendRpcRequest(job);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

exports.getEpic = async (req, res, next) => {
  try {
    const job = { type: "epic", params: req.query };
    const data = await sendRpcRequest(job);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

exports.getNeoFeed = async (req, res, next) => {
  try {
    const job = { type: "neoFeed", params: req.query };
    const data = await sendRpcRequest(job);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

exports.searchNasaImages = async (req, res, next) => {
  try {
    const job = { type: "searchNasaImages", params: req.query };
    const data = await sendRpcRequest(job);
    res.json(data);
  } catch (err) {
    next(err);
  }
};
