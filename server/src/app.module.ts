import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriesModule } from './categories/categories.module';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { OrdersModule } from './orders/orders.module';
import { UsersModule } from './users/users.module';
import { UploadModule } from './upload/upload.module';
import { StoresModule } from './stores/stores.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://marvansm:mervan123@ac-wir2nfv-shard-00-00.l88zhys.mongodb.net:27017,ac-wir2nfv-shard-00-01.l88zhys.mongodb.net:27017,ac-wir2nfv-shard-00-02.l88zhys.mongodb.net:27017/?ssl=true&replicaSet=atlas-axan6x-shard-0&authSource=admin&appName=Wolt'
    ),
    CategoriesModule,
    RestaurantsModule,
    OrdersModule,
    UsersModule,
    UploadModule,
    StoresModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
})
export class AppModule {}