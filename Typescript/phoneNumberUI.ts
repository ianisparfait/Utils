/**
 * Improve the UI of the phone number field.
 * @param {string} text - Phone number text to improve
 * @returns {string} - Formated phone number
 */
const PhoneNumberUI = (text: string): string => {
  let phoneNumber: string = "";
  if (text.includes('+')) phoneNumber = text.replace(/(\d{2})(\d{1})(\d{2})(\d{2})(\d{2})(\d{2})/, "$1 $2 $3 $4 $5 $6");
  else phoneNumber = text.replace(/(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/, "$1 $2 $3 $4 $5");

  return phoneNumber;
};

export default PhoneNumberUI;
