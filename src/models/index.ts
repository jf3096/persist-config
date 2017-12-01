import * as path from 'path';
import IO from '../utils/io/index';
import * as deasyncPromise from 'deasync-promise';
import homeDirectory = require('os-homedir');

export interface IConfig<T> {
  get(): Promise<T>;

  set(config: T): Promise<void>;

  getSync(): T;

  setSync(config: T): T;
}

export default class Config<T> implements IConfig<T> {
  private rc: T;
  private exist: boolean;
  private rcPath: string;

  public constructor({rcPath}: { rcPath: string }) {
    this.rcPath = Config.getHomeRCAbs(rcPath);
    this.exist = false;
  }

  private static getHomeRCAbs(filename: string): string {
    if (!path.isAbsolute(filename)) {
      return path.resolve(homeDirectory(), filename);
    }
    return filename;
  }

  private async isExist(): Promise<boolean> {
    const {rcPath} = this;
    if (!this.exist) {
      this.exist = await IO.exist(rcPath);
    }
    return this.exist;
  }

  private async readRC(): Promise<T> {
    const {rcPath} = this;
    const isExist = this.isExist();
    if (isExist) {
      return JSON.parse(await IO.read(rcPath));
    } else {
      return {} as T;
    }
  }

  private static stringify<T>(rc: T, space = 4): string {
    return JSON.stringify(rc, null, space);
  }

  public async get(): Promise<T> {
    return this.readRC();
  }

  public async set(rc: T): Promise<void> {
    const rcString = Config.stringify(rc || this.rc);
    return IO.write(this.rcPath, rcString);
  }

  public getSync(): T {
    return deasyncPromise(this.get());
  }

  public setSync(rc: T): T {
    return deasyncPromise(this.set(rc));
  }
}
