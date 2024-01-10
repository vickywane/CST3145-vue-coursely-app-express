const express = require("express");
const router = express.Router();
const { Vehicle } = require("../models/Vehicle");
const { paginate } = require("../utils/paginate");
const AWS = require("../utils/Cognito");
const AmazonCognitoIdentity = require("amazon-cognito-identity-js");

/**
 * Retrieves a list of vehicles with pagination.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Promise<void>} - Promise resolving to undefined.
 */
router.get("/user/:userId", async function (req, res, next) {
  //   const currentPage = req?.query?.currentPage || 1;
  //   try {
  //     const data = await Vehicle.findAll({
  //       ...paginate({ page: currentPage, pageSize: 10 }),
  //     });
  //     res.status(200).send({
  //       data,
  //       totalItems: data.length,
  //     });
  //   } catch (e) {
  //     console.log(e);
  //     res.status(500).send({});
  //   }

  res.status(200).send({ status: "user param route" });
});

router.post("/user", async function (req, res, next) {
  const { email, username, password, phone_number } = req?.body;

  if (!email || !username || !password) {
    return res.status(400).send({ error: "user details are missing" });
  }

  try {
    const userPool = AWS.CognitoPoolClient();
    const userAttributes = [];

    const attributeEmail = new AmazonCognitoIdentity.CognitoUserAttribute({
      Name: "email",
      Value: email,
    });

    const attributePhoneNumber = new AmazonCognitoIdentity.CognitoUserAttribute(
      {
        Name: "phone_number",
        Value: phone_number || "",
      }
    );

    userAttributes.push(attributeEmail);
    userAttributes.push(attributePhoneNumber);

    userPool.signUp(
      username,
      password,
      userAttributes,
      null,
      function (error, result) {
        if (error) {
          console.log(error);

          return res.status(500).send({ error });
        }

        const cognitoUser = result.user;

        res
          .status(200)
          .send({ status: `User: ${cognitoUser.getUsername()} created!` });
      }
    );
  } catch (error) {
    console.log(error);

    res.status(500).send({ error });
  }
});

router.post("/user/register-otp", async function (req, res, next) {
  try {
    const userPool = await AWS.CognitoPoolClient();
    const { userOtp, username } = req?.body

    if (!userOtp | !username) {
      return res
        .status(400)
        .send({ error: "user OTP & username properties are missing" });
    }

    const cognitoUser = new AmazonCognitoIdentity.CognitoUser({
      Username: username,
      Pool: userPool,
    });

    cognitoUser.confirmRegistration(userOtp, true, (error, result) => {
      if (error) {
        console.log(error);

        return res.status(500).send({ error });
      }

      res.status(200).send({ status: result });
    });
  } catch (error) {
    console.log(error);

    return res.status(500).send({ error });
  }
});

router.post("/user/login", async function (req, res, next) {
  try {
    const { username, password } = req?.body;

    if (!password | !username) {
      return res
        .status(400)
        .send({ error: "username & password properties are missing" });
    }

    const authenticationDetails =
      new AmazonCognitoIdentity.AuthenticationDetails({
        Username: username,
        Password: password,
      });

    const userPool = AWS.CognitoPoolClient();

    const cognitoUser = new AmazonCognitoIdentity.CognitoUser({
      Username: username,
      Pool: userPool,
    });

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function (result) {
        const accessToken = result.getAccessToken().getJwtToken();

        res.status(200).send({ accessToken });
      },
      onFailure: function (error) {
        console.log(error)
        res.status(500).send({ error });
      },
    });
  } catch (e) {
    console.log(e);

    res.status(500).send({});
  }
});

module.exports = router;
