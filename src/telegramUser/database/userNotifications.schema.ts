import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class UserNotificanion extends Document {
  @Prop()
  userId: number;

  @Prop()
  message: string;

  //@Prop()
  // somehow to define time
}

export const UserNotificanionSchema = SchemaFactory.createForClass(UserNotificanion);
