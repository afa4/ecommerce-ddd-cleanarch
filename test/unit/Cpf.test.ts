import Cpf from '../../src/domain/entity/Cpf';

test('should throw invalid cpf error if input length is less than 11', () => {
  expect(() => new Cpf('935.411.347-8')).toThrow(new Error('Invalid cpf'));
});

test('should throw invalid cpf error if input length is bigger than 14', () => {
  expect(() => new Cpf('935.411.347-800')).toThrow(new Error('Invalid cpf'));

});

test('should throw invalid cpf error if input has illegal chars', () => {
  expect(() => new Cpf('aaa.411.347-8a')).toThrow(new Error('Invalid cpf'));
});

test('should throw invalid cpf error if all input digits are equal', () => {
  expect(() => new Cpf('111.111.111-11')).toThrow(new Error('Invalid cpf'));
});

test.each([
  '935.411.347-80',
  '111.444.777-35',
  '801.497.840-40',
  '263.850.990-67',
])('should create cpf if input is valid cpf with special chars', (rawCpf) => {
  expect(new Cpf(rawCpf)).toBeTruthy();
});

test.each([
  '93541134780',
  '11144477735',
  '80149784040',
  '26385099067'
])('should create cpf if input is valid cpf', (rawCpf) => {
  expect(new Cpf(rawCpf)).toBeTruthy();
});
