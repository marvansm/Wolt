const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
    const user = await prisma.user.findUnique({
        where: { email: 'lamiyaea@code.edu.az' }
    });
    console.log("User found:", JSON.stringify(user, null, 2));
}
check();
