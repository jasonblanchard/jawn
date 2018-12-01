import 'react-testing-library/cleanup-after-each';
import { JSDOM } from 'jsdom';

const jsdom = new JSDOM();

const { window } = jsdom;

global.window = window;
global.document = window.document;
