import { Model, ObjectId } from "mongoose";
import { ACCESS_ROLE } from "./user.constant";

export interface TUser {
  name: string;
  email: string;
  password: string;
  role: "admin" | "user";
  isBlocked: boolean;
}
interface TMongoUser extends TUser {
  _id: ObjectId | string;
}

export interface TUserPartial {
  name?: string;
  email?: string;
  password?: string;
  role?: "admin" | "user";
  isBlocked?: boolean;
}

export interface UserModel extends Model<TUser> {
  //instance methods for checking if the user exist
  isUserExistsByEmail(email: string): Promise<TMongoUser>;

  //instance methods for checking if passwords are matched
  isPasswordMatched(plainTextPassword: string, hashedPassword: string): Promise<boolean>;
}

export type TAccessRole = keyof typeof ACCESS_ROLE;
