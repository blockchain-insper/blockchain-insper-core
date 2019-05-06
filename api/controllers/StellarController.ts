import { Controller, Get, BaseRequest, BaseResponse, HttpError, HttpCode } from 'ts-framework';
import StellarService from '../services/StellarService';

@Controller('/stellar')
export default class StellarController {

  /**
   * GET /stellar/
   * 
   * @description A sample controller.
   */
  @Get('/')
  static async createAccount(req: BaseRequest, res: BaseResponse) {
    try {
      const create = await StellarService.createAccount();
      return res.success(create)
    } catch (error) {
      console.error(error)
    }
    
  }
}
