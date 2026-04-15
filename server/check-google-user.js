const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
    const user = await prisma.user.findUnique({
        where: { email: 'ey870594@gmail.com' }
    });
    console.log("Google User found:", JSON.stringify(user, null, 2));
}
check();
