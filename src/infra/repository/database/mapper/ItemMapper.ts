import Item from "../../../../domain/entity/Item";
import ItemVolume from "../../../../domain/entity/ItemVolume";

export default class ItemMapper {
    constructor(readonly itemDatabaseData: any) {
    }

    toItem(): Item {
        const {height, width, length, weight} = this.itemDatabaseData;
        const itemVolume = new ItemVolume(height, width, length, weight);
        const {id_item, description, price} = this.itemDatabaseData;
        return new Item(id_item, description, Number(price), itemVolume);
    }
}
