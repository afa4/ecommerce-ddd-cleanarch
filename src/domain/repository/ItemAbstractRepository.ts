import Item from "../entity/item/Item";
import ItemRepository from "./ItemRepository";

export default abstract class ItemAbstractRepository implements ItemRepository {

    abstract findById(id: number): Promise<Item>;

    abstract findByIdIn(ids: number[]): Promise<Item[]>;

    async getItemsMappedByIdWhereIdIn(ids: number[]): Promise<{ [itemId: number]: Item }> {
        const items = await this.findByIdIn(ids);
        if (items.length < ids.length) {
            throw new Error('Item(s) not found');
        }
        const itemsMappedById: { [id: number]: Item } = {};
        items.forEach((item) => {
            itemsMappedById[item.id] = item;
        });
        return itemsMappedById;
    }
}
