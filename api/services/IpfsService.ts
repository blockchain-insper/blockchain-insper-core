import { Service, ServiceOptions } from 'ts-framework-common';
import { Information, InformationModel } from '../models/ipfs';
import { extract } from 'keyword-extractor';
// import { IPFSConfig } from '../../config';
import { getRepository } from 'typeorm';
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

  public static async organizeInfo(information: Information) {

    try {

      const extraction = await extract(information.information, {
        language: information.language,
        remove_digits: true,
        return_changed_case: true,
        remove_duplicates: true
      });
  
      const infoRepository = getRepository(InformationModel)
  
      const info = await infoRepository.insert({
        information: information.information,
        language: information.language,
        type: information.type,
        keywords: extraction
      });

      return info;

    } catch (e) {
      console.error(e)
    }
  };

  public static async showInfo(infoID: string) {
    try {
      const infoRepository = getRepository(InformationModel)
      const info = await infoRepository.findOne(infoID)
      return info;
    } catch (error) {
      console.error(error)
    }
  }

  public static async showAll() {
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