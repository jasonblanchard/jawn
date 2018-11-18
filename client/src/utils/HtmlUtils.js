export function textToHtml(text) {
  return text.replace(/\n\n/g, '<div><br></div>');
}

export function htmlToText(html) {
  return html.replace(/<div>/g, '').replace(/<\/div>/g, '').replace(/<br>/g, '\n\n');
}

export default {
  htmlToText,
  textToHtml,
};
