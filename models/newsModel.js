const db = require('../db');

async function getAllNews() {
  const result = await db.query('SELECT * FROM news_articles ORDER BY published_at DESC LIMIT 20');
  return result.rows;
}

module.exports = { getAllNews };