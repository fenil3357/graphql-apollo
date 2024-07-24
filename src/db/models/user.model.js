import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'must provide a name'],
    maxlength: [50, 'name cannot be more than 50 characters']
  },
  email: {
    type: String,
    required: [true, 'must provide a email'],
    maxlength: [50, 'email can not be more than 50 characters'],
    unique: [true, 'the email is already in use']
  },
  password: {
    type: String,
    required: [true, 'must provide a password']
  },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
}, { timestamps: true });

export const userModel = mongoose.model('User', userSchema);
