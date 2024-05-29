import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'must proide a name'],
    maxlength: [50, 'name cannot be more than 50 characters']
  },
  price: {
    type: Number,
    required: [true, 'must provide a price'],
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

export const productModel = mongoose.model('Product', productSchema);
