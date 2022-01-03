import UseCase from "../UseCase";
import FindOrderByCodeOutput from "./FindOrderByCodeOutput";
import OrderRepository from "../../../domain/repository/OrderRepository";

export default class FindOrderByCode implements UseCase<string, FindOrderByCodeOutput> {

    constructor(private readonly orderRepository: OrderRepository) {
    }

    async execute(codeInput: string): Promise<FindOrderByCodeOutput> {
        const order = await this.orderRepository.findByCode(codeInput);
        if(!order) throw new Error('Order not found');
        return Promise.resolve(new FindOrderByCodeOutput(order.getCode(), order.getTotal()));
    }
}
