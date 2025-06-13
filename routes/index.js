var express = require("express");
var router = express.Router();
// const fetch = require('node-fetch');
const pool = require("../db/index");
const {
  runFetchForAllCategories,
} = require("../utils/runFetchForAllCategories");
const run = require("nodemon/lib/monitor/run");
/* GET home page. */
router.get("/", async (req, res) => {
  try {
    // await runFetchForAllCategories();
    console.log("started");
  } catch (err) {
    console.log("error showing");
    console.log(err);
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// router.get('/',(req, res) => {
//   res.render('index');
// });
module.exports = router;
