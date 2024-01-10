const express = require("express");
const router = express.Router();
const { Vehicle } = require("../models/Vehicle");
const { paginate } = require("../utils/paginate");

/**
 * Retrieves a list of vehicles with pagination.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Promise<void>} - Promise resolving to undefined.
 */
router.get("/vehicles", async function (req, res, next) {
  const currentPage = req?.query?.currentPage || 1;

  try {
    const data = await Vehicle.findAll({
      ...paginate({ page: currentPage, pageSize: 10 }),
    });

    res.status(200).send({
      data,
      totalItems: data.length,
    });
  } catch (e) {
    console.log(e);

    res.status(500).send({});
  }
});

/**
 * Retrieves a specific vehicle by ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Promise<void>} - Promise resolving to undefined.
 */
router.get("/vehicles/:vehicleId", async function (req, res, next) {
  const vehicleId = req?.params?.vehicleId;

  if (!vehicleId) {
    return res.status(400).send({
      error: "Vehicle Id missing",
    });
  }

  try {
    const data = await Vehicle.findOne({ where: { id: vehicleId } });

    if (!data) {
     return res.status(404).send({ error: `No vehicle for ${id}` });
    }

    res.status(200).send(data);
  } catch (e) {
    console.log(e);

    res.status(500).send({});
  }
});

module.exports = router;
