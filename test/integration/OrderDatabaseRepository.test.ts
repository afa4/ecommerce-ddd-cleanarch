import OrderRepository from "../../src/domain/repository/OrderRepository";
import MySqlConnectionAdapter from "../../src/infra/database/MySqlConnectionAdapter";
import OrderDatabaseRepository from "../../src/infra/repository/database/OrderDatabaseRepository";
import Order from "../../src/domain/entity/order/Order";
import Item from "../../src/domain/entity/item/Item";
import ItemVolume from "../../src/domain/entity/item/ItemVolume";

let orderRepository: OrderRepository;
const connection = MySqlConnectionAdapter.startDefault();

beforeEach(() => {
    orderRepository = new OrderDatabaseRepository(connection);
});

afterAll(async () => {
    await connection.disconnect();
})

test('should insert order', async () => {
    const order = new Order("935.411.347-80");
    [
        new Item(1, 'Freezer', 1000, new ItemVolume(200, 100, 50, 40)),
        new Item(2, 'Guittar', 2000, new ItemVolume(100, 30, 10, 3)),
        new Item(3, 'Book', 50, new ItemVolume(20, 15, 10, 1))
    ].forEach((item) => order.addItem(item, 1));

    await orderRepository.save(order)
});
