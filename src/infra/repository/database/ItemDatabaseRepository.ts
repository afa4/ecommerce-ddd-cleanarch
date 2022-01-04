import ItemAbstractRepository from "../../../domain/repository/ItemAbstractRepository";
import Item from "../../../domain/entity/Item";
import Connection from '../../database/Connection';
import ItemVolume from "../../../domain/entity/ItemVolume";

export default class ItemDatabaseRepository extends ItemAbstractRepository {

    constructor(private readonly connection: Connection) {
        super();
    }

    async findByIdIn(ids: number[]): Promise<Item[]> {
        const query = `select *
                       from ccca.item
                       where id_item in (${ids.join(',')})`;
        const [itemsData] = await this.connection.query(query, [ids]);
        console.log(itemsData);
        const items = itemsData.map((itemData: any) => {
            //id_item, category, description, price, width, height, length, weight
            const itemVolume = new ItemVolume(itemData.height, itemData.width, itemData.length, itemData.weight);
            return new Item(itemData.id_item, itemData.description, itemData.price, itemVolume);
        });
        return Promise.resolve(items);
    }
}
