const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const reviewRoutes = require('./routes/reviews');
const cartRoutes = require('./routes/cart');
const artisanRoutes = require('./routes/artisans');
const orderRoutes = require('./routes/orders');
const userRoutes = require('./routes/users');
const app = express();




app.get('/api/test', (req, res) => {
  res.json({ message: "API is working!" });
});

app.use(cors({
  origin: process.env.FRONTEND_URL || '*', 
  credentials: true
}));

app.use(express.json());


mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));


app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/artisans', artisanRoutes);
app.use('/api/orders', orderRoutes);
const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
