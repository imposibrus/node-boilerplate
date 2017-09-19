
const path = require('path'),
    express = require('express'),
    controllers = require('require-all')(path.join(__dirname, '../controllers')),
    api = require('./api'),
    router = express.Router();

/* GET home page. */
router.get('/', controllers.home);

router.use('/api', api);

module.exports = router;
