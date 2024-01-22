const express = require("express");
const router = express.Router();
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
  } catch (error) {
    console.log(error);

    res.status(500).send(error);
  }
});

router.get("/lessons/search/:text", async function (req, res, next) {
  try {
    const dbInstance = await dbClient();

    const collection = dbInstance.collection("lessons");
    const allLessons = await collection.find().toArray();

    res.status(200).send({
      data: allLessons,
      totalItems: allLessons.length,
    });
  } catch (error) {
    console.log(error);

    res.status(500).send(error);
  }
});

router.put("/lessons/:id", async function (req, res, next) {
  const lessonId = req.params.id;
  const availableSpaces = req.query.spacesLeft;

  if (!availableSpaces) {
    res.status(400).send({ message: "missing: spacesLeft property" });
  }

  try {
    const dbInstance = await dbClient();

    const collection = dbInstance.collection("lessons");
    const updateLesson = await collection.updateOne(
      { _id: lessonId },
      {
        $set: {
          spaces: 12,
        },
      },
      (err, doc) => {
        console.log("ERROR =>", err);

        console.log("DOC =>", doc);
      }
    );

    res.status(200).send({ lesson: updateLesson });
  } catch (error) {
    console.log(error);

    res.status(500).send(error);
  }
});

module.exports = router;
