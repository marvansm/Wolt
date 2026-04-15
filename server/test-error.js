const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function test() {
    try {
        let user = await prisma.user.findFirst({ where: { isEmailVerified: false } });
        if (!user) {
            console.log("Creating dummy user...");
            user = await prisma.user.create({
                data: {
                    email: "test.unverified" + Math.random() + "@test.com",
                    firstName: "Test",
                    lastName: "User",
                    provider: "local",
                    password: "test",
                    isEmailVerified: false
                }
            });
        }
        console.log("Found unverified user:", user.id, user.email);

        console.log("Calling API with user ID:", user.id);
        const res = await fetch("http://localhost:5000/users/request-profile-verification", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId: user.id,
                method: "email"
            })
        });
        const data = await res.json();
        if (!res.ok) {
            console.error("API Error:", res.status, data);
        } else {
            console.log("Success:", data);
        }
    } catch (e) {
        console.error("Error:", e);
    }
}
test();
