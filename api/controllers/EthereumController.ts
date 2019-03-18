import { Controller, Get, BaseRequest, BaseResponse, HttpError, HttpCode, Post } from 'ts-framework';
import EthService from '../services/EthereumService';

@Controller('/eth')
export default class EthereumController {

  /**
   * Post /eth/
   * 
   * @description Send raw transaction with contract creation to Ethereum.
   */

  @Post('/')
  static async deploy(req: BaseRequest, res: BaseResponse) {
    try {
      const deploy = await EthService.sendContractCreation(req.body.address,req.body.private)
      return res.success(deploy)
    } catch (error) {
      console.error(error)
    }
  };
}
