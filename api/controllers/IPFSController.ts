import { Controller, Get, BaseRequest, BaseResponse, Post } from "ts-framework";
import IpfsService from "../services/IpfsService";

@Controller('/ipfs')
export default class IPFSController {

  /**
   * GET /
   * 
   * @description Using Blockahin Insper SDK UserService method showInfo() to show an information
   * from database.
   */

   @Get('/:id')
   static async show(req: BaseRequest, res: BaseResponse) {
    // Using IpfsService method showInfo() to show an information.

    try {
        const info = await IpfsService.showInfo(req.param('id'))
        return res.success(info)
    } catch (error) {
        console.error(error)
    }
   }
   @Get('/infos')
   static async showAll(req: BaseRequest, res: BaseResponse) {
    // Using IpfsService method showAll() to show all information on database.

    try {
        const infos = await IpfsService.showAll()
        return res.success(infos)
           
    } catch (error) {
        console.error(error)
    }
   }

   @Post('/')
   static async createInfo(req: BaseRequest, res: BaseResponse) {
    // Using IpfsService method organizeInfo() to create an information on database.

    try {
        const info = await IpfsService.organizeInfo(req.body)
        return res.success(info)
    } catch (error) {
        console.error(error)
    }
   }

   @Post('/:id/send-info')
   static async sendInfo(req: BaseRequest, res: BaseResponse) {
    // Using IpfsService method sendInfo() to send an information from databse to IPFS.
    try {
        const info = await IpfsService.sendInfo(req.param('id'))
        return res.success(info)
    } catch (error) {
        console.error(error)
    }
   }
}