const { getAllCategories } = require("../models/categoryModel");
const { fetchArticle } = require("./newsApiService");

const runFetchForAllCategories = async () => {
  console.log("Running daily news fetch job...");

  try {
    const categories = await getAllCategories();

    for (const category of categories) {
      const { id, name } = category;
      console.log(`📡 Fetching articles for category: ${name}`);
      await fetchArticle("us", name, id);
    }
  } catch (error) {
    console.error("Error fetching for all categories:", error.message);
  }
};

module.exports = { runFetchForAllCategories };
