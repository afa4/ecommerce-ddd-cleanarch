function removeSpecialChars(str) {
  return str
    .replace(".", "")
    .replace(".", "")
    .replace("-", "")
    .replace(" ", "");
}

function isElevenDigitsString(str) {
  return str.match(/[0-9]/g).length === 11;
}

function validate(str) {
  if (str == null || typeof str !== "string") {
    return false;
  }

  str = removeSpecialChars(str);

  if (!isElevenDigitsString(str)) {
    return false;
  }

  let d1, d2;
  let dg1, dg2, rest;
  let digito;
  let nDigResult;
  d1 = d2 = 0;
  dg1 = dg2 = rest = 0;

  for (let nCount = 1; nCount < str.length - 1; nCount++) {
    digito = parseInt(str.substring(nCount - 1, nCount));
    d1 = d1 + (11 - nCount) * digito;

    d2 = d2 + (12 - nCount) * digito;
  }

  rest = d1 % 11;

  dg1 = rest < 2 ? (dg1 = 0) : 11 - rest;
  d2 += 2 * dg1;
  rest = d2 % 11;
  if (rest < 2) dg2 = 0;
  else dg2 = 11 - rest;

  let nDigVerific = str.substring(str.length - 2, str.length);
  nDigResult = "" + dg1 + "" + dg2;
  return nDigVerific == nDigResult;
}

module.exports = {
  validate,
};
