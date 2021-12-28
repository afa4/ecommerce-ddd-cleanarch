import ItemRepository from '../../../domain/repository/ItemRepository';
import UseCase from '../UseCase';
import SimulateFreightInput from './SimulateFreightInput';
import SimulateFreightOutput from './SimulateFreightOutput';
import Order from '../../../domain/Order'

const FAKE_VALID_CPF = '935.411.347-80';

export default class SimulateFreight implements UseCase<SimulateFreightInput, SimulateFreightOutput> {

  constructor(private readonly itemRepository: ItemRepository) {}

  async execute(input: SimulateFreightInput): Promise<SimulateFreightOutput>
  {
    const simulatedOrder = new Order(FAKE_VALID_CPF);
    const itemIds = input.orderItems.map((orderItem) => orderItem.itemId);
    const itemsMappedById = await this.itemRepository.getItemsMappedByIdWhereIdIn(itemIds);
    input.orderItems.forEach((orderItem) => {
      const item = itemsMappedById[orderItem.itemId];
      simulatedOrder.addItem(item, orderItem.quantity);
    });

    return Promise.resolve(new SimulateFreightOutput(simulatedOrder.getFreight()));
  }
  
}