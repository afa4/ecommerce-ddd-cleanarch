import Item from "../entity/Item";
import ItemRepository from "./ItemRepository";

export default abstract class ItemAbstractRepository implements ItemRepository {

    abstract findByIdIn(ids: number[]): Promise<Item[]>;

    async getItemsMappedByIdWhereIdIn(ids: number[]): Promise<{ [itemId: number]: Item }> {
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
