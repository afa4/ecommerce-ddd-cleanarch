import Item from '../../entity/item/Item'

export default interface FreightCalculator {
  calculate(item: Item, quantity: number, distance?: number): number;
}
