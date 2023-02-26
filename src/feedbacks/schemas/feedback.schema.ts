import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type FeedbackDocument = HydratedDocument<Feedback>;

@Schema({
  timestamps: true,
})
export class Feedback {
  @Prop({
    required: true,
    unique: true,
    minlength: 6,
  })
  name: string;

  @Prop()
  phone: string;

  @Prop()
  email: string;

  @Prop()
  country: string;

  @Prop({
    required: true,
  })
  feedback: string;
}

export const FeedbackSchema = SchemaFactory.createForClass(Feedback);
