/**
 * Creating a div html element
 * @param {string[]} classLIST - List of css class
 * @param {string} text - Text for div
 * @returns {HTMLDivElement} div HTMLElement
 */
const SimpleDiv = (classLIST: string[], text?: string): HTMLDivElement => {
  const div = document.createElement("div") as HTMLDivElement;

  for (let index = 0; index < classLIST.length; index++) {
    div.classList.add(classLIST[index]);
  };
  if (text !== undefined) div.innerText = text;

  return div;
}

export default SimpleDiv;
