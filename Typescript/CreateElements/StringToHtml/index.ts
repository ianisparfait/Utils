/**
 * Creating html nodes from string
 * @param {string} html - Html string
 * @returns {string} nodes - Html nodes
 */
const HTMLFormString = (html: string): ChildNode => {
  const template = document.createElement("template");
  html = html.trim();
  template.innerHTML = html;
  return template.content.firstChild!;
};

export default HTMLFormString;
