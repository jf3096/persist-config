import Config, {IConfig} from './models/index';

export default function getConfig<T>(rcPath: string): IConfig<T> {
  return new Config({rcPath});
}
