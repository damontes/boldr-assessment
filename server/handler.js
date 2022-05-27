const AWS = require('aws-sdk')
const express = require('express')
const serverless = require('serverless-http')

/**
 * We can omit the express integration using directly the path
 * from the API Gateway and attach each path to a lambda function,
 * creating a mainLayer so all the dependencies are share accross all the lambdas.
 */
const app = express()

const USERS_TABLE = process.env.USERS_TABLE
const dynamoDbClient = new AWS.DynamoDB.DocumentClient({
  region: 'localhost',
  endpoint: 'http://localhost:8000',
  accessKeyId: 'DEFAULT_ACCESS_KEY',
  secretAccessKey: 'DEFAULT_SECRET',
})

app.use(express.json())
const defaultParams = {
  TableName: USERS_TABLE,
}

app.post('/subscribeNewsletter', async function (req, res) {
  const { email } = req.body

  let params = {
    ...defaultParams,
    Key: {
      email,
    },
  }

  try {
    const { Item: user = null } = await dynamoDbClient.get(params).promise()
    if (user) {
      res.json({ email, success: false, message: 'Email already exist' })
      return
    }
    params = { ...defaultParams, Item: { email } }
    await dynamoDbClient.put(params).promise()
    res.json({ email, success: true, message: 'Successfully created!' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'There was an error creating user!' })
  }
})

app.use((req, res, next) => {
  return res.status(404).json({
    error: 'Not Found',
  })
})

module.exports.handler = serverless(app)
