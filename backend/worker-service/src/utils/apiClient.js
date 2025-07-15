const { fetch } = require("undici");

async function apiClient(url, options = {}) {
  // Set a timeout of 10 seconds (10000 milliseconds)
  const timeoutOptions = {
    ...options,
    timeout: 10000, // Adjust the timeout value as needed
  };
  try {
    const res = await fetch(url, timeoutOptions);
    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`NASA API error: ${res.status} ${errText}`);
    }
    return res.json();
  } catch (error) {
    // Handle fetch errors (like ETIMEDOUT)
    throw new Error(`Fetch failed: ${error.message}`);
  }
}

module.exports = apiClient;
