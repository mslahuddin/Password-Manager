import mongoose from 'mongoose';

// Define the schema for the PasswordManager
const passwordManagerSchema = new mongoose.Schema({
site: {
        type: String,
        required: true,
        trim: true,
      },
  username: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the model from the schema
const PasswordManager = mongoose.model('PasswordManager', passwordManagerSchema);

export default PasswordManager;
