
import * as express from 'express';
import api from './api';

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Express' });
});

router.use('/api', api);

export default router;
