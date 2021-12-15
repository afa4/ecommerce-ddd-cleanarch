function removeSpecialChars(str) {
  return str
    .replace('.', '')
    .replace('.', '')
    .replace('-', '')
    .replace(' ', '');
}

function isElevenDigitsString(str) {
  return str.match(/[0-9]/g).length === 11;
}

function getVerifyerFromSum(digitsSum) {
  let moduleByEleven = digitsSum % 11;
  return moduleByEleven < 2 ? 0 : 11 - moduleByEleven;
}

function calculateFirstVerifyer(str) {
  let digit;
  let sumOfFirstNineDigits = 0;
  for (let i = 0; i < 9; i++) {
    digit = parseInt(str.substring(i, i + 1));
    sumOfFirstNineDigits += (10 - i) * digit;
  }

  return getVerifyerFromSum(sumOfFirstNineDigits);
}

function calculateSecondVerifyer(str) {
  let digit;
  let sumOfFirstTenDigits = 0;
  for (let i = 0; i < 10; i++) {
    digit = parseInt(str.substring(i, i + 1));
    sumOfFirstTenDigits += (11 - i) * digit;
  }

  return getVerifyerFromSum(sumOfFirstTenDigits);
}

function isBlocked(cpf) {
  let [firstDigit] = cpf; // destruction
  return [...cpf].every((digit) => digit === firstDigit);
}

function validate(rawCpf) {
  if (!rawCpf || typeof rawCpf !== 'string') return false;
  const cpf = removeSpecialChars(rawCpf);
  if (!isElevenDigitsString(cpf)) return false;
  if(isBlocked(cpf)) return false;

  const firstNineDigits = cpf.substring(0, 9);
  const firstVerifyer = calculateFirstVerifyer(firstNineDigits);
  const expectedFirstTenDigits = firstNineDigits.concat(firstVerifyer);
  const secondVerifyer = calculateSecondVerifyer(expectedFirstTenDigits);
  const expectedVerifyers = [firstVerifyer, secondVerifyer].join('');
  const actualVerifyers = cpf.substring(cpf.length - 2, cpf.length);

  return actualVerifyers === expectedVerifyers;
}

module.exports = {
  validate,
};
