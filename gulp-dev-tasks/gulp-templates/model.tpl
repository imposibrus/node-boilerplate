

import mongoose from 'mongoose';
import _ from 'lodash';

const Schema = mongoose.Schema;

const <%= pluralForm %>Schema = new Schema({
  firstName: {type: String},
  lastName: {type: String},
  phone: {type: String},
  email: {type: String, required: true},
  photo: {
    original: String,
    preview: String
  },
  createdAt: {type: Date, default: Date.now},
  updatedAt: {type: Date, default: Date.now}
});

<%= pluralForm %>Schema.options.toJSON = {
  transform: (doc, ret) => {
    ret = _.pick(doc, ['id', 'firstName', 'lastName', 'phone', 'email', 'photo']);
    return ret;
  }
};

<%= pluralForm %>Schema.pre('save', function(done) {
  this.updatedAt = new Date();
  done();
});

export default mongoose.model('<%= modelName %>', <%= pluralForm %>Schema);

