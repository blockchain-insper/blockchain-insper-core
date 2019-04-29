import { Controller, Get, BaseRequest, BaseResponse, HttpError, HttpCode, Post } from 'ts-framework';
import UserService from '../services/UserService';

@Controller('/users')
export default class UserController {

  /**
   * GET /
   * 
   * @description Using Blockahin Insper SDK UserService method showUser() to show an User.
   */

  @Get('/:id')
  static async show(req: BaseRequest, res: BaseResponse) {
    try {

      const user_client = await UserService.getInstance({})
      const user = await user_client.showUser(
        req.param("id")
      );
      
      return res.success(user)
      
    } catch (e) {
      console.error(e)
    };
  };

  /**
   * GET /
   * 
   * @description Using Blockahin Insper SDK UserService method showAllUser() to show all users on BI SDK database.
   */

  @Get('/')
  static async showAll(req: BaseRequest, res: BaseResponse) {
    try {

      const user_client = await UserService.getInstance({})
      const user = await user_client.showAllUser();
      return res.success(user)
      
    } catch (e) {
      console.error(e)
    };
  };


    /**
   * POST /
   * 
   * @description Using Blockahin Insper SDK UserService method storeUser() to create an User.
   */

  @Post('/')
  static async store(req: BaseRequest, res: BaseResponse) {
    try {

      // Get body statements.
      const { firstName, lastName, email, password } = req.body

      const user_client = await UserService.getInstance({})

      // Using UserService method createUser() to create an User.
      const user = await user_client.storeUser(
        firstName,
        lastName,
        email,
        password
      );

      const set_password = await user.setPassword(password)

      await user.save()
      
      return res.success(user)
      
    } catch (e) {
      console.error(e)
    };
  };
}
