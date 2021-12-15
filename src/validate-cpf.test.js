const cpfValidator = require("./validate-cpf-after");

test('should return false when input is null', () => {
  const result = cpfValidator.validate(null);
  expect(result).toBe(false);
});

test('should return false when input is undefined', () => {
  const result = cpfValidator.validate(undefined);
  expect(result).toBe(false);
});

test('should return false when input type is not string', () => {
  const result = cpfValidator.validate(123);
  expect(result).toBe(false);
});

test('should return false if input length is less than 11', () => {
  const result = cpfValidator.validate("935.411.347-8");
  expect(result).toBe(false);
});

test('should return false if input length is bigger than 14', () => {
  const result = cpfValidator.validate("935.411.347-800");
  expect(result).toBe(false);
});

test('should return false if input has illegal chars', () => {
  const result = cpfValidator.validate("aaa.411.347-8a");
  expect(result).toBe(false);
});

test('should return false if all input digits are equal', () => {
  const result = cpfValidator.validate("111.111.111-11");
  expect(result).toBe(false);
});

test.each([
  '935.411.347-80',
  '111.444.777-35',
  '801.497.840-40',
  '263.850.990-67'
])('should return true if input is valid cpf with special chars', (cpf) => {
  const result = cpfValidator.validate(cpf);
  expect(result).toBe(true);
});

test.each([
  '93541134780',
  '11144477735',
  '80149784040',
  '26385099067'
])('should return true if input is valid cpf', (cpf) => {
  const result = cpfValidator.validate(cpf);
  expect(result).toBe(true);
});

