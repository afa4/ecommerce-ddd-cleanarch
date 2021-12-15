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

function validate(cpf) {
  if (cpf == null || typeof cpf !== 'string') {
    return false;
  }

  cpf = removeSpecialChars(cpf);

  if (!isElevenDigitsString(cpf)) {
    return false;
  }

  let firstNineDigits = cpf.substring(0, 9);
  let firstVerifyer = calculateFirstVerifyer(firstNineDigits);

  let expectedFirstTenDigits = firstNineDigits.concat(firstVerifyer);
  let secondVerifyer = calculateSecondVerifyer(expectedFirstTenDigits);

  let expectedVerifyers = [firstVerifyer, secondVerifyer].join('');
  let actualVerifyers = cpf.substring(cpf.length - 2, cpf.length);

  return actualVerifyers == expectedVerifyers;
}

module.exports = {
  validate,
};
