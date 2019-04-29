import { Controller, Get, BaseRequest, BaseResponse, HttpError, HttpCode, Post } from 'ts-framework';
import EthService from '../services/EthereumService';

@Controller('/eth')
export default class EthereumController {

  @Get('/contracts')
  static async showAll(req: BaseRequest, res: BaseResponse) {
    try {
      const show = await EthService.showContracts();
      return res.success(show)
    } catch (error) {
      console.error(error)
    }
  }

  @Get('/hash-to-eth')
  static async specificInfo(req:BaseRequest, res: BaseResponse) {
      try {
          const info = await EthService.sendHashToEth(req.body.information, req.body.type, req.body.private, req.body.address);
          return res.success(info)
      } catch (error) {
          console.error(error)
      }
  }

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
