const express   = require('express')
const path      = require('path')
const server    = express()
const port      = process.env.PORT || 3000

// server config
server.use(express.static(path.join(__dirname, '../public')))
server.set('view engine', 'ejs')

// route config
server.use(require('./routes/index'))

// start server
server.listen(port, () => console.log(`Server running on port ${port}...`));