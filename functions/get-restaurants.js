'use strict'

const co = require('co')
const AWS = require('aws-sdk')
const dynamodb = new AWS.DynamoDB.DocumentClient()

const defaultResults = process.env.defaultResults || 8
const tableName = process.env.restaurants_table

function* getRestaurants(count) {
  console.log("In getRestaurants")
  let req = {
    TableName: tableName,
    Limit: count
  }

  console.log(`Req is ${JSON.stringify(req)}`)
  let resp = yield dynamodb.scan(req).promise()
  console.log(`Resp is ${JSON.stringify(resp)}`)
  return resp.Items
}

module.exports.handler = co.wrap(function* (event, context, cb) {
  let restaurants = yield getRestaurants(defaultResults);
  let response = {
    statusCode: 200,
    body: JSON.stringify(restaurants)
  };

  cb(null, response)
});
