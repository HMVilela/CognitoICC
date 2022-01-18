const AWS = require('aws-sdk')
const AWSXRay = require('aws-xray-sdk-core')

const xRay = AWSXRay.captureAWS(require('aws-sdk'))
const awsRegion = process.env.AWS_REGION

AWS.config.update({
  region: awsRegion,
})

const cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider({
  apiVersion: '2016-04-18',
})

exports.handler = async function (event, context) {
  const apiRequestId = event.requestContext.requestId
  const lambdaRequestId = context.awsRequestId

  console.log(
    `API Gateway RequestId: ${apiRequestId} - Lambda RequestId: ${lambdaRequestId}`
  )

  // event.headers.Authorization
  const userInfo = cognitoIdentityServiceProvider
    .getUser({
      AccessToken: event.headers.Authorization,
    })
    .promise()
  console.log(userInfo)

  if (event.resource === '/products') {
    return {
      statusCode: 200,
      headers: {},
      body: JSON.stringify('POST /products'),
    }
  }

  return {
    statusCode: 400,
    headers: {},
    body: JSON.stringify('Bad request'),
  }
}
