import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RestaurantDocument = Restaurant & Document;

@Schema()
export class Restaurant {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop()
  image: string;

  @Prop()
  banner: string;

  @Prop()
  avatar: string;

  @Prop()
  deliveryTime: string;

  @Prop()
  rating: number;

  @Prop()
  priceRange: string;

  @Prop()
  deliveryFee: string;

  @Prop()
  minOrderAmount?: number;

  @Prop()
  promo?: string;

  @Prop()
  address: string;

  @Prop({ type: [{ name: String, category: String, categoryIcon: String, price: Number, originalPrice: Number, description: String, image: String, weight: String, unitPrice: String, badge: String }] })
  menu: { name: string; category?: string; categoryIcon?: string; price: number; originalPrice?: number; description?: string; image?: string; weight?: string; unitPrice?: string; badge?: string }[];
}

export const RestaurantSchema = SchemaFactory.createForClass(Restaurant);
