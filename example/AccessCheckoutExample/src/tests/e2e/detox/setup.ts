import {device} from 'detox';

beforeAll(async () => {
  await device.launchApp({newInstance: true, delete: true});
});
