// const jwt = require('jsonwebtoken');  // ✅ Add this
// const bcrypt = require('bcryptjs');
// const nodemailer = require('nodemailer');
// const User = require('../models/user');
// const OTP = require('../models/otp');  // ✅ Add this
// require('dotenv').config();


// // const bcrypt = require('bcryptjs');
// // const nodemailer = require('nodemailer');
// // const User = require('../models/user');
// // require('dotenv').config();

// // OTP temp storage (இது memory-ல இருக்கட்டும் — verify ஆனதும் போயிடும்)
// const otpStorage = new Map();

// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS
//   }
// });

// function generateOTP() {
//   return Math.floor(100000 + Math.random() * 900000).toString();
// }

// // ✅ Signup — OTP send பண்ணு
// const signup = async (req, res) => {
//   const { name, email, password } = req.body;
//   try {
//     // MongoDB-ல user already இருக்கான்னு check பண்ணு
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: 'User already exists!' });
//     }

//     const otp = generateOTP();
//     otpStorage.set(email, {
//       otp, name, password,
//       expiresAt: Date.now() + 5 * 60 * 1000
//     });

//     await transporter.sendMail({
//       from: process.env.EMAIL_USER,
//       to: email,
//       subject: 'AMBI MOOD - Verify Your Email',
//       html: `
//         <div style="font-family: Arial; padding: 30px;">
//           <h1 style="color: #8b5cf6;">AMBI MOOD 🎵</h1>
//           <p>Welcome ${name}! Your OTP is:</p>
//           <h1 style="color: #8b5cf6; font-size: 48px; letter-spacing: 10px;">${otp}</h1>
//           <p>Expires in 5 minutes.</p>
//         </div>
//       `
//     });

//     res.json({ message: 'OTP sent!', email });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // ✅ Verify OTP — MongoDB-ல User Save பண்ணு
// const verifyOTP = async (req, res) => {
//   const { email, otp } = req.body;
//   try {
//     const stored = otpStorage.get(email);
//     if (!stored) return res.status(400).json({ message: 'OTP not found!' });
//     if (Date.now() > stored.expiresAt) {
//       otpStorage.delete(email);
//       return res.status(400).json({ message: 'OTP expired!' });
//     }
//     if (stored.otp !== otp) return res.status(400).json({ message: 'Invalid OTP!' });

//     // ✅ Password hash பண்ணி MongoDB-ல save பண்ணு
//     const hashedPassword = await bcrypt.hash(stored.password, 10);
//     const newUser = new User({
//       name: stored.name,
//       email,
//       password: hashedPassword,
//       verified: true
//     });
//     await newUser.save();

//     otpStorage.delete(email);
//     console.log('✅ User saved to MongoDB:', email);

    
//     res.json({ 
//       message: 'Signup successful!', 
//       user: { name: stored.name, email } 
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // ✅ Login — MongoDB-ல check பண்ணு
// const login = async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: 'User not found!' });
//     }
//     if (!user.verified) {
//       return res.status(400).json({ message: 'Please verify your email!' });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: 'Wrong password!' });
//     }

//     // ✅ Login success — user data return பண்ணு
//     res.json({ 
//       message: 'Login successful!',
//       user: { name: user.name, email: user.email }
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // ✅ Resend OTP
// const resendOTP = async (req, res) => {
//   const { email } = req.body;
//   try {
//     const stored = otpStorage.get(email);
//     if (!stored) return res.status(400).json({ message: 'No pending signup!' });

//     const newOTP = generateOTP();
//     otpStorage.set(email, { ...stored, otp: newOTP, expiresAt: Date.now() + 5 * 60 * 1000 });

//     await transporter.sendMail({
//       from: process.env.EMAIL_USER,
//       to: email,
//       subject: 'AMBI MOOD - New OTP',
//       html: `<h2>Your new OTP: <strong style="color: #8b5cf6;">${newOTP}</strong></h2>`
//     });

//     res.json({ message: 'New OTP sent!' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// module.exports = { signup, verifyOTP, login, resendOTP };




const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const User = require('../models/user');
const OTP = require('../models/otp');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// ✅ Signup — OTP send பண்ணு
const signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // MongoDB-ல user already இருக்கான்னு check பண்ணு
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists!' });
    }

    const otp = generateOTP();
    
    // ✅ OTP-ஐ Database-ல save பண்ணு (Memory இல்ல)
    await OTP.create({ email, otp, name, password });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'AMBI MOOD - Verify Your Email',
      html: `
        <div style="font-family: Arial; padding: 30px;">
          <h1 style="color: #8b5cf6;">AMBI MOOD 🎵</h1>
          <p>Welcome ${name}! Your OTP is:</p>
          <h1 style="color: #8b5cf6; font-size: 48px; letter-spacing: 10px;">${otp}</h1>
          <p>Expires in 5 minutes.</p>
        </div>
      `
    });

    res.json({ message: 'OTP sent!', email });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Verify OTP — MongoDB-ல User Save பண்ணு
const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;
  try {
    // ✅ Database-லிருந்து OTP எடு
    const stored = await OTP.findOne({ email, otp });
    if (!stored) {
      return res.status(400).json({ message: 'Invalid OTP or expired!' });
    }

    // ✅ Password hash பண்ணி MongoDB-ல save பண்ணு
    const hashedPassword = await bcrypt.hash(stored.password, 10);
    const newUser = new User({
      name: stored.name,
      email,
      password: hashedPassword,
      verified: true
    });
    await newUser.save();

    // ✅ OTP-ஐ database-லிருந்து delete பண்ணு
    await OTP.deleteOne({ email });
    console.log('✅ User saved to MongoDB:', email);

    res.json({ 
      message: 'Signup successful!', 
      user: { name: stored.name, email } 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Login — MongoDB-ல check பண்ணு
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found!' });
    }
    if (!user.verified) {
      return res.status(400).json({ message: 'Please verify your email!' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Wrong password!' });
    }

    // ✅ JWT Token generate பண்ணு
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // ✅ Login success — user data + token return பண்ணு
    res.json({ 
      message: 'Login successful!',
      user: { name: user.name, email: user.email },
      token  // ✅ Token add பண்ணிட்டோம்
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Resend OTP
const resendOTP = async (req, res) => {
  const { email } = req.body;
  try {
    // ✅ Database-லிருந்து OTP எடு
    const stored = await OTP.findOne({ email });
    if (!stored) {
      return res.status(400).json({ message: 'No pending signup!' });
    }

    const newOTP = generateOTP();
    
    // ✅ Database-ல OTP update பண்ணு
    await OTP.updateOne({ email }, { otp: newOTP, createdAt: Date.now() });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'AMBI MOOD - New OTP',
      html: `<h2>Your new OTP: <strong style="color: #8b5cf6;">${newOTP}</strong></h2>`
    });

    res.json({ message: 'New OTP sent!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { signup, verifyOTP, login, resendOTP };