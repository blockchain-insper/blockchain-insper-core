import { Controller, Get, BaseRequest, BaseResponse, Post } from "ts-framework";
import IpfsService from "../services/IpfsService";
import { FileModel } from "../models/ipfs";

@Controller('/ipfs')
export default class IPFSController {

  /**
   * GET /
   * 
   * @description Using Blockahin Insper SDK UserService method showInfo() to show an information
   * from database.
   */

   @Get('/')
   static async showAllInfo(req: BaseRequest, res: BaseResponse) {
       try {
           const infos = await IpfsService.showAllInfo()
           return res.success(infos)
       } catch (error) {
           console.error(error)
       }
   }

   @Get('/files')
   static async showAllFile(req: BaseRequest, res: BaseResponse) {
       try {
           const files = await IpfsService.showAllFile();
           return res.success(files)
       } catch (error) {
           console.error(error)
       }
   }

   @Post('/')
   static async createInfo(req: BaseRequest, res: BaseResponse) {
    // Using IpfsService method organizeInfo() to create an information on database.

    try {
        const send = await IpfsService.organizeSendInfo(req.body)
        return res.success(send)
    } catch (error) {
        console.error(error)
    }
   }

   @Post('/file')
   static async createFile(req: BaseRequest, res: BaseResponse) {
       try {
           const send =  String(await IpfsService.organizeSendFile(req.body.filename,req.body.filepath));
           const file = await FileModel.insert({
               filename: req.body.filename,
               type: req.body.type,
               hash: send
           });
           return res.success(send)
       } catch (error) {
           console.error(error)
       }
   }
}