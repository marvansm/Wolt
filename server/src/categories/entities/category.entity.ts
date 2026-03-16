import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CategoryDocument = Category & Document;

@Schema()
export class Category {
  @Prop()
  id: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  image: string;

  @Prop()
  bgColor: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
