import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
  id: string;
  name: string;
  email: string;
  password: string;
}

const UserSchema: Schema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

export default mongoose.model<IUser>('User', UserSchema);
