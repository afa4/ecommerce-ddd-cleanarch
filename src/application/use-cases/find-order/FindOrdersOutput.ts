export default class FindOrdersOutput {
    constructor(readonly orders: { code: string; total: number }[]) {}
}
