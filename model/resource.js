/*
// models/resource.js

const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  requirements: {
    type: String,
    required: true
  },
  priority: {
    type: String,
    enum: ['Basic', 'Medium', 'Urgent', 'Critical'],
    required: true
  },
  area: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Resource', resourceSchema);
*/










const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  requirements: {
    type: String,
    required: false // Not required
  },
  priority: {
    type: String,
    enum: ['Basic', 'Medium', 'Urgent', 'Critical'],
    required: true
  },
  area: {
    type: String,
    required: false // Not required
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Resource', resourceSchema);
