const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

const DATA_DIR = path.resolve(__dirname, '../../../data'); 

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
            
            
            
            

            await prisma.product.create({
                data: {
                    nombre: p.nombre,
                    precio: p.precio,
                    imagen: p.imagen,
                    alt: p.alt,
                    material: p.material,
                    categoria: p.categoria || categoryName, 
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
