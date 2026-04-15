import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { CategoriesModule } from './categories/categories.module';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { OrdersModule } from './orders/orders.module';
import { UsersModule } from './users/users.module';
import { UploadModule } from './upload/upload.module';
import { StoresModule } from './stores/stores.module';
import { TrackingModule } from './tracking/tracking.module';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ReviewsModule } from './reviews/reviews.module';
import { MailModule } from './mail/mail.module';
import { AddressesModule } from './addresses/addresses.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MailModule,
    PrismaModule,
    CategoriesModule,
    RestaurantsModule,
    OrdersModule,
    UsersModule,
    UploadModule,
    StoresModule,
    TrackingModule,
    AuthModule,
    ReviewsModule,
    AddressesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}