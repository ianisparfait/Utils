import RemoveElement from "../removeElements";
import GetCssVariables from "./../../cssVariables";

/**
 * Create snackbar element
 * @param {string} text - Text for snackbar
 * @param {string} type - sucess, error, warning or other
 */
const Snackbar = (text: string, type: string): void => {
  const bgColor = type === "success" ? GetCssVariables("--okColor") :  type === "warning" ? "orange" : type === "error" ? GetCssVariables("--dangerColor") : GetCssVariables("--greyColor");
  const textColor = type === "success" ? "white" :  type === "warning" ? "white" : type === "error" ? "white" : "black";

  const container = document.createElement("div");
  container.classList.add("snackbar");
  container.style.background = bgColor;

  const span = document.createElement("span");
  span.style.color = textColor
  span.textContent = text;

  container.append(span);
  document.body.append(container);

  RemoveElement(container, 3);
};

export default Snackbar;
