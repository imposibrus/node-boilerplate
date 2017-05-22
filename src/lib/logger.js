
const intel = require('intel'),
    config = require('./config');

intel.basicConfig({
    format: '[%(date)s] %(name)s.%(levelname)s: %(message)s',
    level: intel[config.get('LOG_LEVEL')]
});

module.exports = intel;
