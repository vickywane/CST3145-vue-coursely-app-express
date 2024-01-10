const express = require("express");
const router = express.Router();
const { Comparison } = require("../models/Comparison");

/* GET home page. */
router.get("/:id", async function (req, res, next) {
  const id = req?.params?.id;

  if (!id.length === '' ) {
    return res.status(400).send({
      error: "Id missing",
    });
  }

  try {
    const data = await Comparison.findOne({ where: { id } });

    if (!data) {
     return res.status(404).send({ error: `No comparison for ${id}` });
    }

    res.status(200).send(data);
  } catch (e) {
    // console.log(e);

    res.status(500).send({});
  }
});

module.exports = router;
