export default class FindOrdersOutput {
    constructor(readonly orders: { code: string; cpf: string; issueDate: number }[]) {}
}
