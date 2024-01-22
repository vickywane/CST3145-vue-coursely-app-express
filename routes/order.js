const express = require("express");
const router = express.Router();
const dbClient = require('../utils/dbInstance')

router.get("/", async function (req, res, next) {
  try {
    const dbInstance = await dbClient();

    const collection = dbInstance.collection("orders");
    const allOrders = await collection.find().toArray();

    return res.status(200).send({
      data: allOrders,
      totalItems: allOrders.length,
    });
  } catch (e) {
    console.log(e);

   return  res.status(500).send({});
  }
});

router.post("/", async function (req, res, next) {
  const { name, phoneNumber, lessonIds, spaceAmount } = req?.body;

  if (!name && !phoneNumber && !lessonIds && !spaceAmount) {
    return res.status(400).send({
      error: `request missing correct name, phoneNumber, lessonIds, spaceAmount fields`,
    });
  }

  try {
    const dbInstance = await dbClient();

    const collection = dbInstance.collection("orders");
    const allLessons = await collection.insertOne({
      name,
      phoneNumber,
      lessonIds,
      spaceAmount,
    });

    return res.status(200).send({
      data: allLessons,
      totalItems: allLessons.length,
    });
  } catch (e) {
    console.log(e);

    return res.status(500).send({});
  }
});

module.exports = router;
