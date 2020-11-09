const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Classes = new Schema({
}, {
  timestamps: true
})

mongoose.model('Classes', Classes);