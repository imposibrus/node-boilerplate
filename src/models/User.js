
import mongoose from 'mongoose';
import _ from 'lodash';

const Schema = mongoose.Schema;

const usersSchema = new Schema({
  name: {type: String, required: true},
  surname: {type: String},
  phone: {type: String},
  email: {type: String, required: true},
  photo: {
    original: String,
    preview: String
  },
  createdAt: {type: Date, default: Date.now},
  updatedAt: {type: Date, default: Date.now}
});

usersSchema.options.toJSON = {
  transform: (doc, ret) => {
    ret = _.pick(doc, ['id', 'name', 'surname', 'phone', 'email', 'site', 'district', 'about', 'photo', 'fullName'/*, 'social'*/]);
    return ret;
  }
};

usersSchema.pre('save', function(done) {
  this.updatedAt = new Date();
  done();
});

usersSchema.virtual('fullName').get(function() {
  return _.compact([this.name, this.surname]).join(' ');
}).set(function(fullName) {
  var names = fullName.split(' ');
  this.name = names[0];
  this.surname = names[1];
});

/**
 * textSearch
 * @param {String} text
 * @param {Object} [options]
 * @param {Function} cb
 */
usersSchema.statics.textSearch = function(text, options, cb) {
  if(!cb && typeof options === 'function') {
    cb = options;
    options = null;
  }
  // TODO: default params?
  options = _.extend({
    fields: ['name', 'surname'],
    limit: 20
  }, options);

  var preparedRegExp = text.replace(/\(|\)|-|\\|\^|\$|\*|\+|\?|\{|\}|\.|\[|\]|\|/g, '\\$&'),
      query = {
        $or: options.fields.map((field) => {
          var tmp = {};
          tmp[field] = new RegExp(preparedRegExp, 'i');
          return tmp;
        })
      };

  this.find(query).limit(options.limit).exec((err, foundUsers) => {
    if(err) {
      return cb(err);
    }

    if(options.exclude_id) {
      foundUsers = foundUsers.filter((user) => user.id != options.exclude_id);
    }
    cb(null, foundUsers);
  });
};


export default mongoose.model('User', usersSchema);
