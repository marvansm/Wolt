import { MongoClient } from 'mongodb';

const uri = 'mongodb://marvansm:mervan123@ac-wir2nfv-shard-00-00.l88zhys.mongodb.net:27017,ac-wir2nfv-shard-00-01.l88zhys.mongodb.net:27017,ac-wir2nfv-shard-00-02.l88zhys.mongodb.net:27017/?ssl=true&replicaSet=atlas-axan6x-shard-0&authSource=admin&appName=Wolt';

async function main() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    console.log('Connected to Atlas');
    
    const admin = client.db('admin');
    const dbs = await admin.admin().listDatabases();
    console.log('Available databases:', dbs.databases.map((db: any) => db.name));

    for (const dbInfo of dbs.databases) {
        if (dbInfo.name === 'admin' || dbInfo.name === 'local' || dbInfo.name === 'config') continue;
        
        console.log(`\nChecking database: ${dbInfo.name}`);
        const db = client.db(dbInfo.name);
        const collections = await db.listCollections().toArray();
        console.log('Collections:', collections.map((c: any) => c.name));
        
        for (const col of collections) {
            const count = await db.collection(col.name).countDocuments();
            console.log(`- ${col.name}: ${count} docs`);
        }
    }

  } finally {
    await client.close();
  }
}

main().catch(console.error);
