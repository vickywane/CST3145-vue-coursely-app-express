// const CognitoIdentityProviderClient = require("@aws-sdk/client-cognito-identity-provider")

// export const Client = new CognitoIdentityProviderClient({
//     region: "us-east-1",
//     poold
//  });

const AmazonCognitoIdentity = require("amazon-cognito-identity-js");

var poolData = {
  UserPoolId: "us-east-1_xAqL2eIaJ", // Your user pool id here
  ClientId: "4ve0ov472q1al6rsg4lkpep09h", // Your client id here
};
 
const CognitoPoolClient = () => new AmazonCognitoIdentity.CognitoUserPool(poolData);

module.exports = {
  CognitoPoolClient
}

// pixieguide-react-native-client