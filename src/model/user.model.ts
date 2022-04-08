import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();

export interface UserDocument extends mongoose.Document {
  id:mongoose.Types.ObjectId;
  name: string;
  password: string;
  email: string;
  isAdmin: Boolean;
  comparePassword(condidatePassword: string): Promise<Boolean>;
}
const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, minlength: 5, maxlength: 20, required: true },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true },
);

UserSchema.pre('save', async function (next: any) {
  const user = this as UserDocument;

  if (!user.isModified('password')) return next();
  const workFactor = Number(process.env.saltWorkFactor);
  const salt = await bcrypt.genSalt(workFactor);
  const hash = await bcrypt.hashSync(user.password, salt);
  user.password = hash;
  next();
});

UserSchema.methods.comparePassword = async function (
  candidatePassword: string,
) {
  const user = this as UserDocument;
  return bcrypt
    .compare(candidatePassword, user.password)
    .catch((ex) => console.log(ex));
};

const User = mongoose.model<UserDocument>('User', UserSchema);
export default User;
