import { Service, ServiceOptions } from 'ts-framework-common';
import { Information, InformationModel } from '../models/ipfs';
import { extract } from 'keyword-extractor';
import { IPFSConfig } from '../../config';

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

  public async organizeInfo(information: Information) {

    const extraction = await extract(information.information, {
      language: information.language,
      remove_digits: true,
      return_changed_case: true,
      remove_duplicates: true
    });

    const info = await InformationModel.create({
      information: information.information,
      language: information.language,
      type: information.type,
      keywords: extraction
    });
  };

  public async sendInfo(information: Information) {

    const bufferInfo = Buffer.from(JSON.stringify(information))

    IPFSConfig.add()

    
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