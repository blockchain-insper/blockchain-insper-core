import { BaseError, Service, ServiceOptions } from 'ts-framework-common';
import { UserModel } from '../models';
import { getRepository } from 'typeorm';

export interface UserServiceOptions extends ServiceOptions {
}

export default class UserService extends Service {
  protected static instance: UserService;
  public options: UserServiceOptions;

  constructor(options: UserServiceOptions) {
    super(options);
  }

  public static getInstance(options: UserServiceOptions) {
    if (!this.instance) {
      this.instance = new UserService({});
    }
    return this.instance;
  }

  public static initialize(options: UserServiceOptions) {
    const service = new UserService(options);

    if(!this.instance) {
      this.instance = service;
    }

    return service;
  }

  public async showUser(id: string): Promise<UserModel> {
    try {
      const repository = getRepository(UserModel);
      const user = await repository.findOne(id);
      return user;
    } catch (error) {
      console.error(error)
    }
  }

  public async storeUser(firstName: string,
    lastName: string, 
    email: string,
    password: string): Promise<UserModel> {
    try {
      const repository = getRepository(UserModel);
      const user = await repository.insert({
        firstName,
        lastName,
        email
      });

      const userdb = await this.showUser(user.identifiers[0].id)

      return userdb;
    } catch (error) {
      console.error(error)
    }
  }

  public async showAllUser(): Promise<UserModel[]> {
    try {
      const repository = getRepository(UserModel);
      const users = await repository.find()
      return users
    } catch (error) {
      console.error(error)
    }
  }
  
  
  async onMount(): Promise<void> {
    this.logger.debug('Mounting UserService instance');
  }

  async onInit(): Promise<void> {
    this.logger.debug('Initializing UserService instance');
  }

  async onReady(): Promise<void> {
    this.logger.info('UserService initialized successfully');
  }

  async onUnmount(): Promise<void> {
    this.logger.debug('Unmounting UserService instance');
  }
}