import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OrderDocument = Order & Document;

@Schema()
export class Order {
  @Prop({ required: true })
  customerName: string;

  @Prop({ required: true })
  total: number;

  @Prop({ required: true, enum: ['pending', 'preparing', 'delivered', 'cancelled'], default: 'pending' })
  status: string;

  @Prop([String])
  items: string[];

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
