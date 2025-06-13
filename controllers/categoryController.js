
const Category = require('../models/categoryModel');

async function getCategories(req, res) {
  try {
    const categories = await Category.getAllCategories();
    console.log(categories);
    if (!categories || categories.length === 0) {
      return res.status(200).json([]);
    }
    else{
        res.status(200).json(categories);
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
}

async function addCategory(req, res) {
  const { name } = req.body;
  console.log(name);
    if (!name) 
        return res.status(400).json({ error: 'Category name is required' });
    
  try {
    const newCategory = await Category.createCategory(name);
    res.status(201).json(newCategory);
  } catch (err) {
    res.status(400).json({ error: 'Could not create category' });
  }
}

module.exports = { getCategories, addCategory };