import Item from '../entity/Item';

export default interface ItemRepository {
  findByIdIn(ids: number[]): Promise<Item[]>;
  getItemsMappedByIdWhereIdIn(ids: number[]): Promise<{[itemId: number]: Item}>
}
