import { WrapperInputFile } from "../CreateElements";

/**
 * checks if there are any files input in the page
 * @returns {boolean} - Return true if any file input in the page
 */
const isInputFile = (): boolean => {
  const inputs = document.querySelectorAll("input[type='file']")  as NodeListOf<HTMLInputElement>;

  if (inputs) return true;
  else return false;
};

/**
 * Create a wrapper element for input file
 * @param {string} classToGiven - className for wrapper element
 */
const improveInputFile = (classToGiven: string): void => {
  const inputs = document.querySelectorAll("input[type='file']") as NodeListOf<HTMLInputElement>;

  if (inputs) {
    inputs.forEach((input: Element) => {
      WrapperInputFile(classToGiven, input, "Choose a file");
      input.addEventListener('change', (e: Event) => {
        const target = e.target as HTMLInputElement;
        const fileName = target.files![0].name;
        const span = target.parentElement!.querySelector("span");
        span!.textContent = fileName;
      });
    });
  }
};

export { isInputFile, improveInputFile };
