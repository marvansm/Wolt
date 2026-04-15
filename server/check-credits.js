const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
    const users = await prisma.user.findMany({
        select: { id: true, email: true, credit: true }
    });
    console.log("Users and Credits:", JSON.stringify(users, null, 2));
}
check();
