
const path = require('path'),
    express = require('express'),
    controllers = require('require-all')(path.join(__dirname, '../controllers')),
    router = express.Router();

/* GET home page. */
router.get('/', controllers.home);

module.exports = router;
