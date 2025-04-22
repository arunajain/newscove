var express = require('express');
var router = express.Router();
// const fetch = require('node-fetch');
const pool = require('../config/db');

/* GET home page. */
router.get('/', async (req, res) => {
  try {
    console.log('heree')
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEWS_API_KEY}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log('data:', data);
    const articles = data.articles.map(article => ({
      title: article.title,
      description: article.description,
      url: article.url,
      published_at: new Date(article.publishedAt)
    }));

    for (const article of articles) {
      await pool.query('INSERT INTO articles (title, description, url, published_at) VALUES ($1, $2, $3, $4) ON CONFLICT DO NOTHING',
        [article.title, article.description, article.url, article.published_at]);
    }

    const result = await pool.query('SELECT * FROM articles ORDER BY published_at DESC');
    res.render('index', { articles: result.rows });
  } catch (err) {
    console.log('error showing')
    console.log(err);
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// router.get('/',(req, res) => {
//   res.render('index');
// });
module.exports = router;
