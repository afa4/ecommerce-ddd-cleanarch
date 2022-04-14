import PlaceOrder from "../../src/application/use-cases/place-order/PlaceOrder";
import CouponRepository from "../../src/domain/repository/CouponRepository";
import ItemRepository from "../../src/domain/repository/ItemRepository";
import OrderRepository from "../../src/domain/repository/OrderRepository";
import OrderMemoryRepository from "../../src/infra/repository/memory/OrderMemoryRepository";
import CouponMemoryRepository from "../../src/infra/repository/memory/CouponMemoryRepository";
import ItemMemoryRepository from '../../src/infra/repository/memory/ItemMemoryRepository';
import {EventEmitter} from 'events';
import EventLoopBroker from '../../src/infra/events/nodejs/broker/EventLoopBroker'
import WarehouseEventRepository from "../../src/domain/repository/WarehouseEventRepository";
import WarehouseEventMemoryRepository from "../../src/infra/repository/memory/WarehouseEventMemoryRepository";
import OrderPlacedEventHandler from "../../src/infra/events/nodejs/handlers/OrderPlacedEventHandler";
import DecrementOrderItemsStock
    from "../../src/application/use-cases/decrement-order-items-stock/DecrementOrderItemsStock";
import DefaultWarehouseCalculator from "../../src/domain/services/warehouse/DefaultWarehouseCalculator";


describe("PlaceOrderAndDecrementStockTest", () => {
    let placeOrder: PlaceOrder;
    let itemRepository: ItemRepository;
    let orderRepository: OrderRepository;
    let couponRepository: CouponRepository;
    let warehouseEventRepository: WarehouseEventRepository;
    const warehouseCalculator = new DefaultWarehouseCalculator();
    const eventEmitter = new EventEmitter();
    const eventLoopBroker = new EventLoopBroker(eventEmitter);

    beforeEach(() => {
        itemRepository = new ItemMemoryRepository();
        orderRepository = new OrderMemoryRepository();
        couponRepository = new CouponMemoryRepository();
        warehouseEventRepository = new WarehouseEventMemoryRepository();
        eventEmitter.removeAllListeners();
        eventLoopBroker.register(new OrderPlacedEventHandler(new DecrementOrderItemsStock(warehouseEventRepository)));
        placeOrder = new PlaceOrder(
            itemRepository,
            orderRepository,
            couponRepository,
            eventLoopBroker
        );
    });

    it('should place order and decrement order items stock', async () => {
        const placeOrderInput = {
            cpf: "935.411.347-80",
            orderItems: [{ itemId: 1, quantity: 7 }],
            date: new Date("2021-12-27"),
        };

        await placeOrder.execute(placeOrderInput);

        setTimeout(() => {}, 100);

        const warehouseEvents = await warehouseEventRepository.findByItemId(1);

        expect(warehouseCalculator.calculateQuantity(warehouseEvents)).toBe(0);
    });

    it('should not decrement order items stock when items quantity exceeds item quantity in warehouse', async () => {
        const placeOrderInput = {
            cpf: "935.411.347-80",
            orderItems: [{ itemId: 1, quantity: 100 }],
            date: new Date("2021-12-27"),
        };

        await placeOrder.execute(placeOrderInput);

        setTimeout(() => {}, 100);

        const warehouseEvents = await warehouseEventRepository.findByItemId(1);

        expect(warehouseCalculator.calculateQuantity(warehouseEvents)).toBe(7);
    });
});
