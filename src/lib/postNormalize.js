
import formidable from 'formidable';

export default function(req, res, next) {
  /* istanbul ignore next */
  if(/multipart\/form-data/.test(req.get('content-type'))) {
    var form = new formidable.IncomingForm();
    form.hash = 'md5';
    form.parse(req, function(err, fields, files) {
      if(err) {
        next(err);
      }
      req.files = files;
      req.body = fields;
      next();
    });
  } else {
    next();
  }
};
