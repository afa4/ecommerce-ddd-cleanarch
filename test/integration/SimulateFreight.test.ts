import SimulateFreight from "../../src/application/use-cases/simulate-freight/SimulateFreight";
import ItemRepository from '../../src/domain/repository/ItemRepository';
import ItemMemoryRepository from '../../src/infra/repository/memory/ItemMemoryRepository';

let simulateFreight: SimulateFreight;
let itemRepository: ItemRepository;

beforeEach(() => {
  itemRepository = new ItemMemoryRepository();
  simulateFreight = new SimulateFreight(itemRepository);
});

test("should simulate freight with 3 items", async () => {
  const input = {
    orderItems: [
      { itemId: 1, quantity: 1 },
      { itemId: 2, quantity: 1 },
      { itemId: 3, quantity: 1 },
    ],
  };
  const output = await simulateFreight.execute(input);

  expect(output.freight).toBe(440);
});

test("should simulate freight with 4 items", async () => {
  const input = {
    orderItems: [
      { itemId: 1, quantity: 1 },
      { itemId: 2, quantity: 1 },
      { itemId: 3, quantity: 2 },
    ],
  };
  const output = await simulateFreight.execute(input);

  expect(output.freight).toBe(450);
});

test("should simulate freight getting items from repository", async () => {
  const itemRepositorySpy = jest.spyOn(itemRepository, 'findByIdIn');
  const input = {
    orderItems: [
      { itemId: 1, quantity: 1 },
      { itemId: 2, quantity: 1 },
      { itemId: 3, quantity: 2 },
    ],
  };
  await simulateFreight.execute(input);

  expect(itemRepositorySpy).toBeCalledWith([1,2,3]);
});

test("should throw error while simulating freight if items cant be found", async () => {
  const input = {
    orderItems: [
      { itemId: 88, quantity: 1 },
      { itemId: 99, quantity: 2 }
    ],
  };
  await expect(() => simulateFreight.execute(input)).rejects.toThrow('Item(s) not found');
});

test("should throw error while simulating freight if only some items could be found", async () => {
  const input = {
    orderItems: [
      { itemId: 1, quantity: 1 },
      { itemId: 99, quantity: 2 }
    ],
  };
  await expect(() => simulateFreight.execute(input)).rejects.toThrow('Item(s) not found');
});
