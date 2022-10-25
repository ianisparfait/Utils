/**
 * Go back to previous page
 * @param {string} className - Class name of element
 */
const BackHistory = (className: string): void => {
  const back = document.querySelector(`.${className}`) as HTMLElement;

  if (back) {
    back.addEventListener('click', () => {
      window.history.back();
    });
  }
};

export default BackHistory;
