import mongoose from 'mongoose';

const uri = 'mongodb://marvansm:mervan123@ac-wir2nfv-shard-00-00.l88zhys.mongodb.net:27017,ac-wir2nfv-shard-00-01.l88zhys.mongodb.net:27017,ac-wir2nfv-shard-00-02.l88zhys.mongodb.net:27017/?ssl=true&replicaSet=atlas-axan6x-shard-0&authSource=admin&appName=Wolt';

async function main() {
  console.log('Connecting to Atlas...');
  await mongoose.connect(uri);
  console.log('Connected.');
  
  if (!mongoose.connection.db) {
    console.error('Connection.db is undefined');
    return;
  }

  const adminDb = mongoose.connection.db.admin();
  const dbs = await adminDb.listDatabases();
  console.log('Available databases:', dbs.databases.map((db: any) => db.name));
  
  for (const dbInfo of dbs.databases) {
      if (['admin', 'local', 'config'].includes(dbInfo.name)) continue;
      
      console.log(`\n--- Database: ${dbInfo.name} ---`);
      const db = mongoose.connection.useDb(dbInfo.name);
      if (!db.db) continue;
      
      const collections = await db.db.listCollections().toArray();
      console.log('Collections:', collections.map(c => c.name));
      
      for (const col of collections) {
          const count = await db.db.collection(col.name).countDocuments();
          console.log(`- ${col.name}: ${count} documents`);
      }
  }
  
  await mongoose.disconnect();
  console.log('\nDisconnected.');
}

main().catch(error => {
    console.error('Error during diagnostic:', error);
    process.exit(1);
});
