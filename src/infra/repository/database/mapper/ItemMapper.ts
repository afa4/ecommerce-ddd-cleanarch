import Item from "../../../../domain/entity/item/Item";
import ItemVolume from "../../../../domain/entity/item/ItemVolume";

export default class ItemMapper {
    fromItemData(itemDatabaseData: any): Item {
        const {height, width, length, weight} = itemDatabaseData;
        const itemVolume = new ItemVolume(height, width, length, weight);
        const {id_item, description, price} = itemDatabaseData;
        return new Item(id_item, description, Number(price), itemVolume);
    }
}
