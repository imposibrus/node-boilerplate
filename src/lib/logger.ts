
import * as intel from 'intel';
import config from './config';

intel.basicConfig({
  format: '[%(date)s] %(name)s.%(levelname)s: %(message)s',
  level: intel[config.get('LOG_LEVEL')],
});

export default intel;
