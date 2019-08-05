import 'react-testing-library/cleanup-after-each';
import { JSDOM } from 'jsdom';

const jsdom = new JSDOM();

const { window } = jsdom;

global.window = window;
global.document = window.document;
global.navigator = {
  appName: 'Netscape',
  userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.140 Safari/537.36', // Chrome
};
