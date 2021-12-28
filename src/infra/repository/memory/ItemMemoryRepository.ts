import Item from '../../../domain/entity/Item';
import ItemVolume from '../../../domain/entity/ItemVolume';
import ItemRepository from '../../../domain/repository/ItemRepository';

export default class ItemMemoryRepository implements ItemRepository {
  
  private items: Item[] = [
    new Item('1', 'Freezer', 1000, new ItemVolume(200, 100, 50, 40)), // freight 400 
    new Item('2', 'Guittar', 2000, new ItemVolume(100, 30, 10, 3)), // freight 30
    new Item('3', 'Book', 50, new ItemVolume(20, 15, 10, 1)), // freight 10
  ]

  findByIdIn(ids: number[]): Promise<Item[]>
  {
    const itemsWithIds: Item[] = [];

    for(const item of this.items) {
      const itemId = parseInt(item.id);
      if(ids.includes(itemId)) {
        itemsWithIds.push(item)
      }
    }

    return Promise.resolve(itemsWithIds);
  }

  async getItemsMappedByIdWhereIdIn(ids: number[]): Promise<{ [itemId: number]: Item }>
  {
    const items = await this.findByIdIn(ids);
    if(items.length < ids.length) {
       throw new Error('Item(s) not found');
    }
    const itemsMappedById: {[id: number]: Item} = {};
    items.forEach((item) => {
      const itemId = parseInt(item.id);
      itemsMappedById[itemId] = item;
    });
    
    return itemsMappedById;
  }
}
