const mongoose = require('mongoose');

const EventsAttended = new mongoose.Schema({
  eventName: { type: String, required: true },
  speaker: { type: String, required: true },
  eventType: { type: String, required: true },
  headQuarters: { type: String, required: true },
  date: { type: String, required: true },
  duration: { type: Number, required: true },
  schedule: { type: String, required: true },
  assistance: { type: Boolean, default: false },
  confirmed: { type: Boolean, default: false },
  preferred: { type: Boolean, default: false }
});

var validateEmail = function(email) {
  var re = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
  
  return re.test(email)
};

let attenderSchema = new mongoose.Schema({
  name: {
    firstName: { type: String },
    lastName: { type: String },
    fullName: { type: String, required: true }
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    //unique: true,
    required: 'Email address is required',
    validate: [validateEmail, 'Please fill a valid email address'],
    match: [/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/, 'Please fill a valid email address']
  },
  emailSend: {
    type: Boolean,
    default: false
  },
  career: { type: String },
  organization: { type: String },
  controlNumber: { type: String },
  email_counter: { type: Number, default: 0 },
  registredAt: { type: Date, default: new Date() },
  events: [EventsAttended]
});

const attenderModel = mongoose.model('AttenderSchema', attenderSchema, 'attenders');



module.exports = attenderModel;