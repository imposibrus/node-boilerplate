
import * as express from 'express';
import api from './api';
import * as controllers from '../controllers';

const router = express.Router();

/* GET home page. */
router.get('/', controllers.homePageController);

router.use('/api', api);

export default router;
