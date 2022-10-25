/**
 * Creating button html element
 * @param {string[]} classLIST - List of css class
 * @param {string} text - Text for button
 * @returns {HTMLButtonElement} div HTMLElement
 */
const Button = (classLIST: string[], text: string): HTMLButtonElement => {
  const btn = document.createElement("button") as HTMLButtonElement;

  for (let index = 0; index < classLIST.length; index++) {
    btn.classList.add(classLIST[index]);
  };
  btn.innerText = text;

  return btn
};

export default Button;
