const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
});

const authRoutes = require('./src/routes/authRoutes');
const productRoutes = require('./src/routes/productRoutes');
const settingsRoutes = require('./src/routes/settingsRoutes');
const authMiddleware = require('./src/middleware/authMiddleware');

app.use('/api/auth', authRoutes);

// Public routes (GET) vs Protected routes (POST, PUT, DELETE)
// However, since this is an admin dashboard server, we might want to 
// protect everything or use specific middleware inside the routes files.
// For now, let's keep it simple: auth routes are public, products/settings are protected 
// if they are not GET. But actually, in your case, the public site fetches GET /api/products.
// So let's handle protection INSIDE the route files for more granularity.

app.use('/api/products', productRoutes);
app.use('/api/settings', settingsRoutes);

const path = require('path');

app.use('/uploads', express.static('uploads'));

app.use('/assets', express.static(path.join(__dirname, '../../assets')));

module.exports = app;

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}
