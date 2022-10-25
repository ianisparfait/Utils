/**
 * Remove element after a time
 * @param {Element} element - Element to remove
 * @param {number} timer - Time in seconds
 */
const RemoveElement = (element: Element, timer: number): void => {
  setTimeout(() => {
    element.remove();
  }, timer*1000);
};

export default RemoveElement;
