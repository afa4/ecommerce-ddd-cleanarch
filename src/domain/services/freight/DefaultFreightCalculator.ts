import FreightCalculator from './FreightCalculator';
import Item from '../../entity/item/Item';

const MINIMUM_FREIGHT = 10;

export default class DefaultFreightCalculator implements FreightCalculator {

  calculate(item: Item, quantity: number = 1, distance?: number): number {
    const freight = (distance || 1000) * item.volume.getVolume() * (item.volume.getDensity() / 100) * quantity;
    return (freight < MINIMUM_FREIGHT) ? MINIMUM_FREIGHT : freight;
  }
}
