const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function test() {
  try {
    const restaurant = await prisma.restaurant.findFirst();
    const user = await prisma.user.findFirst();
    
    if (!restaurant || !user) {
      console.log("No restaurant or user found to test review.");
      return;
    }

    console.log(`Creating review for restaurant ${restaurant.id} and user ${user.id}`);
    const review = await prisma.review.create({
      data: {
        rating: 5,
        comment: "Test review from script",
        userId: user.id,
        restaurantId: restaurant.id
      }
    });
    console.log("Review created successfully:", review);

    const reviews = await prisma.review.findMany({
      where: { restaurantId: restaurant.id },
      include: { user: true }
    });
    console.log(`Found ${reviews.length} reviews for the restaurant.`);

  } catch (err) {
    console.error("Migration/Database error:", err);
  } finally {
    await prisma.$disconnect();
  }
}

test();
