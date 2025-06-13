const pool = require("../db/index");

const saveArticlesToDB = async (articles, categoryId, subcategoryId = null) => {
  const client = await pool.connect();
  try {
    for (const article of articles) {
      const {
        title,
        description,
        url,
        urlToImage,
        source,
        publishedAt,
        author,
        content,
      } = article;

      await client.query(
        `INSERT INTO news_articles
          (title, description, url, url_to_image, source, published_at,
           category_id, subcategory_id, author, content)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`, // skip if duplicate
        [
          title,
          description,
          url,
          urlToImage,
          source?.name,
          publishedAt,
          categoryId,
          subcategoryId,
          author,
          content,
        ]
      );
    }
  } catch (err) {
    console.error("DB insert error:", err.message);
  } finally {
    client.release();
  }
};
module.exports = {
  saveArticlesToDB,
};
