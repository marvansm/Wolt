const mongoose = require('mongoose');
const uri = 'mongodb+srv://marvansm:marvansm@cluster0.h76m8.mongodb.net/wolt?ssl=true&authSource=admin';

async function check() {
    try {
        await mongoose.connect(uri);
        const db = mongoose.connection.db;
        const restaurants = db.collection('restaurants');
        const list = await restaurants.find({ latitude: { $exists: true } }).toArray();
        console.log('Restaurants with coordinates:');
        list.forEach(r => console.log(`- ${r.name}: ${r.latitude}, ${r.longitude}`));
        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}
check();
