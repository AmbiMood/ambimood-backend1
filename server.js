// const express = require('express');
// const nodemailer = require('nodemailer');
// const cors = require('cors');
// const bcrypt = require('bcryptjs');

// const app = express();
// app.use(express.json());
// app.use(cors());

// const otpStorage = new Map();
// const users = new Map();

// // ⚠️ IMPORTANT: CHANGE PANNUNGA
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'ambimood2026@gmail.com',  // ← Ungaloda Gmail
//     pass: 'xmlz nlsh osql cile'            // ← App Password
//   }
// });

// function generateOTP() {
//   return Math.floor(100000 + Math.random() * 900000).toString();
// }

// // API 1: Signup - OTP Send
// app.post('/api/signup', async (req, res) => {
//   const { name, email, password } = req.body;
//   try {
//     console.log('📧 Signup request:', email);

//     if (users.has(email)) {
//       return res.status(400).json({ message: 'User already exists!' });
//     }

//     const otp = generateOTP();
//     console.log('🔢 OTP Generated:', otp);

//     otpStorage.set(email, {
//       otp,
//       name,
//       password,
//       expiresAt: Date.now() + 5 * 60 * 1000 // 5 mins
//     });

//     await transporter.sendMail({
//       from: 'ambimood2026@gmail.com',  // ← Ungaloda Gmail
//       to: email,
//       subject: 'Your OTP - Signup Verification',
//       html: `
//         <div style="font-family: Arial; padding: 20px; max-width: 400px;">
//           <h2 style="color: #4F46E5;">Welcome ${name}! 👋</h2>
//           <p>Your OTP for signup is:</p>
//           <h1 style="background: #EEF2FF; padding: 15px; text-align: center;
//               color: #4F46E5; font-size: 36px; letter-spacing: 8px; border-radius: 8px;">
//             ${otp}
//           </h1>
//           <p style="color: #666;">⏰ This OTP will expire in 5 minutes.</p>
//           <p style="color: #666;">If you didn't request this, ignore this email.</p>
//         </div>
//       `
//     });

//     console.log('✅ OTP Email sent to:', email);
//     res.json({ message: 'OTP sent to your email!', email });

//   } catch (error) {
//     console.error('❌ Error:', error.message);
//     res.status(500).json({ message: 'Error: ' + error.message });
//   }
// });

// // API 2: OTP Verify
// app.post('/api/verify-otp', async (req, res) => {
//   const { email, otp } = req.body;
//   try {
//     console.log('🔍 Verifying OTP for:', email);

//     const stored = otpStorage.get(email);

//     if (!stored) {
//       return res.status(400).json({ message: 'OTP not found! Request new OTP.' });
//     }

//     if (Date.now() > stored.expiresAt) {
//       otpStorage.delete(email);
//       return res.status(400).json({ message: 'OTP expired! Request new OTP.' });
//     }

//     if (stored.otp !== otp) {
//       return res.status(400).json({ message: 'Wrong OTP! Try again.' });
//     }

//     const hashedPassword = await bcrypt.hash(stored.password, 10);

//     users.set(email, {
//       name: stored.name,
//       email,
//       password: hashedPassword,
//       verified: true,
//       createdAt: new Date()
//     });

//     otpStorage.delete(email);

//     console.log('✅ User registered:', email);
//     res.json({
//       message: 'Signup successful!',
//       user: { name: stored.name, email }
//     });

//   } catch (error) {
//     console.error('❌ Error:', error.message);
//     res.status(500).json({ message: 'Error verifying OTP' });
//   }
// });

// // API 3: Resend OTP
// app.post('/api/resend-otp', async (req, res) => {
//   const { email } = req.body;
//   try {
//     const stored = otpStorage.get(email);

//     if (!stored) {
//       return res.status(400).json({ message: 'No pending signup found!' });
//     }

//     const newOTP = generateOTP();
//     console.log('🔄 New OTP:', newOTP);

//     otpStorage.set(email, {
//       ...stored,
//       otp: newOTP,
//       expiresAt: Date.now() + 5 * 60 * 1000
//     });

//     await transporter.sendMail({
//       from: 'ambimood2026@gmail.com',  // ← Ungaloda Gmail
//       to: email,
//       subject: 'New OTP - Signup Verification',
//       html: `
//         <div style="font-family: Arial; padding: 20px; max-width: 400px;">
//           <h2 style="color: #4F46E5;">New OTP 🔄</h2>
//           <p>Your new OTP is:</p>
//           <h1 style="background: #EEF2FF; padding: 15px; text-align: center;
//               color: #4F46E5; font-size: 36px; letter-spacing: 8px; border-radius: 8px;">
//             ${newOTP}
//           </h1>
//           <p style="color: #666;">⏰ This OTP will expire in 5 minutes.</p>
//         </div>
//       `
//     });

//     console.log('✅ New OTP sent to:', email);
//     res.json({ message: 'New OTP sent!' });

//   } catch (error) {
//     console.error('❌ Error:', error.message);
//     res.status(500).json({ message: 'Error resending OTP' });
//   }
// });

// app.listen(5000, () => {
//   console.log(`
// ╔════════════════════════════════════╗
// ║   ✅ Backend Running!             ║
// ║   📍 http://localhost:5000        ║
// ╚════════════════════════════════════╝
//   `);
// });





// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');
// const connectDB = require('./config/db'); 
// const app = express();
// connectDB();
// app.use(cors());
// app.use(express.json());

// const musicRoutes = require('./routes/musicRoutes');
// app.use('/api/music', musicRoutes);


// // Temporary OTP storage (MongoDB varum varaikum)
// const otpStorage = new Map();
// const users = new Map();

// const nodemailer = require('nodemailer');
// const bcrypt = require('bcryptjs');

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

// // ✅ Existing Routes - Same ah work aagum!
// app.post('/api/signup', async (req, res) => {
//   const { name, email, password } = req.body;
//   try {
//     if (users.has(email)) {
//       return res.status(400).json({ message: 'User already exists!' });
//     }
//     const otp = generateOTP();
//     console.log(`📧 OTP for ${email}: ${otp}`);
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
//     console.error(error);
//     res.status(500).json({ message: error.message });
//   }
// });

// app.post('/api/verify-otp', async (req, res) => {
//   const { email, otp } = req.body;
//   try {
//     const stored = otpStorage.get(email);
//     if (!stored) return res.status(400).json({ message: 'OTP not found!' });
//     if (Date.now() > stored.expiresAt) {
//       otpStorage.delete(email);
//       return res.status(400).json({ message: 'OTP expired!' });
//     }
//     if (stored.otp !== otp) return res.status(400).json({ message: 'Invalid OTP!' });
//     const hashedPassword = await bcrypt.hash(stored.password, 10);
//     users.set(email, {
//       name: stored.name, email,
//       password: hashedPassword,
//       verified: true
//     });
//     otpStorage.delete(email);
//     console.log('✅ User registered:', email);
//     res.json({ message: 'Signup successful!', user: { name: stored.name, email } });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// app.post('/api/resend-otp', async (req, res) => {
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
// });

// // ✅ Test route
// app.get('/', (req, res) => {
//   res.json({ message: '🎵 AMBI MOOD Backend Running!' });
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`
// ╔════════════════════════════════════╗
// ║   🎵 AMBI MOOD Backend Running!   ║
// ║   ✅ Port: ${PORT}                   ║
// ╚════════════════════════════════════╝
//   `);
// });





// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');
// const connectDB = require('./config/db');

// const app = express();

// // ✅ MongoDB Connect
// connectDB();

// app.use(cors());
// app.use(express.json());

// // ✅ Routes
// const authRoutes = require('./routes/authuRoutes');
// const musicRoutes = require('./routes/musicRoutes');

// app.use('/api', authRoutes);
// app.use('/api/music', musicRoutes);


// //for like button

// // ✅ LOGIN

// // ✅ SAVE FAVORITE
// //const User = require('./models/user');


// const bcrypt = require('bcryptjs');
// const User = require('./models/user');


// app.get('/', (req, res) => {
//   res.json({ message: '🎵 AMBI MOOD Backend Running!' });
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`✅ Server running on port ${PORT}`);
// });


require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

// ✅ MongoDB Connect
connectDB();

// ✅ CORS - Frontend URL allow பண்ணு
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://ambimood-frontend1.vercel.app"
  ],
  methods: ["GET","POST","PUT","DELETE"],
  credentials: true
}));
// app.use(cors({
//   origin: process.env.FRONTEND_URL || 'http://localhost:5173',
//   credentials: true
// }));

app.use(express.json());

// ✅ Routes
const authRoutes = require('./routes/authuRoutes');
const musicRoutes = require('./routes/musicRoutes');

app.use('/api', authRoutes);
app.use('/api/music', musicRoutes);

// ✅ Test route
app.get('/', (req, res) => {
  res.json({ message: '🎵 AMBI MOOD Backend Running!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});