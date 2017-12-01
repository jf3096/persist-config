import * as fs from 'fs';

export default class IO {
  public static exist(filename: string): Promise<boolean> {
    return new Promise((resolve) => fs.exists(filename, (exists) => resolve(exists)));
  }

  public static read(filename: string): Promise<string> {
    return new Promise((resolve, reject) => {
      fs.readFile(filename, (err: Error, data: Buffer) => err ? reject(err) : resolve(data.toString()));
    });
  }

  public static write(filename: string, content: string): Promise<void> {
    return new Promise((resolve, reject) => {
      fs.writeFile(filename, content, (err) => {
        err ? reject(err) : resolve();
      });
    });
  }
}
