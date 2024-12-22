import { TUser, TUserPartial } from "./user.interface";
import { User } from "./user.model";

const createUserIntoDB = async (user: TUser) => {
  const result = await User.create(user);
  return result;
};

const updateUserIntoDB = async (id: string, userData: TUserPartial) => {
  const result = await User.findByIdAndUpdate({ _id: id }, userData);
  return result;
};

export const UserServices = {
  createUserIntoDB,
  updateUserIntoDB,
};
