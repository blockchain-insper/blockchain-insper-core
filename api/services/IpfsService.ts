import { Service, ServiceOptions } from 'ts-framework-common';
import { Information, InformationModel, FileModel } from '../models/ipfs';
import { extract } from 'keyword-extractor';
// import { IPFSConfig } from '../../config';
import { getRepository } from 'typeorm';

import * as path from 'path';
import * as fs from 'fs'

// TODO move to config
const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

export interface IpfsServiceOptions extends ServiceOptions {
}

export default class IpfsService extends Service {
  protected static instance: IpfsService;
  public options: IpfsServiceOptions;

  constructor(options: IpfsServiceOptions) {
    super(options);
  }

  public static getInstance(options: IpfsServiceOptions) {
    if (!this.instance) {
      this.instance = new IpfsService({});
    }
    return this.instance;
  }

  public static initialize(options: IpfsServiceOptions) {
    const service = new IpfsService(options);

    if(!this.instance) {
      this.instance = service;
    }

    return service;
  }

  public static async organizeSendInfo(information: Information) {

    try {

      const extraction = await extract(information.information, {
        language: information.language,
        remove_digits: true,
        return_changed_case: true,
        remove_duplicates: true
      });
  
      const info = await InformationModel.insert({
        information: information.information,
        language: information.language,
        type: information.type,
        keywords: extraction
      });

      const send = String(await this.sendInfo(info.identifiers[0].id));

      const info_id = await this.showInfo(info.identifiers[0].id);

      info_id.hash = send;

      await info_id.save();
      
      return send;

    } catch (e) {
      console.error(e)
    }
  };

  public static async showInfo(infoID: string) {
    try {
      const infoRepository = getRepository(InformationModel)
      const info = await InformationModel.findOne(infoID)
      return info;
    } catch (error) {
      console.error(error)
    }
  }

  public static async showAllInfo() {
    try {
      const infoRepository = getRepository(InformationModel)
      const info = await infoRepository.find()
      return info;
    } catch (error) {
      console.error(error)
    }
  }

  public static async sendInfo(infoID: string) {

    try {
      const info = JSON.stringify(await this.showInfo(infoID))

      const bufferInfo = Buffer.from(String(info));

      return new Promise(async (resolve,reject) => {

        await ipfs.add(bufferInfo, (err, files) => {
            if (err){
                reject(err)
            } 
            else {
                resolve(files[0].hash);
            };
        });
      });
      
    } catch (error) {
      console.error(error)
    }
  };

  public static async organizeSendFile(filename: string,  filepath: string) {
    try {

      if (!fs.existsSync(filepath)){
        console.log("No directory called ", filepath);
        return;
    }

    let file = fs.readFileSync(filepath + filename);

    return new Promise(async (resolve,reject) => {

      await ipfs.add(file, (err, files) => {
          if (err){
              reject(err)
          } 
          else {
              resolve(files[0].hash);
          };
      });
    });
      
    } catch (error) {
      console.error(error)
    }
  }

  public static async showAllFile() {
    try {
      const fileRepository = getRepository(FileModel)
      const file = await fileRepository.find()
      return file;
    } catch (error) {
      console.error(error)
    }
  }
  
  async onMount(): Promise<void> {
    this.logger.debug('Mounting IpfsService instance');
  }

  async onInit(): Promise<void> {
    this.logger.debug('Initializing IpfsService instance');
  }

  async onReady(): Promise<void> {
    this.logger.info('IpfsService initialized successfully');
  }

  async onUnmount(): Promise<void> {
    this.logger.debug('Unmounting IpfsService instance');
  }
}