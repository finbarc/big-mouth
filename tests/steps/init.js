'use strict'

const co = require('co')
const Promise = require('bluebird')
const aws4 = require('../../lib/aws4')

let initialized = false

let init = co.wrap(function* () {
  if (initialized) {
    return
  }

  process.env.restaurants_api = 'https://6a18n1saqj.execute-api.us-east-1.amazonaws.com/dev/restaurants'
  process.env.restaurants_table = 'restaurants'
  process.env.AWS_REGION = 'us-east-1'
  process.env.cognito_client_id = 'test_cognito_client_id'
  process.env.cognito_user_pool_id = 'us-east-1_BPZ2Muek0'
  process.env.cognito_server_client_id = '5jk6h0tvor36p4kq7lr3j9u6gm'

  console.log("AWS credentials loaded")

  yield aws4.init()

  initialized = true
})

module.exports.init = init