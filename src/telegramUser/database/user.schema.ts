import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop()
  id: number;

  @Prop()
  first_name: string;
  
  @Prop()
  last_name: string;

  @Prop()
  username: string;
  
  @Prop()
  language_code: string;

  @Prop()
  is_bot: boolean
}

export const UserSchema = SchemaFactory.createForClass(User);
