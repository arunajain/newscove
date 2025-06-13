const newsModel = require("../models/newsModel");

async function getNews(req, res) {
  try {
    const news = await newsModel.getAllNews();
    res.json(news);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
}

module.exports = { getNews };
