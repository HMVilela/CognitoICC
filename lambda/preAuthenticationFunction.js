const AWS = require('aws-sdk')
const AWSXRay = require('aws-xray-sdk-core')

const xRay = AWSXRay.captureAWS(require('aws-sdk'))

AWS.config.update({ region: 'us-east-1' })

exports.handler = async function (event, context) {
  console.log(event, context)
}
