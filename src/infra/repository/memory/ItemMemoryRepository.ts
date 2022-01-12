import Item from '../../../domain/entity/Item';
import ItemVolume from '../../../domain/entity/ItemVolume';
import ItemAbstractRepository from "../../../domain/repository/ItemAbstractRepository";

export default class ItemMemoryRepository extends ItemAbstractRepository {

  private items: Item[] = [
    new Item(1, 'Freezer', 1000, new ItemVolume(200, 100, 50, 40)), // freight 400
    new Item(2, 'Guittar', 2000, new ItemVolume(100, 30, 10, 3)), // freight 30
    new Item(3, 'Book', 50, new ItemVolume(20, 15, 10, 1)), // freight 10
  ]

  findByIdIn(ids: number[]): Promise<Item[]>
  {
    const itemsWithIds: Item[] = [];

    for(const item of this.items) {
      if(ids.includes(item.id)) {
        itemsWithIds.push(item)
      }
    }

    return Promise.resolve(itemsWithIds);
  }

  findById(id: number): Promise<Item> {
    const item = this.items.find((item) => item.id === id);
    if(!item) throw new Error('Item not found');
    return Promise.resolve(item);
  }
}
