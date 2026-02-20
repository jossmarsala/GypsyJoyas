const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { put } = require('@vercel/blob');

// Get all products
exports.getProducts = async (req, res) => {
    try {
        const { category, material } = req.query;
        let where = {};
        if (category) where.categoria = category;
        if (material) where.material = material;

        const products = await prisma.product.findMany({
            where,
            orderBy: { createdAt: 'desc' }
        });
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get single product
exports.getProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await prisma.product.findUnique({
            where: { id: parseInt(id) }
        });
        if (!product) return res.status(404).json({ error: 'Product not found' });
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create product
exports.createProduct = async (req, res) => {
    try {
        const { nombre, precio, category, material, alt, claseImagen } = req.body;

        let imagenPath = '';
        if (req.file) {
            // Upload to Vercel Blob
            const blob = await put(req.file.originalname, req.file.buffer, { access: 'public' });
            imagenPath = blob.url;
        }

        const product = await prisma.product.create({
            data: {
                nombre,
                precio: parseInt(precio),
                categoria: category,
                material,
                imagen: imagenPath,
                alt,
                claseImagen: claseImagen || null
            }
        });
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update product
exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, precio, category, material, alt, claseImagen } = req.body;

        const data = {
            nombre,
            precio: parseInt(precio),
            categoria: category,
            material,
            alt,
            claseImagen: claseImagen || null
        };

        if (req.file) {
            const blob = await put(req.file.originalname, req.file.buffer, { access: 'public' });
            data.imagen = blob.url;
        }

        const product = await prisma.product.update({
            where: { id: parseInt(id) },
            data
        });
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete product
exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.product.delete({
            where: { id: parseInt(id) }
        });
        res.json({ message: 'Product deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Bulk Price Update
exports.bulkUpdatePrice = async (req, res) => {
    try {
        const { percentage, category, material } = req.body;
        // 1. Fetch eligible products
        let where = {};
        if (category) where.categoria = category;
        if (material) where.material = material;

        const products = await prisma.product.findMany({ where });

        // 2. Calculate and Update 
        const updates = products.map(p => {
            const newPrice = Math.round(p.precio * (1 + (percentage / 100)));
            return prisma.product.update({
                where: { id: p.id },
                data: { precio: newPrice }
            });
        });

        await Promise.all(updates);

        res.json({ message: `Updated ${products.length} products.` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
