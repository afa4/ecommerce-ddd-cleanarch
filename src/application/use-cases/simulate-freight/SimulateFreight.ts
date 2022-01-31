import ItemRepository from '../../../domain/repository/ItemRepository';
import UseCase from '../UseCase';
import SimulateFreightInput from './SimulateFreightInput';
import SimulateFreightOutput from './SimulateFreightOutput';
import FreightCalculator from "../../../domain/entity/freight/FreightCalculator";

export default class SimulateFreight implements UseCase<SimulateFreightInput, SimulateFreightOutput> {

  constructor(private readonly itemRepository: ItemRepository, private readonly freightCalculator: FreightCalculator) {}

  async execute(input: SimulateFreightInput): Promise<SimulateFreightOutput>
  {
    let freight = 0;
    const itemIds = input.orderItems.map((orderItem) => orderItem.itemId);
    const itemsMappedById = await this.itemRepository.getItemsMappedByIdWhereIdIn(itemIds);
    input.orderItems.forEach((orderItem) => {
      const item = itemsMappedById[orderItem.itemId];
      freight += this.freightCalculator.calculate(item, orderItem.quantity)
    });

    return Promise.resolve(new SimulateFreightOutput(freight));
  }
}
