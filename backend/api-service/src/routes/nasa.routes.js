const express = require("express");
const router = express.Router();
const nasaController = require("../controllers/nasa.controller");

const validate = require("../middlewares/validateRequest");
const Joi = require("joi");

// Schemas
const apodSchema = Joi.object({
  date: Joi.string()
    .pattern(/^\d{4}-\d{2}-\d{2}$/)
    .optional(),
});

const marsPhotosSchema = Joi.object({
  sol: Joi.number().integer().min(0).optional(),
  camera: Joi.string().optional(),
  rover: Joi.string().valid("curiosity", "opportunity", "spirit").optional(),
});

const epicSchema = Joi.object({
  type: Joi.string().valid("natural", "enhanced").optional(),
  date: Joi.string()
    .pattern(/^\d{4}-\d{2}-\d{2}$/)
    .optional(),
});

const neoFeedSchema = Joi.object({
  start_date: Joi.string()
    .pattern(/^\d{4}-\d{2}-\d{2}$/)
    .optional(),
  end_date: Joi.string()
    .pattern(/^\d{4}-\d{2}-\d{2}$/)
    .optional(),
});

const searchImagesSchema = Joi.object({
  q: Joi.string().required(),
  center: Joi.string().optional(),
  description: Joi.string().optional(),
  description_508: Joi.string().optional(),
  keywords: Joi.string().optional(),
  location: Joi.string().optional(),
  media_type: Joi.string().optional(),
  nasa_id: Joi.string().optional(),
  page: Joi.number().integer().optional(),
  page_size: Joi.number().integer().optional(),
  photographer: Joi.string().optional(),
  secondary_creator: Joi.string().optional(),
  title: Joi.string().optional(),
  year_start: Joi.string().optional(),
  year_end: Joi.string().optional(),
});

/**
 * @swagger
 * /nasa/apod:
 *   get:
 *     tags:
 *       - Nasa
 *     summary: Get Astronomy Picture of the Day (APOD)
 *     description: Returns NASA's Astronomy Picture of the Day for a given date (or today if no date is provided).
 *     parameters:
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *           format: date
 *         required: false
 *         description: Date in YYYY-MM-DD format (optional)
 *     responses:
 *       200:
 *         description: APOD data
 *       500:
 *         description: Error fetching APOD data
 */
router.get("/apod", validate(apodSchema), nasaController.getApod);

/**
 * @swagger
 * /nasa/mars-photos:
 *   get:
 *     tags:
 *       - Nasa
 *     summary: Get Mars Rover Photos
 *     description: Returns photos taken by NASA's Mars Rovers.
 *     parameters:
 *       - in: query
 *         name: sol
 *         schema:
 *           type: integer
 *           default: 1000
 *         required: false
 *         description: Martian sol (day) on which the photo was taken
 *       - in: query
 *         name: camera
 *         schema:
 *           type: string
 *         required: false
 *         description: Camera name (optional)
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
 *         description: Mars Rover photos
 *       500:
 *         description: Error fetching Mars photos
 */
router.get(
  "/mars-photos",
  validate(marsPhotosSchema),
  nasaController.getMarsPhotos
);

/**
 * @swagger
 * /nasa/epic:
 *   get:
 *     tags:
 *       - Nasa
 *     summary: Get Earth Polychromatic Imaging Camera (EPIC) images metadata
 *     description: Returns metadata for NASA EPIC images (natural or enhanced).
 *     parameters:
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [natural, enhanced]
 *           default: natural
 *         required: false
 *         description: Type of EPIC images (natural or enhanced)
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *           format: date
 *         required: false
 *         description: Date in YYYY-MM-DD format (optional)
 *     responses:
 *       200:
 *         description: EPIC images metadata
 *       500:
 *         description: Error fetching EPIC data
 */
router.get("/epic", validate(epicSchema), nasaController.getEpic);

/**
 * @swagger
 * /nasa/neo-feed:
 *   get:
 *     tags:
 *       - Nasa
 *     summary: Get Near Earth Object Web Service (NeoWs) feed
 *     description: Returns a list of Near Earth Objects for a date range.
 *     parameters:
 *       - in: query
 *         name: start_date
 *         schema:
 *           type: string
 *           format: date
 *         required: false
 *         description: Start date in YYYY-MM-DD format (optional)
 *       - in: query
 *         name: end_date
 *         schema:
 *           type: string
 *           format: date
 *         required: false
 *         description: End date in YYYY-MM-DD format (optional)
 *     responses:
 *       200:
 *         description: NeoWs feed data
 *       500:
 *         description: Error fetching NeoWs data
 */
router.get("/neo-feed", validate(neoFeedSchema), nasaController.getNeoFeed);

/**
 * @swagger
 * /nasa/search-images:
 *   get:
 *     tags:
 *       - Nasa
 *     summary: Search NASA Image and Video Library
 *     description: Search NASA's Image and Video Library by keyword and optional filters.
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         required: true
 *         description: Search query string
 *       - in: query
 *         name: center
 *         schema:
 *           type: string
 *         required: false
 *         description: NASA center associated with the image/video
 *       - in: query
 *         name: description
 *         schema:
 *           type: string
 *         required: false
 *         description: Description of the image/video
 *       - in: query
 *         name: description_508
 *         schema:
 *           type: string
 *         required: false
 *         description: 508-compliant description of the image/video
 *       - in: query
 *         name: keywords
 *         schema:
 *           type: string
 *         required: false
 *         description: Keywords to filter search (comma separated)
 *       - in: query
 *         name: location
 *         schema:
 *           type: string
 *         required: false
 *         description: Location associated with the image/video
 *       - in: query
 *         name: media_type
 *         schema:
 *           type: string
 *         required: false
 *         description: Media type (image, video, audio)
 *       - in: query
 *         name: nasa_id
 *         schema:
 *           type: string
 *         required: false
 *         description: NASA ID of the asset
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         required: false
 *         description: Page number for pagination
 *       - in: query
 *         name: page_size
 *         schema:
 *           type: integer
 *         required: false
 *         description: Number of results per page
 *       - in: query
 *         name: photographer
 *         schema:
 *           type: string
 *         required: false
 *         description: Photographer's name
 *       - in: query
 *         name: secondary_creator
 *         schema:
 *           type: string
 *         required: false
 *         description: Secondary creator's name
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         required: false
 *         description: Title of the asset
 *       - in: query
 *         name: year_start
 *         schema:
 *           type: string
 *         required: false
 *         description: Starting year (YYYY)
 *       - in: query
 *         name: year_end
 *         schema:
 *           type: string
 *         required: false
 *         description: Ending year (YYYY)
 *     responses:
 *       200:
 *         description: NASA Image and Video Library search results
 *       400:
 *         description: Invalid or missing query parameter(s)
 *       500:
 *         description: Error fetching image/video data
 */
router.get(
  "/search-images",
  validate(searchImagesSchema),
  nasaController.searchNasaImages
);

module.exports = router;
