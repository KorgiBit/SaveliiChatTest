const path = require('path')

module.exports = {
    PORT: 3000,
    PUBLIC_DIR: path.join(__dirname,'..', 'public'),
    DATA_DIR: path.join(__dirname, '..', 'data'),
}