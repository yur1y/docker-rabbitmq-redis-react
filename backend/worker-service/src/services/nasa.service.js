const apiClient = require("../utils/apiClient");
const { cacheOrFetch } = require("../utils/redisClient");

const NASA_API_KEY = process.env.NASA_API_KEY || "DEMO_KEY";

const getApod = async (date) => {
  const key = `apod:${date || "today"}`;
  return cacheOrFetch(key, async () => {
    let url = `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`;
    if (date) url += `&date=${date}`;
    return apiClient(url);
  });
};

const getMarsPhotos = async ({
  sol = 1000,
  camera = "",
  rover = "curiosity",
}) => {
  const key = `mars:${rover}:${sol}:${camera}`;
  return cacheOrFetch(key, async () => {
    let url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=${sol}&api_key=${NASA_API_KEY}`;
    if (camera) url += `&camera=${camera}`;
    return apiClient(url);
  });
};

const getEpic = async (type = "natural", date) => {
  const key = `epic:${type}:${date || "all"}`;
  return cacheOrFetch(key, async () => {
    let url = `https://api.nasa.gov/EPIC/api/${type}`;
    if (date) url += `/date/${date}`;
    url += `?api_key=${NASA_API_KEY}`;
    return apiClient(url);
  });
};

const getNeoFeed = async (start_date, end_date) => {
  const key = `neo:${start_date || "none"}:${end_date || "none"}`;
  return cacheOrFetch(key, async () => {
    let url = `https://api.nasa.gov/neo/rest/v1/feed?api_key=${NASA_API_KEY}`;
    if (start_date) url += `&start_date=${start_date}`;
    if (end_date) url += `&end_date=${end_date}`;
    return apiClient(url);
  });
};

const searchNasaImages = async (params) => {
  const key = `images:${JSON.stringify(params)}`; // Create a unique cache key based on parameters
  return cacheOrFetch(
    key,
    async () => {
      // Build the query string
      const queryParams = new URLSearchParams(params);
      const url = `https://images-api.nasa.gov/search?${queryParams.toString()}`;
      return apiClient(url);
    },
    600 // Shorter TTL for search
  );
};

const jobHandlers = {
  apod: (params) => getApod(params.date),
  marsPhotos: (params) => getMarsPhotos(params),
  epic: (params) => getEpic(params.type, params.date),
  neoFeed: (params) => getNeoFeed(params.start_date, params.end_date),
  searchNasaImages: (params) => searchNasaImages(params),
  marsPhotoStats: (params) => getMarsPhotos(params),
  neoStats: (params) => getNeoFeed(params.start_date, params.end_date),
};

exports.processJob = async (job) => {
  console.log(`Processing job: ${job.type}`, job.params);
  const handler = jobHandlers[job.type];
  if (!handler) return { error: "Unknown job type" };
  return await handler(job.params);
};
