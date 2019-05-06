import { BaseError, Service, ServiceOptions } from 'ts-framework-common';
import * as StellarSdk from 'stellar-sdk';
import "isomorphic-fetch";

export interface StellarServiceOptions extends ServiceOptions {
}

export default class StellarService extends Service {
  protected static instance: StellarService;
  public options: StellarServiceOptions;

  constructor(options: StellarServiceOptions) {
    super(options);
  }

  public static getInstance(options: StellarServiceOptions) {
    if (!this.instance) {
      throw new BaseError("Stellar service is invalid or hasn't been initialized yet");
    }
    return this.instance;
  }

  public static initialize(options: StellarServiceOptions) {
    const service = new StellarService(options);

    if(!this.instance) {
      this.instance = service;
    }

    return service;
  }

  public static async createAccount(){
    try {
      const pair = StellarSdk.Keypair.random();
      console.log(pair.secret());
      console.log(pair.publicKey());
      try {
        const response = await fetch(
          `https://friendbot.stellar.org?addr=${encodeURIComponent(pair.publicKey())}`
        );
        const responseJSON = await response.json();
        console.log("SUCCESS! You have a new account :)\n", responseJSON);
        return responseJSON;
      } catch (e) {
        console.error("ERROR!", e);
      }

    } catch (error) {
      console.error(error)
    }
  }

  public static async createToken() {
    try {
      
    } catch (error) {
      
    }
  }
  
  async onMount(): Promise<void> {
    this.logger.debug('Mounting StellarService instance');
  }

  async onInit(): Promise<void> {
    this.logger.debug('Initializing StellarService instance');
  }

  async onReady(): Promise<void> {
    this.logger.info('StellarService initialized successfully');
  }

  async onUnmount(): Promise<void> {
    this.logger.debug('Unmounting StellarService instance');
  }
}