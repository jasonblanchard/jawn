import HtmlUtils from 'utils/HtmlUtils';

describe('HtmlUtils', () => {
  describe('textToHtml', () => {
    it('outputs html line breas for newlines', () => {
      const output = HtmlUtils.textToHtml('first line\n\nsecond line\n\nthird line');
      expect(output).toEqual('first line<div><br></div>second line<div><br></div>third line');
    });
  });

  describe('htmlToText', () => {
    it('outputs text from HTML with lin breaks', () => {
      const output = HtmlUtils.htmlToText('dfadfasdf XXXX<div><br></div><div>asdf</div><div><br></div><div><br></div><div>xxx</div>');
      expect(output).toEqual('dfadfasdf XXXX\n\nasdf\n\n\n\nxxx');
    });
  });
});
