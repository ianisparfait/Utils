/**
 * Create a wrapper element for input file
 * @param {string} classWrapper - Class for wrapper element
 * @param {Element} inputTarget - Input file
 * @param {string} text - Text to display in wrapper
 */
const WrapperInputFile = (classWrapper: string, inputTarget: Element, text: string): void => {
  const div = document.createElement("div");
  div.classList.add(classWrapper);

  const parent = inputTarget.parentElement;

  const span = document.createElement("span");
  span.innerText = text;

  parent!.append(div);
  div.append(inputTarget)
  div.prepend(span);
};

export default WrapperInputFile;
