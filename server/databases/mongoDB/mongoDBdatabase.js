const moongose = require('mongoose');
const { Schema } = mongoose;

const mongoDBSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  userid: {
    type: String,
    required: true,
    unique: true
  }
});

module.exports = mongoose.model('MongoDB', mongoDBSchema);