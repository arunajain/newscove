const db = require('../db');

async function getAllCategories() {
  const result = await db.query('SELECT * FROM categories ORDER BY name');
  return result.rows;
}

async function createCategory(name) {
  const result = await db.query(
    'INSERT INTO categories (name) VALUES ($1) RETURNING *',
    [name]
  );
  return result.rows[0];
}

module.exports = { getAllCategories, createCategory };