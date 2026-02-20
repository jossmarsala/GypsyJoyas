const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    try {
        console.log('Connecting to database...');
        const count = await prisma.product.count();
        console.log(`Successfully connected! Found ${count} products in the database.`);

        if (count > 0) {
            const first = await prisma.product.findFirst();
            console.log('Sample product:', first.nombre);
        }
    } catch (e) {
        console.error('Connection failed:', e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
