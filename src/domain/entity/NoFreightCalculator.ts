import FreightCalculator from './FreightCalculator';
import Item from './Item';


export default class NoFreightCalculator implements FreightCalculator {
  calculate(item: Item, quantity: number, distance?: number): number
  {
    return 0;
  }
}
