const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

const DATA_DIR = path.resolve(__dirname, '../../../data'); // Adjust based on location

async function seed() {
    console.log(`Scanning data directory: ${DATA_DIR}`);

    const files = ['aros.json', 'collares.json', 'anillos.json', 'pulseras.json', 'accesorios.json'];

    for (const file of files) {
        const filePath = path.join(DATA_DIR, file);
        if (!fs.existsSync(filePath)) {
            console.log(`Skipping ${file}, not found.`);
            continue;
        }

        const categoryName = file.replace('.json', '');
        console.log(`Processing ${categoryName}...`);

        const rawData = fs.readFileSync(filePath, 'utf-8');
        const products = JSON.parse(rawData);

        for (const p of products) {
            // Check if exists to avoid duplicates (based on name + category distinctness ideally)
            // But for simplicity, we just create. Since DB is fresh, it's fine.
            // Or we can use upsert if we had a unique constraint on name. 
            // We'll just use create for now since it's a one-time migration.

            await prisma.product.create({
                data: {
                    nombre: p.nombre,
                    precio: p.precio,
                    imagen: p.imagen,
                    alt: p.alt,
                    material: p.material,
                    categoria: p.categoria || categoryName, // Fallback if missing in JSON
                    claseImagen: p.claseImagen || null
                }
            });
        }
        console.log(`Imported ${products.length} items from ${file}`);
    }

    console.log('Seeding completed.');
}

seed()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
