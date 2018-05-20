'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  BACKEND_ADR: '"http://localhost:5001/"',
  NODE_ENV: '"development"'
})
