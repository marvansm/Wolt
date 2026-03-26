import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type StoreDocument = Store & Document;

@Schema()
export class Store {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  image: string;

  @Prop({ default: false })
  isSponsored: boolean;

  @Prop({ default: true })
  hasWoltPlus: boolean;

  @Prop({ type: [{ name: String, category: String, categoryIcon: String, price: Number, originalPrice: Number, description: String, image: String, weight: String, unitPrice: String, badge: String }] })
  menu: { name: string; category?: string; categoryIcon?: string; price: number; originalPrice?: number; description?: string; image?: string; weight?: string; unitPrice?: string; badge?: string }[];
}

export const StoreSchema = SchemaFactory.createForClass(Store);
