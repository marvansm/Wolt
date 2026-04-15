const mongoose = require('mongoose');

const uri = 'mongodb+srv://marvansm:marvansm@cluster0.h76m8.mongodb.net/wolt?ssl=true&authSource=admin';

async function seed() {
    try {
        await mongoose.connect(uri);
        console.log('Connected to MongoDB');

        const Restaurant = mongoose.model('Restaurant', new mongoose.Schema({
            name: String,
            latitude: Number,
            longitude: Number
        }, { strict: false }));

       
        const updates = [
            { name: "Shaurma №1 Binagadi", lat: 40.4093, lng: 49.8671 },
            { name: "McDonald's & McCafe Binagadi", lat: 40.4120, lng: 49.8650 },
            { name: "KFC 28 May", lat: 40.3798, lng: 49.8486 }
        ];

        for (const up of updates) {
            const result = await Restaurant.updateOne(
                { name: new RegExp(up.name, 'i') },
                { $set: { latitude: up.lat, longitude: up.lng } }
            );
            console.log(`Updated ${up.name}: ${result.modifiedCount} matches`);
        }

        console.log('Seeding complete');
        process.exit(0);
    } catch (err) {
        console.error('Seeding failed', err);
        process.exit(1);
    }
}

seed();
