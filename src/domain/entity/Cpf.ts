const FIRST_DIGIT_FACTOR = 10;
const SECOND_DIGIT_FACTOR = 11;

export default class Cpf {
  value: string;

  constructor(value: string) {
    if (!this.isValid(value)) throw new Error("Invalid cpf");
    this.value = value;
  }

  private isValid(rawCpf: string): boolean {
    const cpf = this.clean(rawCpf);
    if (!this.isElevenDigitsString(cpf)) return false;
    if (this.isBlocked(cpf)) return false;

    const firstNineDigits = cpf.substring(0, 9);
    const firstVerifier = this.calculateVerifier(
      firstNineDigits,
      FIRST_DIGIT_FACTOR
    );
    const expectedFirstTenDigits = `${firstNineDigits}${firstVerifier}`;
    const secondVerifier = this.calculateVerifier(
      expectedFirstTenDigits,
      SECOND_DIGIT_FACTOR
    );
    const expectedVerifiers = `${firstVerifier}${secondVerifier}`;
    const actualVerifiers = cpf.slice(9);

    return actualVerifiers === expectedVerifiers;
  }

  private clean(cpf: string): string {
    return cpf.replace(/[\.\-]*/g, "");
  }

  private isElevenDigitsString(cpf: string): boolean {
    return cpf.match(/[0-9]/g)?.length === 11 ?? false;
  }

  private isBlocked(cpf: string): boolean {
    let [firstDigit] = cpf;
    return [...cpf].every((digit) => digit === firstDigit);
  }

  private calculateVerifier(cpfDigits: string, factor: number): number {
    let digitsSum = 0;
    for (let i = 0; i < cpfDigits.length; i++) {
      const digit = parseInt(cpfDigits.substring(i, i + 1));
      if (factor > 1) {
        digitsSum += factor-- * digit;
      }
    }

    let moduleByEleven = digitsSum % 11;
    return (moduleByEleven < 2) ? 0 : 11 - moduleByEleven;
  }
}
