import Config from './index';
import {expect} from 'chai';
import * as path from 'path';
import {tmpdir} from 'os';

describe('src/models/index', () => {
  it('set', async () => {
    const config = new Config({rcPath: '.global-config'});
    const data = {aa: 123};
    await config.set(data);
    expect(await config.get()).to.be.eql(data);
  });

  it('setSync', () => {
    const config = new Config({rcPath: '.global-config'});
    const data = {aa: 'sync'};
    config.setSync(data);
    expect(config.getSync()).to.be.eql(data);
  });

  it('set: abs path', () => {
    const abs = path.resolve(tmpdir(), '.global-config');
    const config = new Config({rcPath: abs});
    expect((config as any).rcPath).to.be.equal(abs);
    const data = {aa: 'sync'};
    config.setSync(data);
    expect(config.getSync()).to.be.eql(data);
  });
});
