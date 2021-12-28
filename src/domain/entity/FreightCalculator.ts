import Item from './Item'

export default interface FreightCalculator {
  calculate(item: Item, quantity: number, distance?: number): number;
}