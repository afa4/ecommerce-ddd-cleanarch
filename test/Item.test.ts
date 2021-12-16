import Item from '../src/Item';

test('should create item', () => {
  expect(new Item("1", "Book", 50)).toBeTruthy();
});