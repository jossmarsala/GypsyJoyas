const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();

const prisma = new PrismaClient();

async function main() {
  const email = process.argv[2];
  const password = process.argv[3];
  const name = process.argv[4] || 'Admin';

  if (!email || !password) {
    console.error('Uso: node create-admin.js <email> <password> [nombre]');
    process.exit(1);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });
    console.log('Usuario administrador creado con éxito:', user.email);
  } catch (error) {
    console.error('Error al crear el usuario:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

main();
