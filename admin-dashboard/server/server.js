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

// Basic health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
});

// Import routes
const productRoutes = require('./src/routes/productRoutes');
const settingsRoutes = require('./src/routes/settingsRoutes');

app.use('/api/products', productRoutes);
app.use('/api/settings', settingsRoutes);

const path = require('path');

// Serve uploaded images (legacy fallback)
app.use('/uploads', express.static('uploads'));

// Serve catalog assets dynamically for local dashboard previews
app.use('/assets', express.static(path.join(__dirname, '../../assets')));

// Export app for Vercel (Serverless)
module.exports = app;

// Only listen if running directly (dev/local)
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}
