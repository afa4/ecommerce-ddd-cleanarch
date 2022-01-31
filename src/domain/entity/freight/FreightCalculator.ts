import Item from '../item/Item'

export default interface FreightCalculator {
  calculate(item: Item, quantity: number, distance?: number): number;
}
