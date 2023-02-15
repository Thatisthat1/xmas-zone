import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import bycript from 'bcryptjs';

export type UserDocument = HydratedDocument<
  User,
  {
    comparePassword(password: string);
  }
>;

@Schema()
export class User {
  @Prop({
    required: true,
    unique: true,
    minlength: 6,
  })
  username: string;

  @Prop({
    required: true,
  })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', function (next: any) {
  const user = this;

  if (this.isModified('password') || this.isNew) {
    const salt = bycript.genSaltSync(10);
    const hashPassword = bycript.hashSync(user.password, salt);
    user.password = hashPassword;
    next();
  }
});

UserSchema.methods.comparePassword = async function (password: string) {
  return bycript.compare(password, this.password);
};
