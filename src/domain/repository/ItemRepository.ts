import Item from '../entity/Item';

export default interface ItemRepository {
  findById(id: number): Promise<Item>;
  findByIdIn(ids: number[]): Promise<Item[]>;
  getItemsMappedByIdWhereIdIn(ids: number[]): Promise<{[itemId: number]: Item}>;
}
