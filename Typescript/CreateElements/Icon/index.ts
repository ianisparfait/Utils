/**
 * Creating icon html element
 * @param {string[]} classLIST - List of css class
 * @returns {HTMLElement} icon HTMLElement
 */
const Icon = (classLIST: string[]): HTMLElement => {
  const icon = document.createElement("i") as HTMLElement;

  for (let index = 0; index < classLIST.length; index++) {
    icon.classList.add(classLIST[index]);
  }

  return icon;
};

export default Icon;
