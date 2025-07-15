const express = require("express");
const router = express.Router();

const validate = require("../middlewares/validateRequest");
const Joi = require("joi");

const statsController = require("../controllers/stats.controller");

const marsPhotosSchema = Joi.object({
  sol: Joi.number().integer().min(0).optional(),
  camera: Joi.string().optional(),
  rover: Joi.string().valid("curiosity", "opportunity", "spirit").optional(),
});

const neoFeedSchema = Joi.object({
  start_date: Joi.string()
    .pattern(/^\d{4}-\d{2}-\d{2}$/)
    .optional(),
  end_date: Joi.string()
    .pattern(/^\d{4}-\d{2}-\d{2}$/)
    .optional(),
});

/**
 * @swagger
 * /stats/mars-photo:
 *   get:
 *     tags:
 *       - Stats
 *     summary: Get Mars Rover photo counts by camera
 *     description: Returns an object with camera names as keys and photo counts as values.
 *     parameters:
 *       - in: query
 *         name: sol
 *         schema:
 *           type: integer
 *           default: 1000
 *         required: false
 *         description: Martian sol (day)
 *       - in: query
 *         name: rover
 *         schema:
 *           type: string
 *           default: curiosity
 *           enum: [curiosity, opportunity, spirit]
 *         required: false
 *         description: Name of the Mars rover
 *     responses:
 *       200:
 *         description: Photo stats by camera
 */
router.get(
  "/mars-photo",
  validate(marsPhotosSchema),
  statsController.getMarsPhotoStats
);

/**
 * @swagger
 * /stats/neo:
 *   get:
 *     tags:
 *       - Stats
 *     summary: Get asteroid counts per day
 *     description: Returns an object with dates as keys and asteroid counts as values.
 *     parameters:
 *       - in: query
 *         name: start_date
 *         schema:
 *           type: string
 *           format: date
 *         required: false
 *         description: Start date in YYYY-MM-DD format
 *       - in: query
 *         name: end_date
 *         schema:
 *           type: string
 *           format: date
 *         required: false
 *         description: End date in YYYY-MM-DD format
 *     responses:
 *       200:
 *         description: Asteroid stats by date
 */
router.get("/neo", validate(neoFeedSchema), statsController.getNeoStats);

module.exports = router;
