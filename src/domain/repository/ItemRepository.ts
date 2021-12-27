import Item from '../Item';

export default interface ItemRepository {
  findByIdIn(ids: number[]): Promise<Item[]>;
}
