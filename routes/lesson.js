const express = require("express");
const router = express.Router();
const { Lesson } = require("../collections/Lesson");
const dbClient = require("../utils/dbInstance");

router.get("/lessons", async function (req, res, next) {
  try {
    const dbInstance = await dbClient();

    const collection = dbInstance.collection("lessons");
    const allLessons = await collection.find().toArray();

    res.status(200).send({
      data: allLessons,
      totalItems: allLessons.length,
    });
  } catch (e) {
    console.log(e);

    res.status(500).send({});
  }
});

router.put("/INSERT/lessons", async function (req, res, next) {
  // const currentPage = req?.query?.currentPage || 1;
  // try {
  //   const data = await Vehicle.findAll({
  //     ...paginate({ page: currentPage, pageSize: 10 }),
  //   });
  //   res.status(200).send({
  //     data,
  //     totalItems: data.length,
  //   });
  // } catch (e) {
  //   console.log(e);
  //   res.status(500).send({});
  // }
});

module.exports = router;
