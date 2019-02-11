import { UserModel } from "../models";

/**
 * Class UserService
 *
 * @description Blockchain Insper SDK UserService method store to create an User.
 */

export default class UserService {
  public static async storeUser(firstName: string,
    lastName: string, email: string, password: string): Promise<UserModel> {
    try {
      const user = await UserModel.create({
        firstName,
        lastName,
        email,
        password
      }).save();

      return user;
    } catch (e) {
      console.error(e)
    }
  }

  public static async showUser(id: string): Promise<UserModel> {
    try {
      const user = await UserModel.findOne(id);
      return user;
    } catch (e) {
      console.error(e)
    }
  }
};