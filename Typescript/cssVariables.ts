/**
 * Check if given element is a css variable
 * @param {string} name - Name of css variable
 * @returns {string} - Return value of css variable
 */
const GetCssVariables = (name: string): string => {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
};

export default GetCssVariables;
