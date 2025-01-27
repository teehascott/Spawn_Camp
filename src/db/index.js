const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
module.exports = prisma;
const { Client } = require('pg');
const client = new Client(process.env.DATABASE_URL || 'postgresql://nep:nepeta@localhost:5432/capstone');
module.exports = client;