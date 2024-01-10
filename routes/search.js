const express = require("express");
const router = express.Router();
const { Vehicle } = require("../models/Vehicle");

/* GET home page. */
router.get("/", async function (req, res, next) {
  const searchText = req?.query?.searchText || ""

  try {
    const data = await Vehicle.findAll();

    if (!data) {
      return res.status(500).send({});
    }

    const searchResult = data.filter(({ name }) => name.includes(searchText) )
    res.status(200).send({data: searchResult, totalItems: searchResult.length,});

  } catch (e) {
    console.log(e);

    res.status(500).send({});
  }
});

module.exports = router;
