const API_URL =
  process.env.REACT_APP_API_URL || "http://localhost:3001/api/nasa";

export async function fetchApod(params = {}) {
  const query = new URLSearchParams(params).toString();
  const res = await fetch(`${API_URL}/apod?${query}`);
  return res.json();
}

export async function fetchMarsPhotos(params = {}) {
  const query = new URLSearchParams(params).toString();
  const res = await fetch(`${API_URL}/mars-photos?${query}`);
  return res.json();
}

export async function fetchEpic(params = {}) {
  const query = new URLSearchParams(params).toString();
  const res = await fetch(`${API_URL}/epic?${query}`);
  return res.json();
}

export async function fetchNeoFeed(params = {}) {
  const query = new URLSearchParams(params).toString();
  const res = await fetch(`${API_URL}/neo-feed?${query}`);
  return res.json();
}

export async function searchNasaImages(params = {}) {
  const query = new URLSearchParams(params).toString();
  const res = await fetch(`${API_URL}/search-images?${query}`);
  return res.json();
}

// Stats endpoints
export async function fetchMarsPhotoStats(params = {}) {
  const query = new URLSearchParams(params).toString();
  const res = await fetch(
    `${API_URL.replace("/nasa", "/stats")}/mars-photo?${query}`
  );
  return res.json();
}

export async function fetchNeoStats(params = {}) {
  const query = new URLSearchParams(params).toString();
  const res = await fetch(`${API_URL.replace("/nasa", "/stats")}/neo?${query}`);
  return res.json();
}
