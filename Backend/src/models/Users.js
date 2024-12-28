import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

// Documentation for User schema
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - email
 *         - name
 *       properties:
 *         email:
 *           type: string
 *           description: User's email
 *         name:
 *           type: string
 *           description: User's name
 */

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: '30m',
  });
  return token;
};

const Users = mongoose.model('Users', userSchema);
export default Users;
