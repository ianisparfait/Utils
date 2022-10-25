/**
 * Return first letters for each word given (ex: "John Doe" => "JD" or "John, Doe" => "JD")
 * @param {string} str - String to get first letters
 * @returns {string} - Return first letters
 */
const GetFirstLetters = (str: string): string => {
  const firstLetters = str
    .split(' ')
    .map(word => word[0])
    .join('');

  return firstLetters;
};

export default GetFirstLetters;
