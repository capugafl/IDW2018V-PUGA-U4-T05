const mongoose = require('mongoose');
const _ = require('underscore');

module.exports = (wagner) => {
  mongoose.Promise = global.Promise;
  mongoose.connect('mongodb://localhost:27017/ittjornada', {
    useMongoClient: true
  });

  wagner.factory('db', () => mongoose);
  const Attender = require('./attender.model');

  const models = {
    Attender
  };

  _.each(models, (v, k) => {
    wagner.factory(k, () => v);
  });
}