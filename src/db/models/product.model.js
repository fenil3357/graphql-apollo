import mongoose from 'mongoose';
import { userModel } from './user.model.js';
import { CustomError, httpStatusCodes } from '../../constants/constants.js';

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

productSchema.post('save', async function(doc, next) {
  try {
    await userModel.findByIdAndUpdate(doc.user, { $push: { products: doc._id } });
  } catch (error) {
    next(error);
  }
});

productSchema.pre('findOneAndDelete', async function(next) {
  try {
    const id = this?._conditions?._id;
    const productToBeDeleted = await productModel.findById(id);

    if(!productToBeDeleted) throw new CustomError(httpStatusCodes['Not Found'], 'Product with given id does not exists');

    await userModel.findByIdAndUpdate(productToBeDeleted.user, { $pull: { products: id} });
    next();
  } catch (error) {
    next(error);
  }
});

export const productModel = mongoose.model('Product', productSchema);
