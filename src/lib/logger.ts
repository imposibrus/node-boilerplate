
import * as intel from 'intel';
import config from './config';

intel.basicConfig({
  // file: '/path/to/file.log', // file and stream are exclusive. only pass 1
  format: '[%(date)s] %(name)s.%(levelname)s: %(message)s',
  level: intel[config.get('LOG_LEVEL')]
});

export default intel;
