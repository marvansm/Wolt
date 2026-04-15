const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function list() {
    const users = await prisma.user.findMany({
        select: { id: true, email: true, provider: true, isEmailVerified: true, googleId: true }
    });
    console.log("Users:", JSON.stringify(users, null, 2));
}
list();
