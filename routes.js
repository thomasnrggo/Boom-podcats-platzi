const routes = require('next-routes')

module.exports = routes()                          
.add('index')
.add('channel', '/:slug.:id', 'channel')
.add('podcats', '/:slugChannel.:idChanel/:slug.:id', 'podcats' )