import path from 'node:path';
import fs from 'node:fs';
import User from '../models/User.js';
import { sendError } from '../utils/errorResponse.js';

const buildUserResponse = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  profileImage: user.profileImage,
  mobile: user.mobile,
  collegeName: user.collegeName,
  branch: user.branch,
  graduationYear: user.graduationYear,
  skills: user.skills,
  gender: user.gender,
  dob: user.dob,
  acceptedTerms: user.acceptedTerms
});

export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, mobile, collegeName, branch, graduationYear, skills, gender, dob, acceptedTerms } = req.body;

    if (!name || !email || !password) {
      return sendError(res, 'Name, email, and password are required.', 400);
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return sendError(res, 'An account with this email already exists.', 409);
    }

    const profileImage = req.file ? `/uploads/${req.file.filename}` : '/uploads/default-avatar.svg';

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password,
      mobile,
      collegeName,
      branch,
      graduationYear,
      skills,
      gender,
      dob,
      acceptedTerms: Boolean(acceptedTerms),
      profileImage
    });

    res.status(201).json({
      message: 'Registration successful.',
      user: buildUserResponse(user)
    });
  } catch (error) {
    if (req.file) {
      const uploadPath = path.resolve('uploads', req.file.filename);
      if (fs.existsSync(uploadPath)) {
        fs.unlinkSync(uploadPath);
      }
    }

    if (error.code === 11000) {
      return sendError(res, 'An account with this email already exists.', 409);
    }

    if (error.name === 'ValidationError') {
      const details = Object.values(error.errors).map((item) => item.message);
      return sendError(res, 'Validation failed.', 400, details);
    }

    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return sendError(res, 'Email and password are required.', 400);
    }

    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
    if (!user) {
      return sendError(res, 'Invalid email or password.', 401);
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return sendError(res, 'Invalid email or password.', 401);
    }

    res.json({
      message: 'Login successful.',
      user: buildUserResponse(user)
    });
  } catch (error) {
    next(error);
  }
};
