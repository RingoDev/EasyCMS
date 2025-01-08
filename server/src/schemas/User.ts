import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcrypt";
import { Roles } from "../types/roles";

export interface User {
  email: string;
  password: string;
  role: Roles;
}

export interface IUser extends Document, User {
  authenticate: (candidate: string) => Promise<boolean>;
}

const UserSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: Number, required: true },
});

// I don't want to actually handle authentication but using a third party service for this project seems wrong

// before a User is saved to the database, hash the password with a salt
UserSchema.pre<IUser>("save", function (this: IUser, next) {
  if (!this.isModified("password")) return next();

  // generate a salt
  bcrypt
    .genSalt(10)
    .then((salt) => {
      // hash the password along with our new salt
      bcrypt
        .hash(this.password, salt)
        .then((hash) => {
          // override the cleartext password with the hashed one
          this.password = hash;
          next();
        })
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
});

UserSchema.methods.authenticate = function (pw): Promise<boolean> {
  return bcrypt.compare(pw, this.password);
};

export default mongoose.model<IUser>("User", UserSchema);
