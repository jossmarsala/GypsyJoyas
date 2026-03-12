const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { put } = require('@vercel/blob');

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

exports.createProduct = async (req, res) => {
    try {
        const { nombre, precio, category, material, alt, claseImagen } = req.body;

        let imagenPath = '';
        if (req.file) {
            
            const blob = await put(req.file.originalname, req.file.buffer, { access: 'public', addRandomSuffix: true });
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
            const blob = await put(req.file.originalname, req.file.buffer, { access: 'public', addRandomSuffix: true });
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

exports.bulkUpdatePrice = async (req, res) => {
    try {
        const { percentage, category, material } = req.body;
        
        let where = {};
        if (category) where.categoria = category;
        if (material) where.material = material;

        const products = await prisma.product.findMany({ where });

        
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
