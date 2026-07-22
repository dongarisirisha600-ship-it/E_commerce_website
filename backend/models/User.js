import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required.'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email address.']
    },
    password: {
      type: String,
      required: [true, 'Password is required.'],
      minlength: [8, 'Password must be at least 8 characters.'],
      select: false
    },
    profileImage: {
      type: String,
      default: ''
    },
    mobile: {
      type: String,
      default: ''
    },
    collegeName: {
      type: String,
      default: ''
    },
    branch: {
      type: String,
      default: ''
    },
    graduationYear: {
      type: String,
      default: ''
    },
    skills: {
      type: String,
      default: ''
    },
    gender: {
      type: String,
      default: ''
    },
    dob: {
      type: String,
      default: ''
    },
    acceptedTerms: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

userSchema.pre('save', async function hashPassword(next) {
  if (!this.isModified('password')) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function comparePassword(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;
