const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getMaintenanceMode = async (req, res) => {
    try {
        let settings = await prisma.settings.findFirst();
        if (!settings) {
            settings = await prisma.settings.create({
                data: { maintenanceMode: false }
            });
        }
        res.json({ maintenanceMode: settings.maintenanceMode });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.toggleMaintenanceMode = async (req, res) => {
    try {
        let settings = await prisma.settings.findFirst();
        if (!settings) {
            settings = await prisma.settings.create({
                data: { maintenanceMode: true }
            });
        } else {
            settings = await prisma.settings.update({
                where: { id: settings.id },
                data: { maintenanceMode: !settings.maintenanceMode }
            });
        }
        res.json({ maintenanceMode: settings.maintenanceMode });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
