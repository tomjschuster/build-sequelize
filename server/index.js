'use strict'
const server = require('./server.js')
const port = (process.env.PORT || 8080)
const app = server.app()


if (process.env.NODE_ENV !== 'production') {

  const webpack = require('webpack')
  const config = require('../config/webpack.dev.config.js')
  const compiler = webpack(config)
  const devMiddlewareConfig = {
    noInfo: true,
    publicPath: config.output.publicPath
  }

  app.use(require('webpack-hot-middleware')(compiler))
  app.use(require('webpack-dev-middleware')(compiler, devMiddlewareConfig))

}


console.log('NODE_ENV:', process.env.NODE_ENV)
app.listen(port, () => console.log(`Listening on ${port}...`))
