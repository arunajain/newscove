const axios = require('axios');
const { saveArticlesToDB } = require('./saveArticlesToDb');
// Replace this with your actual NewsAPI key
const NEWS_API_KEY = process.env.NEWS_API_KEY;

const BASE_URL = process.env.NEWS_URL;

const fetchArticle = async (country = 'us', category, categoryId) => {
  try {
    console.log(`Fetching articles for category: ${category} in country: ${country}`);
    const response = await axios.get(`${BASE_URL}/top-headlines`, {
      params: {
        apiKey: NEWS_API_KEY,
        country,
        category,
        pageSize: 10, // limit results
      },
    });
    const articles = response.data.articles;
    console.log(`Fetched ${articles.length} articles for category: ${category}`);
    await saveArticlesToDB(articles, categoryId);
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
  fetchArticle,
  searchNews,
};