const FIRST_DIGIT_FACTOR = 10;
const SECOND_DIGIT_FACTOR = 11;

function validate(rawCpf) {
  if (!rawCpf || typeof rawCpf !== 'string') return false;
  const cpf = clean(rawCpf);
  if (!isElevenDigitsString(cpf)) return false;
  if(isBlocked(cpf)) return false;
  
  const firstNineDigits = cpf.substring(0, 9);
  const firstVerifyer = calculateVerifyer(firstNineDigits, FIRST_DIGIT_FACTOR);
  const expectedFirstTenDigits = firstNineDigits.concat(firstVerifyer);
  const secondVerifyer = calculateVerifyer(expectedFirstTenDigits, SECOND_DIGIT_FACTOR);
  const expectedVerifyers = [firstVerifyer, secondVerifyer].join('');
  const actualVerifyers = cpf.substring(cpf.length - 2, cpf.length);
  
  return actualVerifyers === expectedVerifyers;
}

function clean(str) {
  return str.replace(/[\.\-]*/g, '');
}

function isElevenDigitsString(str) {
  return str.match(/[0-9]/g).length === 11;
}

function isBlocked(cpf) {
  let [firstDigit] = cpf; // destruction
  return [...cpf].every((digit) => digit === firstDigit);
}

function calculateVerifyer(cpfDigits, factor) {
  let digit;
  let digitsSum = 0;
  for (let i = 0; i < cpfDigits.length; i++) {
    digit = parseInt(cpfDigits.substring(i, i + 1));
    if(factor > 1) {
      digitsSum += (factor--) * digit;
    }
  }

  let moduleByEleven = digitsSum % 11;
  return (moduleByEleven < 2) ? 0 : 11 - moduleByEleven;
}

module.exports = {
  validate,
};
