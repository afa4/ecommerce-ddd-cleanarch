export default class OrderCode {
    readonly value: string;

    constructor(sequence: number, createdAt: Date) {
        let sequenceString = '' + sequence;
        while (sequenceString.length < 8) {
            sequenceString = '0' + sequenceString;
        }
        this.value = createdAt.getUTCFullYear() + sequenceString;
    }
}
