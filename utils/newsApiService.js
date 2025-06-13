const axios = require('axios');

// Replace this with your actual NewsAPI key
const NEWS_API_KEY = process.env.NEWS_API_KEY;

const BASE_URL = '';

const fetchTopHeadlines = async (country = 'us', category = 'general') => {
  try {
    const response = await axios.get(`${BASE_URL}/top-headlines`, {
      params: {
        apiKey: NEWS_API_KEY,
        country,
        category,
        pageSize: 10, // limit results
      },
    });

    return response.data.articles;
  } catch (error) {
    console.error('Error fetching top headlines:', error.response?.data || error.message);
    throw error;
  }
};

const searchNews = async (query) => {
  try {
    const response = await axios.get(`${BASE_URL}/everything`, {
      params: {
        apiKey: NEWS_API_KEY,
        q: query,
        sortBy: 'publishedAt',
        language: 'en',
      },
    });

    return response.data.articles;
  } catch (error) {
    console.error('Error searching news:', error.response?.data || error.message);
    throw error;
  }
};

module.exports = {
  fetchTopHeadlines,
  searchNews,
};